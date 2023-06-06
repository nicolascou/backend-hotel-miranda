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
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../models/error");
const db_1 = require("./db");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const [results] = yield db_1.db.promise().query('SELECT * FROM rooms');
    return results;
});
const getOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [results] = yield db_1.db.promise().query('SELECT * FROM rooms WHERE id=?', [id]);
    if (!results[0]) {
        throw new error_1.BadRequest('No room found by provided ID', 404);
    }
    return results[0];
});
const create = (r) => __awaiter(void 0, void 0, void 0, function* () {
    const [results] = yield db_1.db.promise().query(`INSERT INTO rooms (\`name\`, \`bed_type\`, \`photo\`, \`description\`, \`amenities\`, \`rate\`, \`offer\`, \`available\`)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [r.name, r.bed_type, r.photo, r.description, JSON.stringify(r.amenities), r.rate, r.offer, r.available]);
    return {
        id: results.insertId,
        r
    };
});
const update = (r) => __awaiter(void 0, void 0, void 0, function* () {
    const [results] = yield db_1.db.promise().query('UPDATE rooms SET name=?, bed_type=?, photo=?, description=?, amenities=?, rate=?, offer=?, available=? WHERE id=?', [r.name, r.bed_type, r.photo, r.description, JSON.stringify(r.amenities), r.rate, r.offer, r.available, r.id]);
    if (results.affectedRows === 0) {
        throw new error_1.BadRequest('No room found by provided ID', 404);
    }
    return r;
});
const _delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield db_1.db.promise().query('DELETE FROM rooms WHERE id=?', [id]);
    if (results[0].affectedRows === 0) {
        throw new error_1.BadRequest('No room found by provided ID', 404);
    }
    return `Room with id ${id} deleted`;
});
exports.default = { getAll, getOne, create, update, delete: _delete };
