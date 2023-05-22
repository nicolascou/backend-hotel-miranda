"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserById = exports.updateUserById = exports.createUser = exports.getUserById = exports.getUsers = void 0;
function getUsers(_, res) {
    return res.sendStatus(200);
}
exports.getUsers = getUsers;
function getUserById(_, res) {
    return res.sendStatus(200);
}
exports.getUserById = getUserById;
function createUser(_, res) {
    return res.sendStatus(201);
}
exports.createUser = createUser;
function updateUserById(_, res) {
    return res.sendStatus(200);
}
exports.updateUserById = updateUserById;
function deleteUserById(_, res) {
    return res.sendStatus(200);
}
exports.deleteUserById = deleteUserById;
