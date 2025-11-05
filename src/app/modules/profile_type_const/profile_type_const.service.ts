import { Request } from "express";
import { AppError } from "../../utils/app_error";
import { profile_type_const_model } from "./profile_type_const.schema";

const create_new_profile_type_const_into_db = async (req: Request) => {
  const payload = req?.body;
  const isTypeNameExist = await profile_type_const_model.findOne({ typeName: payload?.typeName }).lean();
  if (isTypeNameExist) throw new AppError("This type name is already exist", 403);
  const result = await profile_type_const_model.create(payload);
  return result;
};

const get_all_profile_type_const_from_db = async () => {
  const result = await profile_type_const_model.find().lean();
  return result;
}

const update_profile_type_const_into_db = async (req: Request) => {
  const typeId = req?.params?.typeId;
  const payload = req?.body;
  const isTypeNameExist = await profile_type_const_model.findOne({ typeName: payload?.typeName }).lean();
  if (isTypeNameExist) throw new AppError("This type name is already exist", 403);
  const result = await profile_type_const_model.findOneAndUpdate({ _id: typeId }, payload, { new: true });
  return result
}

const delete_profile_type_const_from_db = async (typeId: string) => {
  const result = await profile_type_const_model.findOneAndDelete({ _id: typeId });
  return result;
};


export const profile_type_const_service = {
  create_new_profile_type_const_into_db,
  get_all_profile_type_const_from_db,
  update_profile_type_const_into_db,
  delete_profile_type_const_from_db
};
