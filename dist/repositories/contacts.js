"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../models/error");
const moment_1 = __importDefault(require("moment"));
const db_1 = require("./db");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const [results] = yield db_1.db.promise().query('SELECT * FROM contact');
    return results;
});
const getOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [results] = yield db_1.db.promise().query('SELECT * FROM contact WHERE id=?', [id]);
    if (!results[0]) {
        throw new error_1.BadRequest('No contact found by provided ID', 404);
    }
    return results[0];
});
const create = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const date = (0, moment_1.default)().format('YYYY/MM/DD');
    const results = yield db_1.db.promise().query(`INSERT INTO contact (date, name, email, phone, subject, comment, archived) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`, [date, c.name, c.email, c.phone, c.subject, c.comment, c.archived]);
    return Object.assign({ id: results[0].insertId }, c);
});
const update = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const [results] = yield db_1.db.promise().query('UPDATE contact SET name=?, email=?, phone=?, subject=?, comment=?, archived=? WHERE id=?', [c.name, c.email, c.phone, c.subject, c.comment, c.archived, c.id]);
    if (results.affectedRows === 0) {
        throw new error_1.BadRequest('No contact found by provided ID', 404);
    }
    return results;
});
const _delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [results] = yield db_1.db.promise().query('DELETE FROM contact WHERE id=?', [id]);
    if (results.affectedRows === 0) {
        throw new error_1.BadRequest('No contact found by provided ID', 404);
    }
    return `Contact with ID ${id} deleted`;
});
exports.default = { getAll, getOne, create, update, delete: _delete };
