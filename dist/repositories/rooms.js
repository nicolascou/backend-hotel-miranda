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
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../models/error");
const models_1 = require("./db/models");
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const rooms = yield models_1.Room.find();
    return rooms;
});
const getOne = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield models_1.Room.findOne({ _id });
    if (!room) {
        throw new error_1.BadRequest('No room found by provided ID', 404);
    }
    return room;
});
const create = (r) => __awaiter(void 0, void 0, void 0, function* () {
    const room = new models_1.Room(r);
    return yield room.save();
});
const update = (r, _id) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield models_1.Room.findOneAndUpdate({ _id }, {
        $set: Object.assign({}, r)
    }, { new: true });
    if (!room) {
        throw new error_1.BadRequest('No room found by provided ID', 404);
    }
    return room;
});
const _delete = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const room = yield models_1.Room.findOneAndDelete({ _id });
    if (!room) {
        throw new error_1.BadRequest('No room found by provided ID', 404);
    }
    return `Room with id ${_id} deleted`;
});
exports.default = { getAll, getOne, create, update, delete: _delete };
