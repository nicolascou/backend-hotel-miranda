"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.contactSchema = exports.bookingSchema = exports.roomSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.roomSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    bed_type: joi_1.default.string().valid('Single Bed', 'Double Bed', 'Double Luxury').required(),
    photo: joi_1.default.string().uri(),
    description: joi_1.default.string(),
    amenities: joi_1.default.array().items(joi_1.default.string().valid('Wifi', 'LED TV', 'AC')),
    rate: joi_1.default.number(),
    offer: joi_1.default.number(),
    available: joi_1.default.boolean()
});
exports.bookingSchema = joi_1.default.object({
    room_id: joi_1.default.number().required(),
    guest: joi_1.default.string().required(),
    photo: joi_1.default.string().uri(),
    check_in: joi_1.default.string(),
    check_out: joi_1.default.string(),
    room_type: joi_1.default.string(),
    special_request: joi_1.default.string()
});
exports.contactSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().length(9),
    subject: joi_1.default.string().required(),
    comment: joi_1.default.string(),
    archived: joi_1.default.boolean()
});
exports.userSchema = joi_1.default.object({
    full_name: joi_1.default.string().required(),
    username: joi_1.default.string(),
    photo: joi_1.default.string().uri(),
    phone: joi_1.default.string().length(9),
    position: joi_1.default.string(),
    description: joi_1.default.string(),
    email: joi_1.default.string().email(),
    active: joi_1.default.boolean(),
    password: joi_1.default.string()
});
