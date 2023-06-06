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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const passport_jwt_2 = require("passport-jwt");
const bcrypt_1 = __importDefault(require("bcrypt"));
const models_1 = require("../repositories/db/models");
function validUser(name, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield models_1.User.find({});
        for (const user of users) {
            if (user.username === name && bcrypt_1.default.compareSync(password, user.password)) {
                return true;
            }
        }
        return false;
    });
}
passport_1.default.use('login', new passport_local_1.Strategy({
    usernameField: 'name',
    passwordField: 'password'
}, (name, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isUser = yield validUser(name, password);
        if (isUser) {
            return done(null, { name }, { message: 'Logged in Successfully' });
        }
        return done(null, false, { message: 'Invalid credentials' });
    }
    catch (error) {
        return done(error);
    }
})));
passport_1.default.use(new passport_jwt_1.Strategy({
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: passport_jwt_2.ExtractJwt.fromAuthHeaderAsBearerToken()
}, (token, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return done(null, token.user);
    }
    catch (error) {
        done(error);
    }
})));
