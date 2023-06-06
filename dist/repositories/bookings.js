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
const models_1 = require("./db/models");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const bookings = yield models_1.Booking.find({});
    return bookings;
});
const getOne = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield models_1.Booking.findOne({ _id });
    if (!booking) {
        throw new error_1.BadRequest('No booking found by provided ID', 404);
    }
    return booking;
});
const create = (b) => __awaiter(void 0, void 0, void 0, function* () {
    const order_date = (0, moment_1.default)().format('YYYY/MM/DD');
    const booking = new models_1.Booking(Object.assign(Object.assign({ order_date }, b), { guest_id: '#' + Math.trunc(Math.random() * 100000000) }));
    return yield booking.save();
});
const update = (b, _id) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield models_1.Booking.findOneAndUpdate({ _id }, {
        $set: Object.assign({}, b)
    }, { new: true });
    if (!booking) {
        throw new error_1.BadRequest('No booking found by provided ID', 404);
    }
    return booking;
});
const _delete = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield models_1.Booking.findOneAndDelete({ _id });
    if (!booking) {
        throw new error_1.BadRequest('No booking found by provided ID', 404);
    }
    return `Booking with id ${_id} deleted`;
});
exports.default = { getAll, getOne, create, update, delete: _delete };
