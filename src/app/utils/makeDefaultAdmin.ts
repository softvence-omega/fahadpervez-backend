import { configs } from "../configs"
import { Admin_Model } from "../modules/admin/admin.schema"
import { Account_Model } from "../modules/auth/auth.schema"
import bcrypt from 'bcrypt';

export const makeDefaultAdmin = async () => {
    const isAdminExist = await Account_Model.exists({ role: "ADMIN", isDeleted: false });
    if (isAdminExist) return;

    const session = await Account_Model.startSession();
    session.startTransaction();
    try {
        const accountRes = await Account_Model.create(
            [
                {
                    email: configs.admin.email,
                    password: bcrypt.hashSync(configs.admin.password as string, 10),
                    role: "ADMIN",
                    profile_type: "admin_profile",
                    isVerified: true,
                    accountStatus: "ACTIVE",
                },
            ],
            { session }
        );

        const profileRes = await Admin_Model.create(
            [
                {
                    firstName: "Admin",
                    lastName: "admin",
                    accountId: accountRes[0]._id,
                },
            ],
            { session }
        );

        await Account_Model.findByIdAndUpdate(
            accountRes[0]._id,
            { profileId: profileRes[0]._id },
            { session }
        );

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};
