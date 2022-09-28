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
// import { body, param, query } from 'express-validator';
// class TodoValidator {
//     checkCreateTodo(){
//         return[
//         body("id")
//         .optional()
//         .isUUID(2)
//         .withMessage("The value should be UUID V2 "),
//         body("title")
//         .notEmpty()
//         .withMessage("The title  value should not be empty"),
//         body("completed")
//         .optional()
//         .isBoolean()
//         .withMessage("The value should be boolean ")
//         .isIn([0,false ])
//          .withMessage("The value should be 0 or false")
//     ];
//     }
//     validate(x: any):any{
//         console.log('shout')
//     }
// }
// export default new TodoValidator();
// //Here we validated what the users will do,by inclusing typing in small lette while signing in etc
// import Joi from 'joi'
// export const createTodoSchema = Joi.object().keys({
//     title:Joi.string().lowercase().required(),
//     completed:Joi.boolean().required()
// })
// // export const updateTodoSchema = Joi.object().keys({
// //     title:Joi.string().lowercase(),
// //     completed:Joi.boolean()
// // })
// export const options ={
//     abortEarly:false,
//     errors:{
//         wrap:{
//             label:''
//         }
//     }
// }
