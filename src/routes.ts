import { Router } from 'express';
import authRoute from './app/modules/auth/auth.route';
import clinical_route from './app/modules/clinical_case/clinical_case.route';
import dummy_route from './app/modules/dummy/dummy.route';
import studentRoute from './app/modules/student/student.route';
import social_post_router from './app/modules/social_post/social_post.route';
import careerResourceRoute from './app/modules/career_resource/career_resource.route';


const appRouter = Router();

const moduleRoutes = [
    { path: '/auth', route: authRoute },
    { path: "/clinical-case", route: clinical_route },
    { path: "/student", route: studentRoute },
    { path: "/dummy", route: dummy_route },
    { path: "/social-post", route: social_post_router },
    { path: "/career-resource", route: careerResourceRoute }

];

moduleRoutes.forEach(route => appRouter.use(route.path, route.route));
export default appRouter;