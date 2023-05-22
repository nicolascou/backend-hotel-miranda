"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoomById = exports.updateRoomById = exports.createRoom = exports.getRoomById = exports.getRooms = void 0;
function getRooms(_, res) {
    return res.sendStatus(200);
}
exports.getRooms = getRooms;
function getRoomById(_, res) {
    return res.sendStatus(200);
}
exports.getRoomById = getRoomById;
function createRoom(_, res) {
    return res.sendStatus(201);
}
exports.createRoom = createRoom;
function updateRoomById(_, res) {
    return res.sendStatus(200);
}
exports.updateRoomById = updateRoomById;
function deleteRoomById(_, res) {
    return res.sendStatus(200);
}
exports.deleteRoomById = deleteRoomById;
