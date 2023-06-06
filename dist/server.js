"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const BookingRoutes_1 = __importDefault(require("./routes/BookingRoutes"));
const RoomRoutes_1 = __importDefault(require("./routes/RoomRoutes"));
const ContactRoutes_1 = __importDefault(require("./routes/ContactRoutes"));
const login_controller_1 = __importDefault(require("./controllers/login.controller"));
const passport_1 = __importDefault(require("passport"));
require("./services/auth");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/login', login_controller_1.default);
app.use('/users', passport_1.default.authenticate('jwt', { session: false }), UserRoutes_1.default);
app.use('/bookings', passport_1.default.authenticate('jwt', { session: false }), BookingRoutes_1.default);
app.use('/rooms', passport_1.default.authenticate('jwt', { session: false }), RoomRoutes_1.default);
app.use('/contact', passport_1.default.authenticate('jwt', { session: false }), ContactRoutes_1.default);
if (process.env.NODE_ENV !== 'test') {
    app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`));
}
const connextionString = 'mongodb://localhost:27017/miranda';
mongoose_1.default.connect(connextionString)
    .then(() => console.log('Connected to Database'))
    .catch((err) => console.error(err));
exports.default = app;
