import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const RequestValidator = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body);
            next();
        } catch (err) {
            next(err);
        }
    };
};

export default RequestValidator;