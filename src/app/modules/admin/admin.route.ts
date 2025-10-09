import { Router } from "express";
import auth from "../../middlewares/auth";
import { admin_controller } from "./admin.controller";

const adminRouter = Router();

adminRouter.get("/overview", auth("ADMIN"), admin_controller.get_all_overview_data)

// for student
adminRouter.get("/students", auth("ADMIN"), admin_controller.get_all_student)
adminRouter.get("/student/:studentId", auth("ADMIN"), admin_controller.get_single_student)
adminRouter.delete("/student/:studentId", auth("ADMIN"), admin_controller.delete_student)

// for professional
adminRouter.get("/professionals", auth("ADMIN"), admin_controller.get_all_professional)
adminRouter.get("/professional/:accountId", auth("ADMIN"), admin_controller.get_single_professional)
adminRouter.delete("/professional/:accountId", auth("ADMIN"), admin_controller.delete_professional)

// for mentor
adminRouter.get("/mentors", auth("ADMIN"), admin_controller.get_all_mentor)
adminRouter.get("/mentor/:accountId", auth("ADMIN"), admin_controller.get_single_mentor)
adminRouter.delete("/mentor/:accountId", auth("ADMIN"), admin_controller.delete_mentor)



export default adminRouter;