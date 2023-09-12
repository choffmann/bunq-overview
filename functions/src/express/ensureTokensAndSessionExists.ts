import {apiContext} from "../index";
import * as express from "express";

export const ensureTokensAndSessionExists = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    await apiContext.create()
    await apiContext.ensureSessionActive()
    next()
}