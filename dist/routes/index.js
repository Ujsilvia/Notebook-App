"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const usercontroller_1 = require("../controller/usercontroller");
/* GET home page. */
router.post("/register", usercontroller_1.RegisterUser);
router.post("/login", usercontroller_1.LoginUser);
router.get('/allusers', usercontroller_1.getUsers);
// router.put('/update', verifyToken, updateAuthor)
// router.delete('/delete', verifyToken, deleteAccount)
exports.default = router;
