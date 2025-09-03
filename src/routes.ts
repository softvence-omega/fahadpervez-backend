import { Router } from 'express';
import authRoute from './app/modules/auth/auth.route';
import clinical_route from './app/modules/clinical_case/clinical_case.route';
import dummy_route from './app/modules/dummy/dummy.route';


const appRouter = Router();

const moduleRoutes = [
    { path: '/auth', route: authRoute },
    { path: "/clinical-case", route: clinical_route },
    { path: "/dummy", route: dummy_route }

];

moduleRoutes.forEach(route => appRouter.use(route.path, route.route));
export default appRouter;