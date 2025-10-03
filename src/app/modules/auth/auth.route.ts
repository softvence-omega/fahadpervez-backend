import { Router } from "express";
import auth from "../../middlewares/auth";
import RequestValidator from "../../middlewares/request_validator";
import uploader from "../../middlewares/uploader";
import { auth_controllers } from "./auth.controller";
import { auth_validation } from "./auth.validation";

const authRoute = Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: secret123
 *     responses:
 *       200:
 *         description: User registered successfully
 */
authRoute.post("/register", RequestValidator(auth_validation.register_validation), auth_controllers.register_user);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: softvence.abumahid@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
authRoute.post("/login", RequestValidator(auth_validation.login_validation), auth_controllers.login_user);

/**
 * @openapi
 * /api/auth/verified-account:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Verify account using OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               otp:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Account verified successfully
 */
authRoute.post("/verified-account", RequestValidator(auth_validation.verified_account), auth_controllers.verified_account);

/**
 * @openapi
 * /api/auth/new-verification-otp:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Get a new verification OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */
authRoute.post("/new-verification-otp", RequestValidator(auth_validation.newVerificationOtp), auth_controllers.get_new_verification_otp);

/**
 * @openapi
 * /api/auth/set-new-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Set a new password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: newSecret123
 *     responses:
 *       200:
 *         description: Password set successfully
 */
authRoute.post("/set-new-password", RequestValidator(auth_validation.login_validation), auth_controllers.set_new_password);

/**
 * @openapi
 * /api/auth/forgot-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Request password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent
 */
authRoute.post("/forgot-password", RequestValidator(auth_validation.forgotPassword), auth_controllers.forget_password);

/**
 * @openapi
 * /api/auth/reset-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Reset password using OTP
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               otp:
 *                 type: string
 *                 example: 123456
 *               newPassword:
 *                 type: string
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: Password reset successfully
 */
authRoute.post("/reset-password", RequestValidator(auth_validation.resetPassword), auth_controllers.reset_password);

/**
 * @openapi
 * /api/auth/change-password:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Change password for logged-in user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: oldPassword123
 *               newPassword:
 *                 type: string
 *                 example: newPassword123
 *     responses:
 *       200:
 *         description: Password changed successfully
 */
authRoute.post("/change-password", auth("STUDENT", "MENTOR", "PROFESSIONAL", "ADMIN"), RequestValidator(auth_validation.changePassword), auth_controllers.change_password);

/**
 * @openapi
 * /api/auth/change-status:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Change profile status (ADMIN only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - status
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               status:
 *                 type: string
 *                 enum: [ACTIVE, INACTIVE, SUSPENDED]
 *     responses:
 *       200:
 *         description: Status changed successfully
 */
authRoute.post("/change-status", auth("ADMIN"), RequestValidator(auth_validation.change_profile_status), auth_controllers.change_profile_status);

/**
 * @openapi
 * /api/auth/sign-in-with-google:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Sign in with Google
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               name:
 *                 type: string
 *                 example: John Doe
 *               photo:
 *                 type: string
 *                 example: https://example.com/photo.jpg
 *     responses:
 *       200:
 *         description: Signed in successfully
 */
authRoute.post("/sign-in-with-google", RequestValidator(auth_validation.sign_in_with_google), auth_controllers.sign_in_with_google);

/**
 * @openapi
 * /api/auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get logged-in user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile data
 */
authRoute.get('/me', auth("STUDENT", "MENTOR", "PROFESSIONAL", "ADMIN"), auth_controllers.get_my_profile);

/**
 * @openapi
 * /api/auth/refresh-token:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Refresh JWT token
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 */
authRoute.post('/refresh-token', auth_controllers.refresh_token);

/**
 * @openapi
 * /api/auth/update-initial-profile:
 *   patch:
 *     tags:
 *       - Auth
 *     summary: Update initial profile with file upload
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               data:
 *                 type: string
 *                 description: JSON string of profile data
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */
authRoute.patch(
    "/update-initial-profile",
    auth("STUDENT", "MENTOR", "PROFESSIONAL", "ADMIN"),
    uploader.single("image"),
    (req, res, next) => {
        if (req.body) {
            req.body = JSON.parse(req?.body?.data);
        }
        next();
    },
    RequestValidator(auth_validation.updateProfile),
    auth_controllers.update_student_profile
);

export default authRoute;
