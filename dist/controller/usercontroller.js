"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.LoginUser = exports.RegisterUser = void 0;
const uuid_1 = require("uuid");
const utilis_1 = require("../Utilis/utilis");
const todomodel_1 = require("../model/todomodel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login_1 = require("../model/login");
async function RegisterUser(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validateResult = utilis_1.registerNoteSchema.validate(req.body, utilis_1.options);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message,
            });
        }
        const duplicatEmail = await todomodel_1.TodoInstance.findOne({
            where: { email: req.body.email },
        });
        if (duplicatEmail) {
            res.status(409).json({
                msg: "Email has be used already",
            });
        }
        const duplicatePhone = await todomodel_1.TodoInstance.findOne({
            where: { phonenumber: req.body.phonenumber },
        });
        if (duplicatePhone) {
            res.status(409).json({
                msg: "Phone number has been used already",
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const record = await todomodel_1.TodoInstance.create({
            id: id,
            note: req.body.note,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            password: passwordHash,
        });
        res.status(201);
        res.json({
            message: "You have successfully enrolled your course.",
            record,
        });
    }
    catch (err) {
        res.status(500).json({
            message: "failed to register",
            route: "/register",
        });
    }
}
exports.RegisterUser = RegisterUser;
async function LoginUser(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const validateResult = utilis_1.LoginNoteSchema.validate(req.body, utilis_1.options);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message,
            });
        }
        const user = (await todomodel_1.TodoInstance.findOne({
            where: { email: req.body.email },
        }));
        const { id } = user;
        const token = (0, utilis_1.generateToken)({ id });
        const validUser = await bcryptjs_1.default.compare(req.body.password, user.password);
        res.cookie('auth_user', token, { maxAge: 1000 * 60 * 60 });
        if (!validUser) {
            res.status(401);
            res.json({ message: "incorrect password" });
        }
        if (validUser) {
            res.status(200);
            res.json({ message: "login successful", token, user });
        }
    }
    catch (err) {
        res.status(500);
        res.json({
            message: "failed to login",
            route: "/login",
        });
    }
}
exports.LoginUser = LoginUser;
async function getUsers(req, res, next) {
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        // const record = await LoginInstance.findAll({where:{}, limit, offset})
        const record = await todomodel_1.TodoInstance.findAndCountAll({ where: {}, limit, offset, include: [{
                    model: login_1.LoginInstance,
                    as: 'notes'
                }]
        });
        res.status(200);
        res.json({
            msg: "you have successfully retrieved all users",
            count: record.count,
            record: record.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read ",
            route: "/allusers",
        });
    }
}
exports.getUsers = getUsers;
