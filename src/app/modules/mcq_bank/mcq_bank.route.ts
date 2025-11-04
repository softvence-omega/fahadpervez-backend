import { Router } from "express";
import auth from "../../middlewares/auth";
import uploader from "../../middlewares/uploader";
import { mcq_bank_controller } from "./mcq_bank.controller";

const mcqBankRouter = Router();

// ----------------------
// Upload Bulk MCQ Bank
// ----------------------
mcqBankRouter.post(
    "/upload-bulk",
    auth("ADMIN", "MENTOR"),
    uploader.single("file"),
    (req, res, next) => {
        if (req?.body?.data) {
            req.body = JSON.parse(req.body.data);
        }
        next();
    },
    mcq_bank_controller.upload_bulk_mcq_bank
);

// ----------------------
// Get All MCQ Banks
// ----------------------
mcqBankRouter.get(
    "/",
    auth("ADMIN", "MENTOR", "PROFESSIONAL", "STUDENT"),
    mcq_bank_controller.get_all_mcq_banks
);

mcqBankRouter.post(
    "/save-report",
    auth("ADMIN", "MENTOR", "PROFESSIONAL", "STUDENT"),
    mcq_bank_controller.save_report_for_mcq
);


// ----------------------
// Get Single MCQ Bank
// ----------------------
mcqBankRouter.get(
    "/:id",
    auth("ADMIN", "MENTOR", "PROFESSIONAL", "STUDENT"),
    mcq_bank_controller.get_single_mcq_bank
);

// ----------------------
// Delete MCQ Bank
// ----------------------
mcqBankRouter.delete(
    "/:id",
    auth("ADMIN", "MENTOR"),
    mcq_bank_controller.delete_mcq_bank
);

// ----------------------
// Update Specific Question by Index
// ----------------------
mcqBankRouter.patch(
    "/:id/question/:questionIndex",
    auth("ADMIN", "MENTOR"),
    mcq_bank_controller.update_specific_question
);

export default mcqBankRouter;
