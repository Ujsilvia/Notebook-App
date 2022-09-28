"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const todocontroller_1 = require("../controller/todocontroller");
router.get('/', todocontroller_1.getNotes);
router.get('/login', (req, res) => {
    res.render('login', { title: 'login page' });
});
router.get('/sigup', (req, res) => {
    res.render('signup', { title: 'signup page' });
});
exports.default = router;
