import { Router } from 'express';
import adminRouter from './app/modules/admin/admin.route';
import authRoute from './app/modules/auth/auth.route';
import careerResourceRoute from './app/modules/career_resource/career_resource.route';
import chatRouter from './app/modules/chat/chat.route';
import clinical_route from './app/modules/clinical_case/clinical_case.route';
import dummy_route from './app/modules/dummy/dummy.route';
import flash_card_router from './app/modules/flash_card/flash_card.route';
import mcqBankRouter from './app/modules/mcq_bank/mcq_bank.route';
import social_post_router from './app/modules/social_post/social_post.route';
import studentRoute from './app/modules/student/student.route';
import study_mode_tree_router from './app/modules/study_mode_tree/study_mode_tree.route';
import examRoute from './app/modules/exam/exam.route';
import reportRoute from './app/modules/report/report.route';
import profile_type_constRoute from './app/modules/profile_type_const/profile_type_const.route';


const appRouter = Router();

const moduleRoutes = [
    { path: "/profile_type_const", route: profile_type_constRoute },
    { path: "/report", route: reportRoute },
    { path: "/exam", route: examRoute },
    { path: "/study_mode_tree", route: study_mode_tree_router },
    { path: '/auth', route: authRoute },
    { path: "/clinical-case", route: clinical_route },
    { path: "/student", route: studentRoute },
    { path: "/dummy", route: dummy_route },
    { path: "/social-post", route: social_post_router },
    { path: "/career-resource", route: careerResourceRoute },
    { path: "/flash-card", route: flash_card_router },
    { path: "/chat", route: chatRouter },
    { path: "/mcq-bank", route: mcqBankRouter },
    { path: "/admin", route: adminRouter }

];

moduleRoutes.forEach(route => appRouter.use(route.path, route.route));
export default appRouter;