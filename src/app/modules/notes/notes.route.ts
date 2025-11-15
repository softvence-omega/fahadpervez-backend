import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import uploader from "../../middlewares/uploader";
import { notes_controller } from "./notes.controller";
import { notes_validations } from "./notes.validation";

const notes_router = Router();

notes_router.post(
  "/create",
  auth("ADMIN"),
  uploader.array("files", 10),
  (req, res, next) => {
    req.body = JSON.parse(req?.body?.data);
    next()
  },
  RequestValidator(notes_validations.create),
  notes_controller.create_new_notes
);

notes_router.get("/all", auth("ADMIN", "STUDENT", "MENTOR", "PROFESSIONAL"), notes_controller.get_all_notes);
notes_router.get("/single/:noteId", auth("ADMIN", "STUDENT", "MENTOR", "PROFESSIONAL"), notes_controller.get_single_notes);
notes_router.delete("/delete/:noteId", auth("ADMIN"), notes_controller.delete_single_notes);

export default notes_router;
