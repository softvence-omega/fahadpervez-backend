import { AppError } from "../../utils/app_error";
import { TAccount, TLoginPayload, TRegisterPayload } from "./auth.interface";
import { Account_Model } from "./auth.schema";
import httpStatus from 'http-status';
import bcrypt from "bcrypt";
import { User_Model } from "../user/user.schema";
import { jwtHelpers } from "../../utils/JWT";
import { configs } from "../../configs";
import { JwtPayload, Secret } from "jsonwebtoken";
import sendMail from "../../utils/mail_sender";
import { isAccountExist } from './../../utils/isAccountExist';
import { OTPMaker } from "../../utils/otpMaker";
// register user
const register_user_into_db = async (payload: TRegisterPayload) => {
    const isExistAccount = await Account_Model.findOne({ email: payload?.email });
    if (isExistAccount) {
        throw new AppError("Account already exist!!", httpStatus.BAD_REQUEST);
    }
    // Generate 6-digit OTP
    const otp = OTPMaker();
    const otpDigits = otp.split("");

    const accountRegistrationPayload: Partial<TAccount> = {
        email: payload?.email,
        lastOTP: otp,
        role: "STUDENT",
        profile_type: "student_profile",
        authType: "CUSTOM",

    }
    await Account_Model.create(accountRegistrationPayload)

    // Email template
    const emailTemp = `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f6f7fb; margin:0; padding:0;">
    <tr>
      <td align="center" style="padding:80px 5px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
          style="max-width:640px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 16px rgba(17,24,39,0.08); padding: 40px;">

          <tr>
            <td align="left" style="padding:0 24px 4px 24px;">
              <h1 style="margin:0; font-size:24px; line-height:32px; color:#111827; font-weight:800; font-family:Arial, sans-serif;">
                Hi Dear,
              </h1>
            </td>
          </tr>

          <tr>
            <td align="left" style="padding:8px 24px 0 24px;">
              <p style="margin:0; font-size:15px; line-height:24px; color:#374151; font-family:Arial, sans-serif;">
                Here is your One Time Password (OTP). Please enter this code to verify your email address for MSH.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:20px 24px 8px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                <tr>
                  ${otpDigits
            .map(
                (digit) => `
                    <td align="center" valign="middle"
                      style="background:#f5f3ff; border-radius:12px; width:56px; height:56px;">
                      <div style="font-size:22px; line-height:56px; color:#111827; font-weight:700; font-family:Arial, sans-serif; text-align:center;">
                        ${digit}
                      </div>
                    </td>
                    <td style="width:12px;">&nbsp;</td>
                  `
            )
            .join("")}
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="left" style="padding:8px 24px 4px 24px;">
              <p style="margin:0; font-size:14px; line-height:22px; color:#6b7280; font-family:Arial, sans-serif;">
                OTP will expire in <span style="font-weight:700; color:#111827;">5 minutes</span>.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;

    await sendMail({
        to: payload?.email,
        textBody: `Your OTP is ${otp}`,
        subject: "Verify your email",
        htmlBody: emailTemp,
    });
    return "Please check your mailbox for the OTP"
};
const verified_account_into_db = async (payload: { email: string, otp: string }) => {
    const isAccountExists = await isAccountExist(payload.email)
    if (isAccountExists.isVerified) {
        throw new AppError('Account already verified', httpStatus.BAD_REQUEST);
    }
    if (isAccountExists.lastOTP !== payload.otp) {
        throw new AppError('Invalid OTP', httpStatus.UNAUTHORIZED);
    }

    await Account_Model.findOneAndUpdate({ email: payload.email }, {
        isVerified: true,
        lastOTP: "",
    });

    return 'Account verified successfully!';
}

const get_new_verification_otp_from_db = async (email: string) => {
    await isAccountExist(email)
    const otp = OTPMaker();
    await Account_Model.findOneAndUpdate({ email }, { lastOTP: otp })
    const otpDigits = otp.split("");
    const emailTemp = `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#f6f7fb; margin:0; padding:0;">
    <tr>
      <td align="center" style="padding:80px 5px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"
          style="max-width:640px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 16px rgba(17,24,39,0.08); padding: 40px;">

          <tr>
            <td align="left" style="padding:0 24px 4px 24px;">
              <h1 style="margin:0; font-size:24px; line-height:32px; color:#111827; font-weight:800; font-family:Arial, sans-serif;">
                Hi Dear,
              </h1>
            </td>
          </tr>

          <tr>
            <td align="left" style="padding:8px 24px 0 24px;">
              <p style="margin:0; font-size:15px; line-height:24px; color:#374151; font-family:Arial, sans-serif;">
                Here is your another One Time Password (OTP). Please enter this code to verify your email address for MSH.
              </p>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:20px 24px 8px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
                <tr>
                  ${otpDigits
            .map(
                (digit) => `
                    <td align="center" valign="middle"
                      style="background:#f5f3ff; border-radius:12px; width:56px; height:56px;">
                      <div style="font-size:22px; line-height:56px; color:#111827; font-weight:700; font-family:Arial, sans-serif; text-align:center;">
                        ${digit}
                      </div>
                    </td>
                    <td style="width:12px;">&nbsp;</td>
                  `
            )
            .join("")}
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td align="left" style="padding:8px 24px 4px 24px;">
              <p style="margin:0; font-size:14px; line-height:22px; color:#6b7280; font-family:Arial, sans-serif;">
                OTP will expire in <span style="font-weight:700; color:#111827;">5 minutes</span>.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;

    await sendMail({
        to: email,
        subject: "New OTP for account verification",
        textBody: `New OTP is sent to your email on ${new Date().toLocaleDateString()}`,
        htmlBody: emailTemp
    })

    return null
}

