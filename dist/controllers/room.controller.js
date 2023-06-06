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
exports.deleteRoom = exports.updateRoom = exports.createRoom = exports.getRoomById = exports.getRooms = void 0;
const rooms_1 = __importDefault(require("../repositories/rooms"));
const schemas_1 = require("../validators/schemas");
const error_1 = require("../models/error");
const getRooms = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.send(yield rooms_1.default.getAll());
    }
    catch (err) {
        return res.sendStatus(500);
    }
});
exports.getRooms = getRooms;
const getRoomById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        return res.send(yield rooms_1.default.getOne(Number(req.params.id)));
    }
    catch (err) {
        return res.status((_a = err.status) !== null && _a !== void 0 ? _a : 500).send(err.message);
    }
});
exports.getRoomById = getRoomById;
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { error } = schemas_1.roomSchema.validate(req.body);
        if (error) {
            throw new error_1.BadRequest(`Validation error: ${error.details[0].message}`, 400);
        }
        return res.status(201).send(yield rooms_1.default.create(req.body));
    }
    catch (err) {
        return res.status((_b = err.status) !== null && _b !== void 0 ? _b : 500).send(err.message);
    }
});
exports.createRoom = createRoom;
const updateRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { error } = schemas_1.roomSchema.validate(req.body);
        if (error) {
            throw new error_1.BadRequest(`Validation error: ${error.details[0].message}`, 400);
        }
        return res.send(yield rooms_1.default.update(Object.assign({ id: Number(req.params.id) }, req.body)));
    }
    catch (err) {
        return res.status((_c = err.status) !== null && _c !== void 0 ? _c : 500).send(err.message);
    }
});
exports.updateRoom = updateRoom;
const deleteRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        return res.send(yield rooms_1.default.delete(Number(req.params.id)));
    }
    catch (err) {
        return res.status((_d = err.status) !== null && _d !== void 0 ? _d : 500).send(err.message);
    }
});
exports.deleteRoom = deleteRoom;
