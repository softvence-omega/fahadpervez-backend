import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import uploader from "../../middlewares/uploader";
import { flash_card_validation } from "./flash_card.validation";
import { flash_card_controller } from "./flash_card.controller";

const flash_card_router = Router();

/**
 * @openapi
 * /api/flash-card:
 *   post:
 *     tags:
 *       - FlashCard
 *     summary: Create a new flash card
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *               - data
 *             properties:
 *               prompt:
 *                 type: string
 *                 example: "What is the capital of France?"
 *               data:
 *                 type: string
 *                 example: '{ "profileType": "student_profile", "cardCustomization": [{  "prompt": "What is 2 + 2?", "sectionName": "Math", "maxFlash": 3, "category": "Arithmetic", "level": "EASY", "isPublic": true }], "aiFlashCard": [{ "category": "Science", "topicName": "Physics Basics", "level": "MEDIUM" }],  "isDeleted": false }'
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Flash card created successfully
 */

flash_card_router.post(
  "/",
  auth("ADMIN", "MENTOR", "STUDENT"), // ✅ Role-based access
  uploader.single("image"), // ✅ handle file uploads
  (req, res, next) => {
    try {
      // ✅ Safely parse JSON in FormData
      if (req.body?.data && typeof req.body.data === "string") {
        req.body = {
          ...req.body,
          ...JSON.parse(req.body.data),
        };
      }
      next();
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON in 'data' field" });
    }
  },
  RequestValidator(flash_card_validation.create),
  flash_card_controller.create_flash_card_post
);

export default flash_card_router;
