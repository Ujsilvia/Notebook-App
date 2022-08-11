import express, { Request, Response, NextFunction } from "express";
const router = express.Router();
import {
  DeleteNotes,
  getNotes,
  Notes,
  UpdateNotes,
  getOne,
} from "../controller/todocontroller";
import { auth } from "../middleware/auth";

/* GET users listing. */
// router.get('/', function(req:Request, res:Response, next:NextFunction) {
//   res.send('respond with a resource');
// });
router.post("/create", auth, Notes);
router.get("/read", getNotes);
router.get("/read/:id", getOne);
router.patch("/update/:id", auth, UpdateNotes);
router.delete("/delete/:id", auth, DeleteNotes);

export default router;
