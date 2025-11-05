import { Request } from "express";
import { report_model } from "./report.schema";

const get_all_report_from_db_for_admin = async (req: Request): Promise<any> => {
  const { page = "1", limit = "10" } = req.query;
  const pageNumber = parseInt(page as string);
  const pageSize = parseInt(limit as string);
  const skip = (pageNumber - 1) * pageSize;

  const result = await report_model
    .find()
    .skip(skip)
    .limit(pageSize)
    .lean();

  const total = await report_model.countDocuments();

  const meta = {
    page,
    limit,
    skip,
    total,
    totalPages: Math.ceil(total / pageSize),
  };

  return {
    data: result,
    meta,
  };
};

const get_all_report_for_reporter_from_db = async (req: Request): Promise<any> => {
  const accountId = req?.user?.accountId;
  const result = await report_model.find({ accountId }).lean();
  return result;
};

const update_report_status_on_db = async (req: Request): Promise<any> => {
  const { reportId } = req?.params;
  const { status } = req?.body;
  const result = await report_model.findByIdAndUpdate(reportId, { status }, { new: true });
  return result;
};

const delete_report_from_db = async (reportId: string): Promise<any> => {
  const result = await report_model.findByIdAndDelete({ _id: reportId });
  return result;
};

export const report_service = {
  get_all_report_from_db_for_admin,
  get_all_report_for_reporter_from_db,
  update_report_status_on_db,
  delete_report_from_db
};
