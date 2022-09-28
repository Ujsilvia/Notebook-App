"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUser = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET;
const todomodel_1 = require("../model/todomodel");
async function auth(req, res, next) {
    try {
        const authorization = req.cookies.auth_user;
        if (!authorization) {
            res.status(401);
            res.json({
                Error: "kindly sign in as a user",
            });
        }
        //hide part of the token
        const token = authorization?.slice(7, authorization.length);
        let verified = jsonwebtoken_1.default.verify(token, secret);
        if (!verified) {
            res.status(401);
            res.json({
                Error: "User not verified, you cant access this route",
            });
        }
        const { id } = verified;
        const user = await todomodel_1.TodoInstance.findOne({ where: { id } });
        if (!user) {
            res.status(404);
            res.json({
                Error: "user not verified",
            });
        }
        req.user = verified;
        next();
    }
    catch (error) {
        res.status(500);
        res.json({
            Error: "user not logged in",
        });
    }
}
exports.auth = auth;
async function checkUser(req, res, next) {
    try {
        const token = req.cookies.auth_user;
        let verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (verified) {
            const { authorData } = verified;
            const user = await todomodel_1.TodoInstance.findOne({ where: { id: authorData } });
            res.locals.loggedIn = user;
            next();
        }
        else {
            res.locals.loggedIn = null;
            next();
        }
    }
    catch (error) {
        console.log(error);
        res.locals.loggedIn = null;
        next();
    }
}
exports.checkUser = checkUser;
