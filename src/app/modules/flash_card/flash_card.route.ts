import { Router } from "express";
import auth from "../../middlewares/auth";
import uploader from "../../middlewares/uploader";
import { flash_card_controller } from "./flash_card.controller";

const flash_card_router = Router();


flash_card_router.post(
  "/bulk-create",
  auth("ADMIN"),
  uploader.single("file"),
  (req, res, next) => {
    if (req.body?.data) {
      req.body = JSON.parse(req.body.data)
    }
    next();
  },
  flash_card_controller.create_flash_card_post
);
flash_card_router.get("/all", auth("ADMIN", "STUDENT", "MENTOR", "PROFESSIONAL"), flash_card_controller.get_all_flash_cards)

export default flash_card_router;