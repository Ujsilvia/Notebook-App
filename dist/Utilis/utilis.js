"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.generateToken = exports.LoginNoteSchema = exports.registerNoteSchema = exports.updateNoteSchema = exports.createNoteSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.createNoteSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase().required(),
    completed: joi_1.default.boolean().required(),
});
exports.updateNoteSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase(),
    completed: joi_1.default.boolean(),
});
//validating the sign up form,so users can fill the required data
exports.registerNoteSchema = joi_1.default.object()
    .keys({
    note: joi_1.default.string().required(),
    firstname: joi_1.default.string().required(),
    lastname: joi_1.default.string().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    phonenumber: joi_1.default.string()
        .required()
        .length(11)
        .pattern(/^[0-9]+$/),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    confirm_password: joi_1.default.ref("password"),
})
    .with("password", "confirm_password");
exports.LoginNoteSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
});
//generate token
const generateToken = (user) => {
    const pass = process.env.JWT_SECRET;
    return jsonwebtoken_1.default.sign(user, pass, { expiresIn: "7d" });
};
exports.generateToken = generateToken;
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};