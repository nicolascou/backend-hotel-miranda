"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactById = exports.updateContactById = exports.createContact = exports.getContactById = exports.getContacts = void 0;
function getContacts(_, res) {
    return res.sendStatus(200);
}
exports.getContacts = getContacts;
function getContactById(_, res) {
    return res.sendStatus(200);
}
exports.getContactById = getContactById;
function createContact(_, res) {
    return res.sendStatus(201);
}
exports.createContact = createContact;
function updateContactById(_, res) {
    return res.sendStatus(200);
}
exports.updateContactById = updateContactById;
function deleteContactById(_, res) {
    return res.sendStatus(200);
}
exports.deleteContactById = deleteContactById;
