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
    const [results] = yield db_1.db.promise().query('SELECT * FROM users');
    return results;
});
const getOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [results] = yield db_1.db.promise().query('SELECT * FROM users WHERE id=?', [id]);
    if (!results[0]) {
        throw new error_1.BadRequest('No user found by provided ID', 404);
    }
    return results[0];
});
const create = (u) => __awaiter(void 0, void 0, void 0, function* () {
    const start_date = (0, moment_1.default)().format('YYYY-MM-DD');
    const [results] = yield db_1.db.promise().execute('INSERT INTO users (full_name, description, email, password, photo, position, active, username, phone, start_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [u.full_name, u.description, u.email, u.password, u.photo, u.position, u.active, u.username, u.phone, start_date]);
    return Object.assign({ id: results.insertId }, u);
});
const update = (u) => __awaiter(void 0, void 0, void 0, function* () {
    const [results] = yield db_1.db.promise().execute('UPDATE users SET full_name=?, description=?, email=?, password=?, photo=?, position=?, active=?, username=?, phone=? WHERE id=?', [u.full_name, u.description, u.email, u.password, u.photo, u.position, u.active, u.username, u.phone, u.id]);
    if (results.affectedRows === 0) {
        throw new error_1.BadRequest('No user found by provided ID', 404);
    }
    return u;
});
const _delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [results] = yield db_1.db.promise().query('DELETE FROM users WHERE id=?', [id]);
    if (results.affectedRows === 0) {
        throw new error_1.BadRequest('No user found by provided ID', 404);
    }
    return `User with ID ${id} deleted`;
});
exports.default = { getAll, getOne, create, update, delete: _delete };
