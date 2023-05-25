"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const users_1 = __importDefault(require("../repositories/users"));
const getUsers = (_, res) => {
    try {
        return res.send(users_1.default.getAll());
    }
    catch (err) {
        return res.sendStatus(500);
    }
};
exports.getUsers = getUsers;
const getUserById = (req, res) => {
    var _a;
    try {
        return res.send(users_1.default.getOne(Number(req.params.id)));
    }
    catch (err) {
        return res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).send(err.message);
    }
};
exports.getUserById = getUserById;
const createUser = (req, res) => {
    var _a;
    try {
        return res.status(200).send(users_1.default.create(req.body));
    }
    catch (err) {
        return res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).send(err.message);
    }
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    var _a;
    try {
        return res.send(users_1.default.update(Object.assign({ id: Number(req.params.id) }, req.body)));
    }
    catch (err) {
        return res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).send(err.message);
    }
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    var _a;
    try {
        return res.send(users_1.default.delete(Number(req.params.id)));
    }
    catch (err) {
        return res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).send(err.message);
    }
};
exports.deleteUser = deleteUser;
