"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteNotes = exports.UpdateNotes = exports.getOne = exports.getNotes = exports.Notes = void 0;
const login_1 = require("../model/login");
const todomodel_1 = require("../model/todomodel");
const uuid_1 = require("uuid");
const utilis_1 = require("../Utilis/utilis");
async function Notes(req, res, next) {
    const id = (0, uuid_1.v4)();
    try {
        const verified = req.user;
        const validationResult = utilis_1.createNoteSchema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await login_1.LoginInstance.create({ id, ...req.body, userid: verified.id });
        res.status(201).json({
            message: "You have succesfully created a note",
            record // a shoreter way of writing record:record
        }); //note that json was used instead of send. its more proper for json docs.
    }
    catch (err) {
        res.status(500).json({
            message: "failed to create",
            route: "/create",
            error: err,
        });
    }
}
exports.Notes = Notes;
async function getNotes(req, res, next) {
    try {
        const limit = req.query.limit;
        const offset = req.query.offset;
        // const record = await LoginInstance.findAll({where:{}, limit, offset})
        const record = await login_1.LoginInstance.findAndCountAll({
            where: {},
            limit,
            offset, include: [{
                    model: todomodel_1.TodoInstance,
                    attributes: ['id', 'firstname', 'lastname', 'email', 'phonenumber'],
                    as: 'user'
                }]
        });
        res.status(200);
        res.json({
            msg: "Here are your notes",
            count: record.count,
            record: record.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read all notes",
            route: "/read",
        });
    }
}
exports.getNotes = getNotes;
async function getOne(req, res, next) {
    try {
        const { id } = req.params;
        const record = await login_1.LoginInstance.findOne({ where: { id } });
        res.status(200).json({
            msg: "Here is your note",
            record,
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to read single note",
            route: "/read/:id",
        });
    }
}
exports.getOne = getOne;
async function UpdateNotes(req, res, next) {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const validateResult = utilis_1.updateNoteSchema.validate(req.body, utilis_1.options);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message,
            });
        }
        const record = await login_1.LoginInstance.findOne({ where: { id } });
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
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to update",
            route: "/update/:id",
        });
    }
}
exports.UpdateNotes = UpdateNotes;
async function DeleteNotes(req, res, next) {
    try {
        const { id } = req.params;
        const record = await login_1.LoginInstance.findOne({ where: { id } });
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
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to delete",
            route: "/delete/:id",
        });
    }
}
exports.DeleteNotes = DeleteNotes;