const set_new_password_into_db = async (payload: { email: string, password: string }) => {
    const isExistAccount = await isAccountExist(payload.email)
    if (!isExistAccount.isVerified) {
        throw new AppError('Account is not verified', httpStatus.UNAUTHORIZED);
    }
    const hashedPassword: string = await bcrypt.hash(payload.password, 10);
    await Account_Model.findOneAndUpdate({ email: isExistAccount.email }, {
        password: hashedPassword,
    })
    return 'Password changed successful.';
}

const login_user_from_db = async (payload: TLoginPayload) => {
    // check account info 
    const isExistAccount = await isAccountExist(payload?.email)
    const isPasswordMatch = await bcrypt.compare(
        payload.password,
        isExistAccount.password,
    );

    if (!isPasswordMatch) {
        throw new AppError('Invalid password', httpStatus.UNAUTHORIZED);
    }
    const accessToken = jwtHelpers.generateToken(
        {
            email: isExistAccount.email,
            role: isExistAccount.role,
        },
        configs.jwt.access_token as Secret,
        configs.jwt.access_expires as string,
    );

    const refreshToken = jwtHelpers.generateToken(
        {
            email: isExistAccount.email,
            role: isExistAccount.role,
        },
        configs.jwt.refresh_token as Secret,
        configs.jwt.refresh_expires as string,
    );
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        role: isExistAccount.role
    };

}

const get_my_profile_from_db = async (email: string) => {
    const isExistAccount = await isAccountExist(email)
    const accountProfile = await User_Model.findOne({ accountId: isExistAccount._id })
    isExistAccount.password = ""
    return {
        account: isExistAccount,
        profile: accountProfile
    };
};

const refresh_token_from_db = async (token: string) => {
    let decodedData;
    try {
        decodedData = jwtHelpers.verifyToken(
            token,
            configs.jwt.refresh_token as Secret,
        );
    } catch (err) {
        throw new Error('You are not authorized!');
    }

    const userData = await isAccountExist(decodedData.email)

    const accessToken = jwtHelpers.generateToken(
        {
            email: userData!.email,
            role: userData!.role,
        },
        configs.jwt.access_token as Secret,
        configs.jwt.access_expires as string,
    );

    return accessToken;
};

const change_password_from_db = async (
    user: JwtPayload,
    payload: {
        oldPassword: string;
        newPassword: string;
    },
) => {
    const isExistAccount = await isAccountExist(user.email)
    const isCorrectPassword: boolean = await bcrypt.compare(
        payload.oldPassword,
        isExistAccount.password,
    );

    if (!isCorrectPassword) {
        throw new AppError('Old password is incorrect', httpStatus.UNAUTHORIZED);
    }

    const hashedPassword: string = await bcrypt.hash(payload.newPassword, 10);
    await Account_Model.findOneAndUpdate({ email: isExistAccount.email }, {
        password: hashedPassword,
        lastPasswordChange: Date()
    })
    return 'Password changed successful.';
};

const forget_password_from_db = async (email: string) => {
    const isAccountExists = await isAccountExist(email)
    const resetToken = jwtHelpers.generateToken(
        {
            email: isAccountExists.email,
            role: isAccountExists.role,
        },
        configs.jwt.reset_secret as Secret,
        configs.jwt.reset_expires as string,
    );

    const resetPasswordLink = `${configs.jwt.front_end_url}/reset?token=${resetToken}&email=${isAccountExists.email}`;
    const emailTemplate = `<p>Click the link below to reset your password:</p><a href="${resetPasswordLink}">Reset Password</a>`;

    await sendMail({
        to: email,
        subject: "Password reset successful!",
        textBody: "Your password is successfully reset.",
        htmlBody: emailTemplate
    });

    return 'Check your email for reset link';
};

const reset_password_into_db = async (
    token: string,
    email: string,
    newPassword: string,
) => {
    let decodedData: JwtPayload;
    try {
        decodedData = jwtHelpers.verifyToken(
            token,
            configs.jwt.reset_secret as Secret,
        );
    } catch (err) {
        throw new AppError(
            'Your reset link is expire. Submit new link request!!',
            httpStatus.UNAUTHORIZED,
        );
    }

    const isAccountExists = await isAccountExist(email)
    if (isAccountExists.email !== email) {
        throw new AppError('Invalid email', httpStatus.UNAUTHORIZED);
    }
    const hashedPassword: string = await bcrypt.hash(newPassword, 10);

    await Account_Model.findOneAndUpdate({ email: isAccountExists.email }, {
        password: hashedPassword,
        lastPasswordChange: Date()
    })
    return 'Password reset successfully!';
};




export const auth_services = {
    register_user_into_db,
    login_user_from_db,
    get_my_profile_from_db,
    refresh_token_from_db,
    change_password_from_db,
    forget_password_from_db,
    reset_password_into_db,
    verified_account_into_db,
    get_new_verification_otp_from_db,
    set_new_password_into_db
}
