"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../models/error");
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
const contacts = JSON.parse(fs_1.default.readFileSync(__dirname + '/databases/contact.json').toString());
function saveJson() {
    const jsonData = JSON.stringify(contacts, null, 2);
    fs_1.default.writeFileSync(__dirname + '/databases/contact.json', jsonData);
}
const getAll = () => contacts;
const getOne = (id) => {
    const contact = contacts.find(contact => contact.id === id);
    if (!contact) {
        throw new error_1.BadRequest('No user found by provided ID', 404);
    }
    return contact;
};
const create = (newContactInfo) => {
    const newContact = Object.assign(Object.assign({ id: contacts[contacts.length - 1].id + 1 }, newContactInfo), { date: (0, moment_1.default)().format('YYYY-MM-DD') });
    contacts.push(newContact);
    saveJson();
    return newContact;
};
const update = (updatedContact) => {
    for (let [idx, contact] of contacts.entries()) {
        if (contact.id === updatedContact.id) {
            contacts[idx] = Object.assign(Object.assign({}, updatedContact), { date: contact.date });
            saveJson();
            return contacts[idx];
        }
    }
    throw new error_1.BadRequest('No user found by provided ID', 404);
};
const _delete = (id) => {
    for (const [idx, contact] of contacts.entries()) {
        if (contact.id === id) {
            contacts.splice(idx, 1);
            saveJson();
            return 'Contact Deleted';
        }
    }
    throw new error_1.BadRequest('No contact found by provided ID', 404);
};
exports.default = { getAll, getOne, create, update, delete: _delete };
