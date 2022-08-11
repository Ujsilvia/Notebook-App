import Joi from "joi";
import jwt from "jsonwebtoken";
export const createNoteSchema = Joi.object().keys({
  title: Joi.string().lowercase().required(),
  completed: Joi.boolean().required(),
});

export const updateNoteSchema = Joi.object().keys({
  title: Joi.string().lowercase(),
  completed: Joi.boolean(),
});

//validating the sign up form,so users can fill the required data

export const registerNoteSchema = Joi.object()
  .keys({
    note: Joi.string().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().trim().lowercase().required(),
    phonenumber: Joi.string()
      .required()
      .length(11)
      .pattern(/^[0-9]+$/),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    confirm_password: Joi.ref("password"),
  })
  .with("password", "confirm_password");

export const LoginNoteSchema = Joi.object().keys({
  email: Joi.string().trim().lowercase().required(),

  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
});

//generate token
export const generateToken = (user: { [key: string]: unknown }): unknown => {
  const pass = process.env.JWT_SECRET as string;
  return jwt.sign(user, pass, { expiresIn: "7d" });
};

export const options = {
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
