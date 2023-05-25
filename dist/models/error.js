"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
class BadRequest extends Error {
    constructor(message, status = 500) {
        super(message);
        this.message = message;
        this.status = status;
        this.name = 'Bad Request';
    }
}
exports.BadRequest = BadRequest;
