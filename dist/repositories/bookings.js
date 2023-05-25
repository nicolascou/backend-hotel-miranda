"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../models/error");
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
const bookings = JSON.parse(fs_1.default.readFileSync(__dirname + '/databases/users.json').toString());
function saveJson() {
    const jsonData = JSON.stringify(bookings, null, 2);
    fs_1.default.unlinkSync(__dirname + '/databases/bookings.json');
    fs_1.default.writeFileSync(__dirname + '/databases/bookings.json', jsonData);
}
const getAll = () => bookings;
const getOne = (id) => {
    const booking = bookings.find(booking => booking.id === id);
    if (!booking) {
        throw new error_1.BadRequest('No booking found by provided ID', 404);
    }
    return booking;
};
const create = (newBookingInfo) => {
    const newBooking = Object.assign(Object.assign({ id: bookings[bookings.length - 1].id + 1 }, newBookingInfo), { order_date: (0, moment_1.default)().format('YYYY-MM-DD'), guest_id: '1' });
    bookings.push(newBooking);
    saveJson();
    return newBooking;
};
const update = (updatedBooking) => {
    for (let [idx, booking] of bookings.entries()) {
        if (booking.id === updatedBooking.id) {
            bookings[idx] = Object.assign(Object.assign({}, updatedBooking), { order_date: booking.order_date, guest_id: '1' });
            saveJson();
            return bookings[idx];
        }
    }
    throw new error_1.BadRequest('No booking found by provided ID', 404);
};
const _delete = (id) => {
    for (const [idx, booking] of bookings.entries()) {
        if (booking.id === id) {
            bookings.splice(idx, 1);
            saveJson();
            return 'Booking Deleted';
        }
    }
    throw new error_1.BadRequest('No booking found by provided ID', 404);
};
exports.default = { getAll, getOne, create, update, delete: _delete };
