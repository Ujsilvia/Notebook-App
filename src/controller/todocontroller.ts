import express, { Request, Response, NextFunction } from "express";
import { LoginInstance } from "../model/login";
import { TodoInstance } from "../model/todomodel";
import { v4 as uuidv4 } from "uuid";
import { createNoteSchema, updateNoteSchema, options } from "../Utilis/utilis";
import { title } from "process";

export async function Notes(req: Request |any, res: Response, next: NextFunction) {
  const id = uuidv4();

  try {
    const verified =req.user
    const validationResult = createNoteSchema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const record = await LoginInstance.create({id, ...req.body, userid:verified.id });
    res.status(201).json({
      message: "You have succesfully created a note",
      record // a shoreter way of writing record:record
    }); //note that json was used instead of send. its more proper for json docs.
  } catch (err) {
    res.status(500).json({
      message: "failed to create",
      route: "/create",
      error: err,
    });
  }
}

export async function getNotes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const limit = req.query.limit as number | undefined;
    const offset = req.query.offset as number | undefined;
    // const record = await LoginInstance.findAll({where:{}, limit, offset})
    const record = await LoginInstance.findAndCountAll({
      where: {},
      limit,
      offset,include:[{
        model:TodoInstance,  
        attributes:['id','firstname','lastname','email', 'phonenumber'], 
        as: 'user'
      }]
    });
    res.status(200);
    res.json({
      msg: "Here are your notes",
      count: record.count,
      record: record.rows,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read all notes",
      route: "/read",
    });
  }
}

export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const record = await LoginInstance.findOne({ where: { id } });
    res.status(200).json({
      msg: "Here is your note",
      record,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to read single note",
      route: "/read/:id",
    });
  }
}

export async function UpdateNotes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const validateResult = updateNoteSchema.validate(req.body, options);
    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }
    const record = await LoginInstance.findOne({ where: { id } });
    if (!record) {
      res.status(404).json({
        Error: "cannot find note",
      });
    }

    const updaterecord = await record?.update({
      title: title,
      completed: completed,
    });
    res.status(200).json({
      message: "you have successfully updated your note",
      record: updaterecord,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to update",
      route: "/update/:id",
    });
  }
}

export async function DeleteNotes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await LoginInstance.findOne({ where: { id } });
    if (!record) {
      res.status(404).json({
        message: "does not exist",
      });
    }
    const deletedRecord = await record?.destroy();
    res.status(200).json({
      msg: "Note has been deleted successfully",
      deletedRecord,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to delete",
      route: "/delete/:id",
    });
  }
}
