import { Request } from "express";
import { TChatMessage } from "./chat.interface";
import { ChatMessageModel } from "./chat.schema";

const save_chat_into_db = async (req: Request) => {
    const user = req?.user;
    const body: TChatMessage = req?.body;
    body.userId = user?.accountId as string;
    const result = await ChatMessageModel.create(body);
    return result
}
const get_all_chat_from_db = async (req: Request) => {
    const user = req?.user;
    const page = parseInt(req.query.page as string) || 1;  // default page 1
    const limit = parseInt(req.query.limit as string) || 10; // default 10 items
    const skip = (page - 1) * limit;

    const [result, total] = await Promise.all([
        ChatMessageModel.find({ userId: user?.accountId as string })
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }), // latest first
        ChatMessageModel.countDocuments({ userId: user?.accountId as string })
    ]);

    return {
        data: result,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};


const get_chat_by_sessionId_chat_id_from_db = async (req: Request) => {
    const id = req?.params?.id;
    const result = await ChatMessageModel.findOne({$or:[
        { sessionId: id },
        { id: id },

    ] });
    return result
}

export const chat_services = {
    save_chat_into_db,
    get_all_chat_from_db,
    get_chat_by_sessionId_chat_id_from_db
}