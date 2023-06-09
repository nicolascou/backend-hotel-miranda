import { IBooking, IContact, IRoom, IUser } from '../../models/types';
import { faker } from '@faker-js/faker';
import moment from 'moment';
import { Contact, Booking, Room, User } from './models';
import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(String(process.env.CLUSTER_URI));

async function generateRooms() {
  for (let i = 0; i < 15; i++) {
    const o: Omit<IRoom, '_id'> = {
      name: faker.person.firstName(),
      bed_type: ['Single Bed', 'Double Bed', 'Double Luxury'][Math.floor(Math.random() * 3)],
      photo: faker.image.avatar(),
      description: faker.string.sample(),
      amenities: ['Wifi', 'LED TV', 'AC'],
      rate: faker.number.float({ min: 200, max: 500, precision: 0.01 }),
      offer: faker.number.float({ min: 50, max: 200, precision: 0.01 }),
      available: true,
    };

    const newRoom = new Room(o);
    newRoom.save();
  }
}

async function generateBookings() {
  const rooms: IRoom[] = await Room.find({});
  const roomIds = rooms.map((room) => room._id);

  for (let i = 0; i < 15; i++) {
    const o: Omit<IBooking, '_id'> = {
      room_id: roomIds[Math.floor(Math.random() * roomIds.length)],
      guest: faker.person.fullName(),
      guest_id: '#' + Math.trunc(Math.random() * 100000000),
      photo: faker.image.avatar(),
      order_date: moment().format('YYYY-MM-DD'),
      check_in: moment(faker.date.soon()).format('YYYY-MM-DD'),
      check_out: moment(faker.date.future()).format('YYYY-MM-DD'),
      room_type: faker.lorem.word(),
      special_request: faker.lorem.sentence(),
    };

    const newBooking = new Booking(o);
    newBooking.save();
  }
}

async function generateContacts() {
  for (let i = 0; i < 15; i++) {
    const o: Omit<IContact, '_id'> = {
      date: moment().format('YYYY-MM-DD'),
      name: faker.string.uuid(),
      email: faker.internet.email(),
      phone: Math.trunc(Math.random() * 1000000000).toString(),
      subject: faker.lorem.sentence(),
      comment: faker.lorem.sentences(),
      archived: false,
    };

    const newContact = new Contact(o);
    newContact.save();
  }
}

async function generateUsers() {
  for (let i = 0; i < 15; i++) {
    const o: Omit<IUser, '_id'> = {
      full_name: faker.person.fullName(),
      description: faker.lorem.sentences(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      photo: faker.internet.avatar(),
      position: faker.lorem.word(),
      active: true,
      username: faker.internet.userName(),
      phone: Math.trunc(Math.random() * 1000000000).toString(),
      start_date: moment().format('YYYY-MM-DD'),
    };

    const newUser = new User(o);
    newUser.save();
  }
}

console.log('Generating data...');
generateRooms().then(() => {
  console.log('Rooms generated');
  generateBookings().then(() => console.log('Bookings generated'));
});
generateContacts().then(() => console.log('Contacts generated'));
generateUsers().then(() => console.log('Users generated'));
