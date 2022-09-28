import express from "express";
const router = express.Router();
import { LoginUser, RegisterUser, getUsers, } from "../controller/usercontroller";

/* GET home page. */
router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get('/allusers',getUsers)

// router.put('/update', verifyToken, updateAuthor)
// router.delete('/delete', verifyToken, deleteAccount)

export default router;
