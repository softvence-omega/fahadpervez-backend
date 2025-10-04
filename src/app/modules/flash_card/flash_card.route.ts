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
 *                 example: '{ "profileType": "student_profile", "cardCustomization": [{  "prompt": "What is 2 + 2?", "sectionName": "Math", "maxFlash": 3, "category": "Arithmetic", "level": "EASY", "isPublic": true }], "aiFlashCard": [{ "category": "Science", "topicName": "Physics Basics", "level": "MEDIUM" }] }'
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Flash card created successfully
 */

flash_card_router.post(
  "/",
  auth("ADMIN", "MENTOR", "STUDENT"),
  uploader.single("image"),
  (req, res, next) => {
    try {
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
// ------------get all flash cards ------------

/**
 * @openapi
 * /api/flash-card:
 *   get:
 *     tags:
 *       - FlashCard
 *     summary: Get all flash cards
 *     responses:
 *       200:
 *         description: Returns a list of flash cards
 */

flash_card_router.get(
  "/",
  auth("ADMIN", "MENTOR", "STUDENT"),
  flash_card_controller.get_all_flash_card_in_db
);

// ------------get single flash card ------------

/**
 * @openapi
 * /api/flash-card/{id}:
 *   get:
 *     tags:
 *       - FlashCard
 *     summary: Get a single flash card by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flash card ID
 *     responses:
 *       200:
 *         description: Returns the flash card
 *       404:
 *         description: Flash card not found
 */
flash_card_router.get(
  "/:id",
  auth("ADMIN", "MENTOR", "STUDENT"),
  flash_card_controller.get_single_flash_card_in_db
);

// ------------update flash card ------------
/**
 * @openapi
 * /api/flash-card/{id}:
 *   patch:
 *     tags:
 *       - FlashCard
 *     summary: Update a flash card by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flash card ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 example: '{   "cardCustomization": [     { "prompt": "What is 2 + 2?",       "sectionName": "Math",       "maxFlash": 3,       "category": "Arithmetic",       "level": "EASY",       "isPublic": true     }   ],   "aiFlashCard": [     {       "category": "Science",       "topicName": "Physics Basics",       "level": "MEDIUM"     }   ]'
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Flash card updated successfully
 */
// If raw JSON is sent:
flash_card_router.patch(
  "/:id",
  auth("ADMIN", "MENTOR", "STUDENT"),
  uploader.single("image"),
  RequestValidator(flash_card_validation.update),
  flash_card_controller.update_flash_card_in_db
);

// ------------delete flash card ------------
/**
 * @openapi
 * /api/flash-card/{id}:
 *   delete:
 *     tags:
 *       - FlashCard
 *     summary: Delete a flash card by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Flash card ID
 *     responses:
 *       200:
 *         description: Flash card deleted successfully
 */
flash_card_router.delete(
  "/:id",
  auth("ADMIN", "MENTOR", "STUDENT"),
  flash_card_controller.delete_flash_card_in_db
);

export default flash_card_router;
