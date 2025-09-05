import { AppError } from "../../utils/app_error";
import { TAccount, TLoginPayload, TRegisterPayload, TStatus } from "./auth.interface";
import { Account_Model } from "./auth.schema";
import httpStatus from 'http-status';
import bcrypt from "bcrypt";
import { jwtHelpers } from "../../utils/JWT";
import { configs } from "../../configs";
import { JwtPayload, Secret } from "jsonwebtoken";
import sendMail from "../../utils/mail_sender";
import { isAccountExist } from './../../utils/isAccountExist';
import { OTPMaker } from "../../utils/otpMaker";
import { Request } from "express";
import { Student_Model } from "../student/student.schema";
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
  if (isExistAccount.accountStatus === "INACTIVE") {
    throw new AppError('Account is not active, contact us on support', httpStatus.UNAUTHORIZED);
  }
  if (isExistAccount.accountStatus === "SUSPENDED") {
    throw new AppError('Account is suspended, contact us on support', httpStatus.UNAUTHORIZED);
  }
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

const update_student_profile_into_db = async (req: Request) => {
  const body = req?.body;
  const updateStudentPayload: any = {
    university: body.university,
    country: body.country,
    year_of_study: body.year_of_study,
    preparingFor: body.preparingFor,
    firstName: body.firstName,
    lastName: body.lastName
  }
  const updateAccountPayload: any = {
    studentType: body.studentType
  }

  const isExistAccount = await isAccountExist(req?.user?.email!)
  if (isExistAccount?.profile_id) {
    await Student_Model.findOneAndUpdate({ accountId: isExistAccount?._id }, updateStudentPayload)
  } else {
    updateStudentPayload.accountId = isExistAccount._id
    const profileRes = await Student_Model.create(updateStudentPayload)
    updateAccountPayload.profile_id = profileRes._id
    updateAccountPayload.profile_type = "student_profile"
  }
  await Account_Model.findOneAndUpdate({ email: isExistAccount.email }, updateAccountPayload)

  const updateResponse: any = await Account_Model.findOne({ email: isExistAccount.email })
    .select("-password -lastOTP -__v")
    .populate("profile_id")
    .lean()
  if (updateResponse?.profile_id) {
    updateResponse.profile = updateResponse.profile_id;
    delete updateResponse.profile_id;
  }

  return updateResponse
};
const get_my_profile_from_db = async (email: string) => {
  const isExistAccount = await isAccountExist(email)
  const profile = await Student_Model.findOne({ accountId: isExistAccount._id }).lean();
  isExistAccount.password = ""
  return {
    account: isExistAccount,
    profile: profile || ""
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
  const otp = OTPMaker()
  await Account_Model.findOneAndUpdate({ email: isAccountExists.email }, { lastOTP: otp })
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
                Hi,
              </h1>
            </td>
          </tr>

          <tr>
            <td align="left" style="padding:8px 24px 0 24px;">
              <p style="margin:0; font-size:15px; line-height:24px; color:#374151; font-family:Arial, sans-serif;">
                Here is your reset One Time Password (OTP). Please enter this code to verify your email address for MSH.
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
    subject: "Password reset successful!",
    textBody: "Your password is successfully reset.",
    htmlBody: emailTemp
  });

  return 'Check your email for reset link';
};

const reset_password_into_db = async (
  otp: string,
  email: string,
  newPassword: string,
) => {

  const isAccountExists = await isAccountExist(email)
  if (isAccountExists.email !== email) {
    throw new AppError('Invalid email', httpStatus.UNAUTHORIZED);
  }
  if (isAccountExists.lastOTP !== otp) {
    throw new AppError('Invalid OTP', httpStatus.UNAUTHORIZED);
  }
  const hashedPassword: string = await bcrypt.hash(newPassword, 10);

  await Account_Model.findOneAndUpdate({ email: isAccountExists.email }, {
    password: hashedPassword,
  })
  return 'Password reset successfully!';
};

const change_profile_status_from_db = async (
  status: TStatus,
  email: string,
) => {
  await Account_Model.findOneAndUpdate({ email: email }, {
    accountStatus: status,
  })
  return null;
};

const sign_in_with_google_and_save_in_db = async (payload: any) => {
  // Try to find account and create if not exists in one step
  let account = await Account_Model.findOneAndUpdate(
    { email: payload.email },
    {
      $setOnInsert: {
        email: payload.email,
        authType: "GOOGLE",
        accountStatus: "ACTIVE",
        isVerified: true,
        role: "STUDENT",
        profile_type: "student_profile",
      },
    },
    { upsert: true, new: true }
  ).lean();

  // If account was newly created and profile not yet set
  if (!account.profile_id) {
    const profilePromise = Student_Model.create({
      firstName: payload.name,
      profile_photo: payload.photo,
      accountId: account._id,
    });

    const [profile] = await Promise.all([profilePromise]);

    // Update account with profile_id
    await Account_Model.findByIdAndUpdate(account._id, { profile_id: profile._id });

    account.profile_id = profile._id; // update local object
  }

  // Generate tokens
  const tokenPayload = { email: account.email, role: account.role };
  const [accessToken, refreshToken] = await Promise.all([
    jwtHelpers.generateToken(tokenPayload, configs.jwt.access_token as Secret, configs.jwt.access_expires as string),
    jwtHelpers.generateToken(tokenPayload, configs.jwt.refresh_token as Secret, configs.jwt.refresh_expires as string),
  ]);

  return {
    accessToken,
    refreshToken,
    role: account.role,
  };
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
  set_new_password_into_db,
  update_student_profile_into_db,
  change_profile_status_from_db,
  sign_in_with_google_and_save_in_db
}
