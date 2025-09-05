import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import { social_post_validation } from "./social_post.validation";
import { social_post_controllers } from "./social_post.controller";
import uploader from "../../middlewares/uploader";

const social_post_router = Router();
social_post_router.post(
    "/",
    auth("ADMIN", "MENTOR", "STUDENT"),
    uploader.single("image"),
    (req, res, next) => {
        req.body = JSON.parse(req?.body?.data);
        next()
    },
    RequestValidator(social_post_validation.create),
    social_post_controllers.create_new_social_post
)

social_post_router.get("/", auth("ADMIN", "MENTOR", "STUDENT"), social_post_controllers.get_all_social_post)
social_post_router.get("/:postId", auth("ADMIN", "MENTOR", "STUDENT"), social_post_controllers.get_single_post_by_id_with_share_count)
social_post_router.patch(
    "/:postId",
    auth("ADMIN", "MENTOR", "STUDENT"),
    uploader.single("image"),
    (req, res, next) => {
        req.body = JSON.parse(req?.body?.data);
        next()
    },
    RequestValidator(social_post_validation.update),
    social_post_controllers.update_social_post
)
social_post_router.delete("/:postId", auth("ADMIN", "MENTOR", "STUDENT"), social_post_controllers.delete_social_post)



export default social_post_router