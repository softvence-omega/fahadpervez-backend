import { Request } from "express";
import { McqBankModel } from "../mcq_bank/mcq_bank.schema";
import { Student_Model } from "../student/student.schema";
import { content_management_admin_model } from './study_mode_tree.schema';

const create_new_content_management_admin_into_db = async (req: Request) => {
  const result = await content_management_admin_model.create(req?.body);
  return result;;
};

const get_all_content_management_admin_from_db = async (req: Request) => {
  const role = req?.user?.role;
  const isProfileExist = await Student_Model.findOne({ accountId: req?.user?.accountId }).lean();
  const studentType = isProfileExist?.studentType;
  let result;
  if (role === "STUDENT") {
    result = await content_management_admin_model.find({ studentType }).lean();
  } else {
    result = await content_management_admin_model.find().lean();
  }
  return result;
};

// const get_all_content_from_tree_from_db = async (req: Request) => {
//   const { subject, system, topic, subtopic, page = 1, limit = 10 } = req.query;

//   // Collect non-empty query values
//   const parts = [subject, system, topic, subtopic].filter(
//     (value): value is string => typeof value === "string" && value.trim().length > 0
//   );
//   const slug = parts.join("");

//   // Fetch all matching documents
//   const result = await McqBankModel.find({
//     slug: { $regex: slug, $options: "i" }
//   });

//   // CASE 1: If all four filters are present → merge MCQs and paginate
//   const allFieldsPresent = [subject, system, topic, subtopic].every(
//     (v) => typeof v === "string" && v.trim().length > 0
//   );

//   if (allFieldsPresent) {
//     // Merge all mcqs arrays
//     const allMcqs = result.flatMap((item) => item.mcqs || []);

//     // Pagination logic
//     const pageNum = parseInt(page as string, 10);
//     const limitNum = parseInt(limit as string, 10);
//     const start = (pageNum - 1) * limitNum;
//     const end = start + limitNum;
//     const paginatedMcqs = allMcqs.slice(start, end);

//     return {
//       meta: {
//         currentPage: pageNum,
//         totalPages: Math.ceil(allMcqs.length / limitNum),
//       },
//       data: paginatedMcqs,
//     };
//   }


//   return {
//     data: result.map((r) => ({
//       ...r.toObject(),
//       mcqs: undefined, // hide mcqs field
//     })),
//   };
// };

const get_all_content_from_tree_from_db = async (req: Request) => {
  const { subject, system, topic, subtopic } = req.query;

  // Collect non-empty query values
  const parts = [subject, system, topic, subtopic].filter(
    (value): value is string => typeof value === "string" && value.trim().length > 0
  );

  const slug = parts.join("");
  // Fetch all matching documents
  const result = await McqBankModel.find({
    slug: { $regex: slug, $options: "i" }
  }).select("-mcqs");
  return result
};



const update_content_management_admin_into_db = async (req: Request) => {
  const { treeId } = req?.params;
  const payload = req?.body;
  const result = await content_management_admin_model.findByIdAndUpdate(treeId, payload, { new: true });
  return result;
}
const delete_content_management_admin_from_db = async (req: Request) => {
  const { treeId } = req?.params;
  const result = await content_management_admin_model.findByIdAndDelete(treeId);
  return result;
}

export const study_mode_tree_service = {
  create_new_content_management_admin_into_db,
  get_all_content_management_admin_from_db,
  update_content_management_admin_into_db,
  delete_content_management_admin_from_db,
  get_all_content_from_tree_from_db
};
