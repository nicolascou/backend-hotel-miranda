"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.updateContact = exports.createContact = exports.getContactById = exports.getContacts = void 0;
const contacts_1 = __importDefault(require("../repositories/contacts"));
const getContacts = (_, res) => {
    try {
        return res.send(contacts_1.default.getAll());
    }
    catch (err) {
        return res.sendStatus(500);
    }
};
exports.getContacts = getContacts;
const getContactById = (req, res) => {
    var _a;
    try {
        return res.send(contacts_1.default.getOne(req.params.id));
    }
    catch (err) {
        return res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).send(err.message);
    }
};
exports.getContactById = getContactById;
const createContact = (req, res) => {
    var _a;
    try {
        return res.status(200).send(contacts_1.default.create(req.body));
    }
    catch (err) {
        return res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).send(err.message);
    }
};
exports.createContact = createContact;
const updateContact = (req, res) => {
    var _a;
    try {
        return res.send(contacts_1.default.update(Object.assign({ id: req.params.id }, req.body)));
    }
    catch (err) {
        return res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).send(err.message);
    }
};
exports.updateContact = updateContact;
const deleteContact = (req, res) => {
    var _a;
    try {
        return res.send(contacts_1.default.delete(req.params.id));
    }
    catch (err) {
        return res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).send(err.message);
    }
};
exports.deleteContact = deleteContact;
