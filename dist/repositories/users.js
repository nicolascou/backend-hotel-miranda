"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../models/error");
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
const users = JSON.parse(fs_1.default.readFileSync(__dirname + '/databases/users.json').toString());
function saveJson() {
    const jsonData = JSON.stringify(users, null, 2);
    fs_1.default.writeFileSync(__dirname + '/databases/users.json', jsonData);
}
const getAll = () => users;
const getOne = (id) => {
    const user = users.find(user => user.id === id);
    if (!user) {
        throw new error_1.BadRequest('No user found by provided ID', 404);
    }
    return user;
};
const create = (newUserInfo) => {
    const newUser = Object.assign(Object.assign({ id: users[users.length - 1].id + 1 }, newUserInfo), { start_date: (0, moment_1.default)().format('YYYY-MM-DD') });
    users.push(newUser);
    saveJson();
    return newUser;
};
const update = (updatedUser) => {
    for (let [idx, user] of users.entries()) {
        if (user.id === updatedUser.id) {
            users[idx] = Object.assign(Object.assign({}, updatedUser), { start_date: user.start_date });
            saveJson();
            return users[idx];
        }
    }
    throw new error_1.BadRequest('No user found by provided ID', 404);
};
const _delete = (id) => {
    for (const [idx, user] of users.entries()) {
        if (user.id === id) {
            users.splice(idx, 1);
            saveJson();
            return 'User Deleted';
        }
    }
    throw new error_1.BadRequest('No user found by provided ID', 404);
};
exports.default = { getAll, getOne, create, update, delete: _delete };
