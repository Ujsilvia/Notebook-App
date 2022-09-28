
import express, {Request, Response} from "express";
const router = express.Router();
import { getNotes } from "../controller/todocontroller";
  
router.get('/', getNotes)

router.get('/login', (req:Request, res:Response)=>{
    res.render('login', {title:'login page'})
})


router.get('/sigup', (req:Request, res:Response)=>{
    res.render('signup', {title:'signup page'})
})



  export default router