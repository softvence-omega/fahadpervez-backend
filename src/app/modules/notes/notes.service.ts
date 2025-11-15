import { Request } from "express";
import uploadCloud from "../../utils/cloudinary";
import { isAccountExist } from "../../utils/isAccountExist";
import { Student_Model } from "../student/student.schema";
import { notes_model } from "./notes.schema";

const create_new_notes_into_db = async (req: Request) => {
    const user = req.user;
    const body = req.body;

    const isUserExist: any = await isAccountExist(user?.email as string, "profile_id");

    const uploadedBy = [
        isUserExist?.profile_id?.firstName,
        isUserExist?.profile_id?.lastName
    ]
        .filter(Boolean)
        .join(" ");

    const payload = {
        slug: (body?.subject + body?.system + body?.topic + body?.subtopic)
            ?.toLowerCase()
            ?.replace(/\s+/g, "-"),

        uploadedBy,
        notes: [],
        ...body,
    };

    // Handle file uploads
    if (req?.files && Array.isArray(req.files)) {
        const uploadResults = await Promise.all(
            (req.files as Express.Multer.File[]).map(async (file) => {
                const cloudRes = await uploadCloud(file);

                return {
                    fileType: file.mimetype,
                    fileName: file.originalname,
                    fileUrl: cloudRes?.secure_url,
                    fileId: cloudRes?.public_id
                };
            })
        );

        payload.notes.push(...uploadResults);
    }

    const result = await notes_model.create(payload);
    return result;
};

const get_all_notes_from_db = async (req: Request) => {
    const {
        page = "1",
        limit = "10",
        searchTerm = "",
        subject = "",
        system = "",
        topic = "",
        subtopic = "",
        type = "",
    } = req.query as {
        page?: string;
        limit?: string;
        searchTerm?: string;
        subject?: string;
        system?: string;
        topic?: string;
        subtopic?: string;
        type?: string;
    };

    let studentType: string | undefined;
    if (req?.user?.role === "STUDENT") {
        const student = await Student_Model.findOne({ accountId: req?.user?.accountId });
        studentType = student?.studentType || undefined;
    }

    // 🔢 Pagination setup
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    // 🧩 Build filters dynamically
    const filters: any = {};

    // Apply studentType filter (only if exists)
    if (studentType) {
        filters.studentType = studentType;
    }
    if (type) {
        filters.type = type;
    }
    // Combine subject/system/topic/subtopic into one slug string for search
    const slugFilter = (subject + system + topic + subtopic).toLowerCase();

    // Apply search filter if provided
    if (searchTerm || slugFilter) {
        filters.$or = [
            { title: { $regex: searchTerm, $options: "i" } },
            { slug: { $regex: slugFilter, $options: "i" } },
        ];
    }

    // 🧾 Fetch results
    const result = await notes_model.find(filters)
        .skip(skip)
        .limit(limitNumber)
        .sort({ createdAt: -1 })
        .lean();

    const total = await notes_model.countDocuments(filters);
    const totalPages = Math.ceil(total / limitNumber);

    return {
        meta: {
            page: pageNumber,
            limit: limitNumber,
            total,
            totalPages,
        },
        data: result,
    };
};

const get_single_notes_from_db = async (id: string) => {
    const result = await notes_model.findById(id).lean();
    return result;
};

const delete_single_notes_from_db = async (id: string) => {
    const result = await notes_model.findByIdAndDelete(id);
    return result;
};

export const notes_service = {
    create_new_notes_into_db,
    get_all_notes_from_db,
    get_single_notes_from_db,
    delete_single_notes_from_db
};