import createError from "http-errors";
import { Request, Response, RequestHandler, NextFunction } from "express";

const mongoose = require("mongoose");

const requireAuth: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const user =
        req.session.userId &&

        (await mongoose.model("User").findOne({ _id: req.session.userId }).exec());

    if (!user) {
        return next(
            createError(401, "You need to be logged in to perform this action.")
        );
    }

    next();
};

export default requireAuth;
