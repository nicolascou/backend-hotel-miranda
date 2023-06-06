import { IBooking, IContact, IRoom, IUser } from '../../models/types';
import { db } from '../db';
import { faker } from '@faker-js/faker';
import moment from 'moment';

async function generateRooms() {
  for (let i = 0; i < 15; i++) {
    const o: Omit<IRoom, 'id'> = {
      name: faker.person.firstName(),
      bed_type: ['Single Bed', 'Double Bed', 'Double Luxury'][Math.floor(Math.random() * 3)],
      photo: faker.image.avatar(),
      description: faker.lorem.sentences({ min: 2, max: 5 }),
      amenities: ['Wifi', 'LED TV', 'AC'],
      rate: faker.number.float({ min: 200, max: 500, precision: 0.01 }),
      offer: faker.number.float({ min: 50, max: 200, precision: 0.01 }),
      available: true
    }
    
    await db.promise().query(`INSERT INTO \`rooms\` (name, bed_type, photo, description, amenities, rate, offer, available) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [o.name, o.bed_type, o.photo, o.description, JSON.stringify(o.amenities), o.rate, o.offer, o.available]);
  }
}

async function generateBookings() {
  const [ results ] = await db.promise().query<any[]>('SELECT id FROM rooms');
  const roomIds = results.map((elt: { id: number }) => elt.id);
  
  for (let i = 0; i < 15; i++) {
    const o: Omit<IBooking, 'id'> = {
      room_id: roomIds[Math.floor(Math.random() * roomIds.length)],
      guest: faker.person.fullName(),
      guest_id: '#' + Math.trunc(Math.random() * 100000000),
      photo: faker.image.avatar(),
      order_date: moment().format('YYYY-MM-DD'),
      check_in: moment(faker.date.soon()).format('YYYY-MM-DD'),
      check_out: moment(faker.date.future()).format('YYYY-MM-DD'),
      room_type: faker.lorem.word(),
      special_request: faker.lorem.sentence()
    }
    
    await db.promise().query('INSERT INTO \`bookings\` (room_id, guest, guest_id, photo, order_date, check_in, check_out, room_type, special_request) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [o.room_id, o.guest, o.guest_id, o.photo, o.order_date, o.check_in, o.check_out, o.room_type, o.special_request]);
  }
}

async function generateContacts() {
  for (let i = 0; i < 15; i++) {
    const o: Omit<IContact, 'id'> = {
      date: moment().format('YYYY-MM-DD'),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      phone: Math.trunc(Math.random() * 1000000000).toString(),
      subject: faker.lorem.sentence(),
      comment: faker.lorem.sentences({ min: 1, max: 3 }),
      archived: false
    }
    
    await db.promise().query('INSERT INTO \`contact\` (date, name, email, phone, subject, comment, archived) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [o.date, o.name, o.email, o.phone, o.subject, o.comment, o.archived]);
  }
}

async function generateUsers() {
  for (let i = 0; i < 15; i++) {
    const o: Omit<IUser, 'id'> = {
      full_name: faker.person.fullName(),
      description: faker.lorem.sentences({ min: 1, max: 3 }),
      email: faker.internet.email(),
      password: faker.internet.password(),
      photo: faker.internet.avatar(),
      position: faker.lorem.word(),
      active: true,
      username: faker.internet.userName(),
      phone: Math.trunc(Math.random() * 1000000000).toString(),
      start_date: moment().format('YYYY-MM-DD'),
    }
    
    await db.promise().query('INSERT INTO \`users\` (full_name, description, email, password, photo, position, active, username, phone, start_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [o.full_name, o.description, o.email, o.password, o.photo, o.position, o.active, o.username, o.phone, o.start_date]);
  }
}

console.log('Generating data...')
generateRooms().then(() => {
  console.log('Rooms generated');
  generateBookings().then(() => console.log('Bookings generated'));
});
generateContacts().then(() => console.log('Contacts generated'));
generateUsers().then(() => console.log('Users generated'));