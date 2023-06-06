"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Contact = exports.Booking = exports.Room = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const roomSchema = new mongoose_1.default.Schema({
    name: String,
    bed_type: String,
    photo: String,
    description: String,
    amenities: JSON,
    rate: Number,
    offer: Number,
    available: Boolean
});
exports.Room = (0, mongoose_1.model)('Room', roomSchema);
const bookingSchema = new mongoose_1.default.Schema({
    room_id: String,
    guest: String,
    guest_id: String,
    photo: String,
    order_date: String,
    check_in: String,
    check_out: String,
    room_type: String,
    special_request: String
});
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
const contactSchema = new mongoose_1.default.Schema({
    date: String,
    name: String,
    email: String,
    phone: String,
    subject: String,
    comment: String,
    archived: Boolean
});
exports.Contact = (0, mongoose_1.model)('Contact', contactSchema);
const userSchema = new mongoose_1.default.Schema({
    full_name: String,
    username: String,
    photo: String,
    phone: String,
    position: String,
    description: String,
    email: String,
    start_date: String,
    active: Boolean,
    password: String,
});
exports.User = (0, mongoose_1.model)('User', userSchema);
