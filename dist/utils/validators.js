"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const error_1 = require("../models/error");
const stringValidation = (s) => {
    if (typeof s !== 'string' || s.length <= 1) {
        throw new error_1.BadRequest('Incorrect or missing Full Name', 400);
    }
    return s;
};
function validateUser(body) {
    const user = {
        full_name: stringValidation(body.full_name),
        description: stringValidation(body.description),
        email: stringValidation(body.email),
        password: stringValidation(body.password),
        photo: stringValidation(body.photo),
        position: stringValidation(body.photo),
        state: stringValidation(body.state),
        username: stringValidation(body.username),
        phone: stringValidation(body.phone)
    };
}
exports.validateUser = validateUser;
