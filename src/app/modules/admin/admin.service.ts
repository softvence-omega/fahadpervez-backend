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
    const result = await Account_Model.findById(id)
        .populate("profile_id")
        .select("-password")
        .lean();

    if (!result) {
        throw new AppError("Student not found", 404)
    }
    return result
}
const delete_student_from_db_form_admin = async (id: string) => {
    await Account_Model.findByIdAndUpdate(id, { isDeleted: true });
    return "Student deleted successfully"
}


export const admin_services = {
    get_all_overview_data_from_db_fro_admin,
    get_all_student_from_db_form_admin,
    get_single_student_from_db_form_admin,
    delete_student_from_db_form_admin
}