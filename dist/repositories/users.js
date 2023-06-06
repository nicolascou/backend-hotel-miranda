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
    const users = yield models_1.User.find();
    return users;
});
const getOne = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOne({ _id });
    if (!user) {
        throw new error_1.BadRequest('No user found by provided ID', 404);
    }
    return user;
});
const create = (u) => __awaiter(void 0, void 0, void 0, function* () {
    const start_date = (0, moment_1.default)().format('YYYY-MM-DD');
    const user = new models_1.User(Object.assign({ start_date }, u));
    return yield user.save();
});
const update = (u, _id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOneAndUpdate({ _id }, {
        $set: Object.assign({}, u)
    }, { new: true });
    if (!user) {
        throw new error_1.BadRequest('No user found by provided ID', 404);
    }
    return user;
});
const _delete = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.User.findOneAndDelete({ _id });
    if (!user) {
        throw new error_1.BadRequest('No user found by provided ID', 404);
    }
    return `User with id ${_id} deleted`;
});
exports.default = { getAll, getOne, create, update, delete: _delete };
