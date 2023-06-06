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
    const contacts = yield models_1.Contact.find();
    return contacts;
});
const getOne = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield models_1.Contact.findOne({ _id });
    if (!contact) {
        throw new error_1.BadRequest('No contact found by provided ID', 404);
    }
    return contact;
});
const create = (c) => __awaiter(void 0, void 0, void 0, function* () {
    const date = (0, moment_1.default)().format('YYYY/MM/DD');
    const contact = new models_1.Contact(Object.assign({ date }, c));
    return yield contact.save();
});
const update = (c, _id) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield models_1.Contact.findOneAndUpdate({ _id }, {
        $set: Object.assign({}, c)
    }, { new: true });
    if (!contact) {
        throw new error_1.BadRequest('No contact found by provided ID', 404);
    }
    return contact;
});
const _delete = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield models_1.Contact.findOneAndDelete({ _id });
    if (!contact) {
        throw new error_1.BadRequest('No contact found by provided ID', 404);
    }
    return `Contact with id ${_id} deleted`;
});
exports.default = { getAll, getOne, create, update, delete: _delete };
