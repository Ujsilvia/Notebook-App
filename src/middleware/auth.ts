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
    const authorization = req.cookies.auth_user;
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


export async function checkUser(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.auth_user;
    let verified = jwt.verify(token, process.env.JWT_SECRET as string);
    if (verified) {
    const { authorData } = verified as Record<string, string>;
      const user = await TodoInstance.findOne({ where: { id: authorData } });
      res.locals.loggedIn = user
      next()
    }else{
      res.locals.loggedIn = null
      next()
    }
  } catch (error) {
    console.log(error);
    
    res.locals.loggedIn = null
    next()
  }
}
