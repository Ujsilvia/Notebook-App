import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4, validate } from "uuid";
import {
  registerNoteSchema,
  options,
  LoginNoteSchema,
  generateToken,
} from "../Utilis/utilis";
import { TodoInstance } from "../model/todomodel";
import bcrypt from "bcryptjs";
import { LoginInstance } from "../model/login";

export async function RegisterUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validateResult = registerNoteSchema.validate(req.body, options);
    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }
    const duplicatEmail = await TodoInstance.findOne({
      where: { email: req.body.email },
    });
    if (duplicatEmail) {
      res.status(409).json({
        msg: "Email has be used already",
      });
    }
    const duplicatePhone = await TodoInstance.findOne({
      where: { phonenumber: req.body.phonenumber },
    });
    if (duplicatePhone) {
      res.status(409).json({
        msg: "Phone number has been used already",
      });
    }
    const passwordHash = await bcrypt.hash(req.body.password, 8);
    const record = await TodoInstance.create({
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
  } catch (err) {
    res.status(500).json({
      message: "failed to register",
      route: "/register",
    });
  }
}

export async function LoginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validateResult = LoginNoteSchema.validate(req.body, options);
    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }
    const user = (await TodoInstance.findOne({
      where: { email: req.body.email },
    })) as unknown as { [key: string]: string };

    const { id } = user;
    const token = generateToken({ id });
    const validUser = await bcrypt.compare(req.body.password, user.password);
    res.cookie("auth_user", token, { maxAge: 1000 * 60 * 60 });
    if (!validUser) {
      res.status(401);
      res.json({ message: "incorrect password" });
    }
    if (validUser) {
      res.status(200);
      res.json({ message: "login successful", token, user });
    }
  } catch (err) {
    res.status(500);
    res.json({
      message: "failed to login",
      route: "/login",
    });
  }
}

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query.limit as number | undefined;
    const offset = req.query.offset as number | undefined;
    // const record = await LoginInstance.findAll({where:{}, limit, offset})
    const record = await TodoInstance.findAndCountAll({
      where: {},
      limit,
      offset,
      include: [
        {
          model: LoginInstance,
          as: "notes",
        },
      ],
    });
    res.status(200);
    res.json({
      msg: "you have successfully retrieved all users",
      count: record.count,
      record: record.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read ",
      route: "/allusers",
    });
  }
}
