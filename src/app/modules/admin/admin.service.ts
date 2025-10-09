import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { Request } from "express";
import { AppError } from "../../utils/app_error";
import { Account_Model } from "../auth/auth.schema";

const get_all_overview_data_from_db_fro_admin = async (req: Request) => {
    // Define date ranges
    const currentMonthStart = startOfMonth(new Date());
    const currentMonthEnd = endOfMonth(new Date());
    const lastMonthStart = startOfMonth(subMonths(new Date(), 1));
    const lastMonthEnd = endOfMonth(subMonths(new Date(), 1));

    // Get counts
    const [
        totalStudents,
        totalMentors,
        currentMonthStudents,
        lastMonthStudents,
        currentMonthMentors,
        lastMonthMentors,
    ] = await Promise.all([
        Account_Model.countDocuments({ role: "STUDENT" }),
        Account_Model.countDocuments({ role: "MENTOR" }),
        Account_Model.countDocuments({ role: "STUDENT", createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd } }),
        Account_Model.countDocuments({ role: "STUDENT", createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd } }),
        Account_Model.countDocuments({ role: "MENTOR", createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd } }),
        Account_Model.countDocuments({ role: "MENTOR", createdAt: { $gte: lastMonthStart, $lte: lastMonthEnd } }),
    ]);

    const calcChange = (current: number, previous: number) => {
        if (previous === 0) {
            return current > 0 ? 100 : 0;
        }
        return Math.round(((current - previous) / previous) * 100);
    };


    const studentChange = calcChange(currentMonthStudents, lastMonthStudents);
    const mentorChange = calcChange(currentMonthMentors, lastMonthMentors);

    return {
        students: {
            title: "Total Students",
            total: totalStudents,
            change: studentChange,
            period: "from last month",
            trend: studentChange >= 0 ? "increase" : "decrease",
        },
        mentors: {
            title: "Active Mentors",
            total: totalMentors,
            change: mentorChange,
            period: "from last month",
            trend: mentorChange >= 0 ? "increase" : "decrease",
        },
    };
};


// for student
const get_all_student_from_db_form_admin = async (req: Request) => {
    const {
        page = "1",
        limit = "10",
        search = "",
        year_of_study,
        preparingFor,
    } = req.query;

    const pageNumber = parseInt(page as string);
    const pageSize = parseInt(limit as string);
    const skip = (pageNumber - 1) * pageSize;

    // Build dynamic filters for profile fields
    const profileFilters: any = {};


    if (year_of_study) {
        profileFilters["profile_id.year_of_study"] = year_of_study;
    }

    if (preparingFor) {
        profileFilters["profile_id.preparingFor"] = preparingFor;
    }

    // Build search conditions (for name/university)
    const searchConditions =
        search && (search as string).trim() !== ""
            ? {
                $or: [
                    { "profile_id.firstName": { $regex: search, $options: "i" } },
                    { "profile_id.lastName": { $regex: search, $options: "i" } },
                    { "profile_id.university": { $regex: search, $options: "i" } },
                ],
            }
            : {};

    // Aggregation pipeline
    const pipeline: any[] = [
        {
            $match: {
                role: "STUDENT",
                profile_id: { $exists: true, $ne: null },
                isDeleted: false,
            },
        },
        {
            $lookup: {
                from: "student_profiles", // collection name of the profile model
                localField: "profile_id",
                foreignField: "_id",
                as: "profile_id",
            },
        },
        { $unwind: "$profile_id" },
        {
            $match: {
                ...searchConditions,
                ...profileFilters,
            },
        },
        {
            $project: {
                password: 0,
            },
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: pageSize },
    ];

    // Run aggregation & count total
    const [students, totalCount] = await Promise.all([
        Account_Model.aggregate(pipeline),
        Account_Model.aggregate([
            ...pipeline.slice(0, -3), // same pipeline without skip/limit
            { $count: "total" },
        ]),
    ]);

    const total = totalCount[0]?.total || 0;

    return {
        meta: {
            total,
            page: pageNumber,
            limit: pageSize,
            totalPages: Math.ceil(total / pageSize),
        },
        data: students,
    };
};

const get_single_student_from_db_form_admin = async (id: string) => {
    const result = await Account_Model.findOne({ _id: id, role: "STUDENT" })
        .populate("profile_id")
        .select("-password")
        .lean();

    if (!result) {
        throw new AppError("Student not found", 404)
    }
    return result
}
const delete_student_from_db_form_admin = async (id: string) => {
    await Account_Model.findOneAndUpdate({ _id: id, role: "STUDENT" }, { isDeleted: true });
    return "Student deleted successfully"
}



// for professional

