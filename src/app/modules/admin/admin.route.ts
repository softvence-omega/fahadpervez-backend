import { Router } from "express";
import auth from "../../middlewares/auth";
import { admin_controller } from "./admin.controller";

const adminRouter = Router();

adminRouter.get("/overview", auth("ADMIN"), admin_controller.get_all_overview_data)
adminRouter.get("/students", auth("ADMIN"), admin_controller.get_all_student)
adminRouter.get("/student/:studentId", auth("ADMIN"), admin_controller.get_single_student)
adminRouter.delete("/student/:studentId", auth("ADMIN"), admin_controller.delete_student)



export default adminRouter;