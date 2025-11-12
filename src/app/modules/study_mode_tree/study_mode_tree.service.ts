import { Request } from "express";
import { McqBankModel } from "../mcq_bank/mcq_bank.schema";
import { content_management_admin_model } from './study_mode_tree.schema';

const create_new_content_management_admin_into_db = async (req: Request) => {
  const result = await content_management_admin_model.create(req?.body);
  return result;;
};

const get_all_content_management_admin_from_db = async () => {
  const result = await content_management_admin_model.find().lean();
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
  const { subject, system, topic, subtopic, page = 1, limit = 10 } = req.query;

  // Collect non-empty query values
  const parts = [subject, system, topic, subtopic].filter(
    (value): value is string => typeof value === "string" && value.trim().length > 0
  );

  const slug = parts.join("");

  // Fetch all matching documents
  const result = await McqBankModel.find({
    slug: { $regex: slug, $options: "i" }
  });

  // Check if all 4 filters are present
  const allFieldsPresent = [subject, system, topic, subtopic].every(
    (v) => typeof v === "string" && v.trim().length > 0
  );

  // ✅ CASE 1: All fields present → merge mcqs and paginate
  if (allFieldsPresent) {
    const allMcqs = result.flatMap((item) => item.mcqs || []);

    // Convert to numbers
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    const paginatedMcqs = allMcqs.slice(skip, skip + limitNum);

    const total = allMcqs.length;
    const totalPages = Math.ceil(total / limitNum);

    return {
      data: paginatedMcqs,
      meta: {
        page: pageNum,
        limit: limitNum,
        skip,
        total,
        totalPages,
      },
    };
  }

  // ✅ CASE 2: Otherwise → return the content tree as before
  return {
    data: result.map((r) => ({
      ...r.toObject(),
      mcqs: undefined, // ensure mcqs are hidden
    })),
    
  };
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