const get_all_professional_from_db_form_admin = async (req: Request) => {
    const {
        page = "1",
        limit = "10",
        search = "",
        post_graduate,
        experience,
    } = req.query;

    const pageNumber = parseInt(page as string);
    const pageSize = parseInt(limit as string);
    const skip = (pageNumber - 1) * pageSize;

    // Build dynamic filters for profile fields
    const profileFilters: any = {};


    if (post_graduate) {
        profileFilters["profile_id.post_graduate"] = post_graduate;
    }

    if (experience) {
        profileFilters["profile_id.experience"] = experience;
    }

    // Build search conditions (for name/university)
    const searchConditions =
        search && (search as string).trim() !== ""
            ? {
                $or: [
                    { "profile_id.firstName": { $regex: search, $options: "i" } },
                    { "profile_id.lastName": { $regex: search, $options: "i" } },
                    { "profile_id.institution": { $regex: search, $options: "i" } },
                ],
            }
            : {};

    // Aggregation pipeline
    const pipeline: any[] = [
        {
            $match: {
                role: "PROFESSIONAL",
                profile_id: { $exists: true, $ne: null },
                isDeleted: false,
            },
        },
        {
            $lookup: {
                from: "professionals",
                localField: "profile_id",
                foreignField: "_id",
                as: "profile_id",
            },
        },
        { $unwind: "$profile_id" },
        {
            $match: {
                ...searchConditions,
                ...profileFilters,
            },
        },
        {
            $project: {
                password: 0,
            },
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: pageSize },
    ];

    // Run aggregation & count total
    const [professionals, totalCount] = await Promise.all([
        Account_Model.aggregate(pipeline),
        Account_Model.aggregate([
            ...pipeline.slice(0, -3),
            { $count: "total" },
        ]),
    ]);

    const total = totalCount[0]?.total || 0;

    return {
        meta: {
            total,
            page: pageNumber,
            limit: pageSize,
            totalPages: Math.ceil(total / pageSize),
        },
        data: professionals,
    };
};

const get_single_professional_from_db_form_admin = async (id: string) => {
    const result = await Account_Model.findOne({ _id: id, role: "PROFESSIONAL" })
        .populate("profile_id")
        .select("-password")
        .lean();

    if (!result) {
        throw new AppError("Student not found", 404)
    }
    return result
}
const delete_professional_from_db_form_admin = async (id: string) => {
    await Account_Model.findOneAndUpdate({ _id: id, role: "PROFESSIONAL" }, { isDeleted: true });
    return "Student deleted successfully"
}


// for mentor
const get_all_mentor_from_db_form_admin = async (req: Request) => {
    const {
        page = "1",
        limit = "10",
        search = "",
        specialties,
        experience,
    } = req.query;

    const pageNumber = parseInt(page as string);
    const pageSize = parseInt(limit as string);
    const skip = (pageNumber - 1) * pageSize;

    // Build dynamic filters for profile fields
    const profileFilters: any = {};

    if (specialties) {
        profileFilters["profile_id.specialties"] = specialties;
    }

    if (experience) {
        profileFilters["profile_id.experience"] = experience;
    }

    // Build search conditions (only firstName and lastName)
    const searchConditions =
        search && (search as string).trim() !== ""
            ? {
                $or: [
                    { "profile_id.firstName": { $regex: search, $options: "i" } },
                    { "profile_id.lastName": { $regex: search, $options: "i" } },
                ],
            }
            : {};

    // Aggregation pipeline
    const pipeline: any[] = [
        {
            $match: {
                role: "MENTOR",
                profile_id: { $exists: true, $ne: null },
                isDeleted: false,
            },
        },
        {
            $lookup: {
                from: "mentors",
                localField: "profile_id",
                foreignField: "_id",
                as: "profile_id",
            },
        },
        { $unwind: "$profile_id" },
        {
            $match: {
                ...searchConditions,
                ...profileFilters,
            },
        },
        {
            $project: {
                password: 0,
            },
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: pageSize },
    ];

    // Run aggregation & count total
    const [mentors, totalCount] = await Promise.all([
        Account_Model.aggregate(pipeline),
        Account_Model.aggregate([
            ...pipeline.slice(0, -3),
            { $count: "total" },
        ]),
    ]);

    const total = totalCount[0]?.total || 0;

    return {
        meta: {
            total,
            page: pageNumber,
            limit: pageSize,
            totalPages: Math.ceil(total / pageSize),
        },
        data: mentors,
    };
};

const get_single_mentor_from_db_form_admin = async (id: string) => {
    const result = await Account_Model.findOne({ _id: id, role: "MENTOR" })
        .populate("profile_id")
        .select("-password")
        .lean();

    if (!result) {
        throw new AppError("Mentor not found", 404);
    }
    return result;
};

const delete_mentor_from_db_form_admin = async (id: string) => {
    await Account_Model.findOneAndUpdate({ _id: id, role: "MENTOR" }, { isDeleted: true });
    return "Mentor deleted successfully";
};



export const admin_services = {
    get_all_overview_data_from_db_fro_admin,
    get_all_student_from_db_form_admin,
    get_single_student_from_db_form_admin,
    delete_student_from_db_form_admin,
    get_all_professional_from_db_form_admin,
    get_single_professional_from_db_form_admin,
    delete_professional_from_db_form_admin,
    get_all_mentor_from_db_form_admin,
    get_single_mentor_from_db_form_admin,
    delete_mentor_from_db_form_admin
}