"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBookingById = exports.getBookings = void 0;
const bookings_1 = __importDefault(require("../repositories/bookings"));
const getBookings = (_, res) => {
    try {
        return res.send(bookings_1.default.getAll());
    }
    catch (err) {
        return res.sendStatus(500);
    }
};
exports.getBookings = getBookings;
const getBookingById = (req, res) => {
    var _a;
    try {
        return res.send(bookings_1.default.getOne(Number(req.params.id)));
    }
    catch (err) {
        return res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).send(err.message);
    }
};
exports.getBookingById = getBookingById;
const createBooking = (req, res) => {
    var _a;
    try {
        return res.status(200).send(bookings_1.default.create(req.body));
    }
    catch (err) {
        return res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).send(err.message);
    }
};
exports.createBooking = createBooking;
const updateBooking = (req, res) => {
    var _a;
    try {
        return res.send(bookings_1.default.update(Object.assign({ id: Number(req.params.id) }, req.body)));
    }
    catch (err) {
        return res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).send(err.message);
    }
};
exports.updateBooking = updateBooking;
const deleteBooking = (req, res) => {
    var _a;
    try {
        return res.send(bookings_1.default.delete(Number(req.params.id)));
    }
    catch (err) {
        return res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).send(err.message);
    }
};
exports.deleteBooking = deleteBooking;
