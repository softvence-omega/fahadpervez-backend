import { Request } from "express";
import { content_management_admin_model } from './study_mode_tree.schema';

const create_new_content_management_admin_into_db = async (req: Request) => {
  const result = await content_management_admin_model.create(req?.body);
  return result;;
};

const get_all_content_management_admin_from_db = async () => {
  const result = await content_management_admin_model.find().lean();
  return result;
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
  delete_content_management_admin_from_db
};
