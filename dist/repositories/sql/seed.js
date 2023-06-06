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
const db_1 = require("../db");
const faker_1 = require("@faker-js/faker");
const moment_1 = __importDefault(require("moment"));
function generateRooms() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 15; i++) {
            const o = {
                name: faker_1.faker.person.firstName(),
                bed_type: ['Single Bed', 'Double Bed', 'Double Luxury'][Math.floor(Math.random() * 3)],
                photo: faker_1.faker.image.avatar(),
                description: faker_1.faker.lorem.sentences({ min: 2, max: 5 }),
                amenities: ['Wifi', 'LED TV', 'AC'],
                rate: faker_1.faker.number.float({ min: 200, max: 500, precision: 0.01 }),
                offer: faker_1.faker.number.float({ min: 50, max: 200, precision: 0.01 }),
                available: true
            };
            yield db_1.db.promise().query(`INSERT INTO \`rooms\` (name, bed_type, photo, description, amenities, rate, offer, available) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [o.name, o.bed_type, o.photo, o.description, JSON.stringify(o.amenities), o.rate, o.offer, o.available]);
        }
    });
}
function generateBookings() {
    return __awaiter(this, void 0, void 0, function* () {
        const [results] = yield db_1.db.promise().query('SELECT id FROM rooms');
        const roomIds = results.map((elt) => elt.id);
        for (let i = 0; i < 15; i++) {
            const o = {
                room_id: roomIds[Math.floor(Math.random() * roomIds.length)],
                guest: faker_1.faker.person.fullName(),
                guest_id: '#' + Math.trunc(Math.random() * 100000000),
                photo: faker_1.faker.image.avatar(),
                order_date: (0, moment_1.default)().format('YYYY-MM-DD'),
                check_in: (0, moment_1.default)(faker_1.faker.date.soon()).format('YYYY-MM-DD'),
                check_out: (0, moment_1.default)(faker_1.faker.date.future()).format('YYYY-MM-DD'),
                room_type: faker_1.faker.lorem.word(),
                special_request: faker_1.faker.lorem.sentence()
            };
            yield db_1.db.promise().query('INSERT INTO \`bookings\` (room_id, guest, guest_id, photo, order_date, check_in, check_out, room_type, special_request) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [o.room_id, o.guest, o.guest_id, o.photo, o.order_date, o.check_in, o.check_out, o.room_type, o.special_request]);
        }
    });
}
function generateContacts() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 15; i++) {
            const o = {
                date: (0, moment_1.default)().format('YYYY-MM-DD'),
                name: faker_1.faker.person.fullName(),
                email: faker_1.faker.internet.email(),
                phone: Math.trunc(Math.random() * 1000000000).toString(),
                subject: faker_1.faker.lorem.sentence(),
                comment: faker_1.faker.lorem.sentences({ min: 1, max: 3 }),
                archived: false
            };
            yield db_1.db.promise().query('INSERT INTO \`contact\` (date, name, email, phone, subject, comment, archived) VALUES (?, ?, ?, ?, ?, ?, ?)', [o.date, o.name, o.email, o.phone, o.subject, o.comment, o.archived]);
        }
    });
}
function generateUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < 15; i++) {
            const o = {
                full_name: faker_1.faker.person.fullName(),
                description: faker_1.faker.lorem.sentences({ min: 1, max: 3 }),
                email: faker_1.faker.internet.email(),
                password: faker_1.faker.internet.password(),
                photo: faker_1.faker.internet.avatar(),
                position: faker_1.faker.lorem.word(),
                active: true,
                username: faker_1.faker.internet.userName(),
                phone: Math.trunc(Math.random() * 1000000000).toString(),
                start_date: (0, moment_1.default)().format('YYYY-MM-DD'),
            };
            yield db_1.db.promise().query('INSERT INTO \`users\` (full_name, description, email, password, photo, position, active, username, phone, start_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [o.full_name, o.description, o.email, o.password, o.photo, o.position, o.active, o.username, o.phone, o.start_date]);
        }
    });
}
console.log('Generating data...');
generateRooms().then(() => {
    console.log('Rooms generated');
    generateBookings().then(() => console.log('Bookings generated'));
});
generateContacts().then(() => console.log('Contacts generated'));
generateUsers().then(() => console.log('Users generated'));
