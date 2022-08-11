"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const todocontroller_1 = require("../controller/todocontroller");
const auth_1 = require("../middleware/auth");
/* GET users listing. */
// router.get('/', function(req:Request, res:Response, next:NextFunction) {
//   res.send('respond with a resource');
// });
router.post("/create", auth_1.auth, todocontroller_1.Notes);
router.get("/read", todocontroller_1.getNotes);
router.get("/read/:id", todocontroller_1.getOne);
router.patch("/update/:id", auth_1.auth, todocontroller_1.UpdateNotes);
router.delete("/delete/:id", auth_1.auth, todocontroller_1.DeleteNotes);
exports.default = router;
