import { Request } from "express";
import { AppError } from "../../utils/app_error";
import uploadCloud from "../../utils/cloudinary";
import { isAccountExist } from "../../utils/isAccountExist";
import { TSocialPost } from "./social_post.interface";
import { SocialPostModel } from "./social_post.schema";

const create_new_social_post_in_db = async (req: Request) => {
    const user = req?.user;
    const isUserExist = await isAccountExist(user?.email as string);
    const payload: TSocialPost = req?.body;
    payload.postedBy = isUserExist.profile_id;
    payload.profileType = isUserExist.profile_type;
    if (req?.file) {
        const cloudRes = await uploadCloud(req?.file)
        payload.postImage = cloudRes?.secure_url
    }
    const result = await SocialPostModel.create(payload);
    return result
}
const get_all_social_post_from_db = async (query: any) => {
    const page = query.page && query.page > 0 ? query.page : 1;
    const limit = query.limit && query.limit > 0 ? query.limit : 10;
    const skip = (page - 1) * limit;

    const [total, posts] = await Promise.all([
        SocialPostModel.countDocuments({ isDeleted: false }),
        SocialPostModel.find({ isDeleted: false })
            .populate("postedBy")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
    ]);

    return {
        data: posts,
        meta: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            skip
        }
    };
};

const get_single_post_by_id_with_share_count_from_db = async (req: Request) => {
    const { postId } = req?.params;
    const { isShared } = req?.query;
    if (isShared == "true") {
        await SocialPostModel.findByIdAndUpdate(postId, { $inc: { share: 1 } })
    }
    const result = await SocialPostModel.findOne({ _id: postId, isDeleted: false }).lean().populate("postedBy");
    return result
}

const update_social_post_in_db = async (req: Request) => {
    const user = req?.user;
    const { postId } = req?.params;
    const payload = req?.body;
    const isUserExist = await isAccountExist(user?.email as string);
    const matchPost = await SocialPostModel.findOne({ _id: postId, postedBy: isUserExist?.profile_id }).lean();
    if (!matchPost) {
        throw new AppError("You are not authorized to update this post", 403);
    }
    const result = await SocialPostModel.findOneAndUpdate({ _id: postId, postedBy: isUserExist?.profile_id }, payload, { new: true });
    return result
}
const delete_social_post_from_db = async (req: Request) => {
    const user = req?.user;
    const { postId } = req?.params;
    const isUserExist = await isAccountExist(user?.email as string);
    const matchPost = await SocialPostModel.findOne({ _id: postId, postedBy: isUserExist?.profile_id }).lean();
    if (!matchPost) {
        throw new AppError("You are not authorized to delete this post", 403);
    }
    await SocialPostModel.findOneAndUpdate({ _id: postId, postedBy: isUserExist?.profile_id }, { isDeleted: true });
}
const save_react_social_post_in_db = async (req: Request) => {
    const user = req?.user;
    const { postId } = req?.params;
    const isUserExist = await isAccountExist(user?.email as string);
    const profileId = isUserExist.profile_id;

    // Fetch the post
    const post = await SocialPostModel.findById(postId);
    if (!post) throw new Error("Post not found");
    let result;
    if (post?.reaction?.includes(String(profileId))) {
        // User already reacted → remove
        result = await SocialPostModel.findByIdAndUpdate(
            postId,
            { $pull: { reaction: profileId } },
            { new: true }
        );
    } else {
        // User has not reacted → add
        result = await SocialPostModel.findByIdAndUpdate(
            postId,
            { $addToSet: { reaction: profileId } },
            { new: true }
        );
    }

    return result;
};
const save_comment_social_post_in_db = async (req: Request) => {
    const user = req?.user;
    const { postId } = req?.params;
    const isUserExist = await isAccountExist(user?.email as string, "profile_id") as any;
    const commentPayload = {
        commentedBy: {
            name: isUserExist?.profile_id?.firstName + " " + isUserExist?.profile_id?.lastName,
            profileImage: isUserExist?.profile_id?.profile_photo,
            email: isUserExist?.email
        },
        comment: req?.body?.comment
    }
    // Fetch the post
    const post = await SocialPostModel.findById(postId);
    if (!post) throw new Error("Post not found");

    // User has not reacted → add
    const result = await SocialPostModel.findByIdAndUpdate(
        postId,
        { $addToSet: { comments: commentPayload } },
        { new: true }
    );
    return result;
};


export const social_post_services = {
    create_new_social_post_in_db,
    get_all_social_post_from_db,
    get_single_post_by_id_with_share_count_from_db,
    update_social_post_in_db,
    delete_social_post_from_db,
    save_react_social_post_in_db,
    save_comment_social_post_in_db
}
