"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
require("dotenv/config");
exports.db = mysql2_1.default.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    database: 'miranda',
    password: process.env.DB_PASSWORD
});
