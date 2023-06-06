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
    const [results] = yield db_1.db.promise().query('SELECT * FROM bookings');
    return results;
});
const getOne = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [results] = yield db_1.db.promise().query('SELECT * FROM bookings WHERE id=?', [id]);
    if (!results[0]) {
        throw new error_1.BadRequest('No booking found by provided ID', 404);
    }
    return results[0];
});
const create = (b) => __awaiter(void 0, void 0, void 0, function* () {
    const [results] = yield db_1.db.promise().query(`INSERT INTO bookings (\`room_id\`, \`guest\`, \`guest_id\`, \`photo\`, \`order_date\`, \`check_in\`, \`check_out\`, \`room_type\`, \`special_request\`)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [b.room_id, b.guest, '#' + Math.trunc(Math.random() * 100000000), b.photo, (0, moment_1.default)().format('YYYY/MM/DD'), b.check_in, b.check_out, b.room_type, b.special_request]);
    return Object.assign({ id: results.insertId }, b);
});
const update = (b) => __awaiter(void 0, void 0, void 0, function* () {
    const [results] = yield db_1.db.promise().query('UPDATE bookings SET room_id=?, guest=?, photo=?, check_in=?, check_out=?, room_type=?, special_request=? WHERE id=?', [b.room_id, b.guest, b.photo, b.check_in, b.check_out, b.room_type, b.special_request, b.id]);
    if (results.affectedRows === 0) {
        throw new error_1.BadRequest('No booking found by provided ID', 404);
    }
    return b;
});
const _delete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const results = yield db_1.db.promise().query('DELETE FROM bookings WHERE id=?', [id]);
    if (results[0].affectedRows === 0) {
        throw new error_1.BadRequest('No booking found by provided ID', 404);
    }
    return `Booking with id ${id} deleted`;
});
exports.default = { getAll, getOne, create, update, delete: _delete };
