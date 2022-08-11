import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET as string;
import { TodoInstance } from "../model/todomodel";

export async function auth(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      res.status(401);
      res.json({
        Error: "kindly sign in as a user",
      });
    }
    //hide part of the token
    const token = authorization?.slice(7, authorization.length) as string;
    let verified = jwt.verify(token, secret);

    if (!verified) {
      res.status(401);
      res.json({
        Error: "User not verified, you cant access this route",
      });
    }
    const { id } = verified as { [key: string]: string };

    const user = await TodoInstance.findOne({ where: { id } });
    if (!user) {
      res.status(404);
      res.json({
        Error: "user not verified",
      });
    }
    req.user = verified;
    next();
  } catch (error) {
    res.status(500);
    res.json({
      Error: "user not logged in",
    });
  }
}
