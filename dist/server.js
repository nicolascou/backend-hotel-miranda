"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const BookingRoutes_1 = __importDefault(require("./routes/BookingRoutes"));
const RoomRoutes_1 = __importDefault(require("./routes/RoomRoutes"));
const ContactRoutes_1 = __importDefault(require("./routes/ContactRoutes"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// app.use('/login')
app.use('/users', UserRoutes_1.default);
app.use('/bookings', BookingRoutes_1.default);
app.use('/rooms', RoomRoutes_1.default);
app.use('/contact', ContactRoutes_1.default);
exports.server = app.listen(PORT, () => console.log(`Running on port ${PORT}`));
exports.default = app;
