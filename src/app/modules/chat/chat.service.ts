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

export const chat_services = {
    save_chat_into_db
}