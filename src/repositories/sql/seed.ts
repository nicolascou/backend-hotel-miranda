// import { IBooking, IContact, IRoom, IUser } from '../../models/types';
// import { db } from '../db';
// import { faker } from '@faker-js/faker';

// function generateRooms() {
//   for (let i = 0; i < 15; i++) {
//     const o: Omit<IRoom, 'id'> = {
//       name: faker.string.uuid(),
//       // bed_type: Double Bed,
//       photo: faker.image.avatar(),
//       description: faker.string.sample(),
//       // amenities: faker.,
//       rate: faker.number.float(),
//       // offer: faker.,
//       available: true
//     }
    
//     db.query(
//       `INSERT INTO \`rooms\` (name, bed_type, photo, description, amenities, rate, available) 
//       VALUES (${o.name}, ${o.bed_type}, ${o.photo}, ${o.amenities}, ${o.rate}, ${o.rate})`,
//       function(err, results) {
//         console.log(results);
//         console.error(err);
//       }
//     );
//   }
// }

// function generateBookings() {
//   for (let i = 0; i < 15; i++) {
//     const o: Omit<IBooking, 'id'> = {
//       // room_id: faker.,
//       // guest: faker.,
//       // guest_id: faker.,
//       photo: faker.image.avatar(),
//       // order_date: faker.,
//       // check_in: faker.,
//       // check_out: faker.,
//       // room_type: faker.,
//       // special_request: faker.,
//     }
    
//     db.query(
//       `INSERT INTO \`rooms\` (room_id, guest, guest_id, photo, order_date, check_in, check_out, room_type, special_request) 
//       VALUES (${o.room_id}, ${o.guest}, ${o.guest_id}, ${o.photo}, ${o.order_date}, ${o.check_in}, ${o.check_out}, ${o.room_type}, ${o.special_request})`,
//       function(err, results) {
//         console.log(results);
//         console.error(err);
//       }
//     );
//   }
// }

// function generateContacts() {
//   for (let i = 0; i < 15; i++) {
//     const o: Omit<IContact, 'id'> = {
//       // date: faker.,
//       name: faker.string.uuid(),
//       // email: faker.,
//       // phone: faker.,
//       // subject: faker.,
//       // comment: faker.,
//       archived: true
//     }
    
//     db.query(
//       `INSERT INTO \`rooms\` (date, name, email, phone, subject, comment, archived) 
//       VALUES (${o.date}, ${o.name}, ${o.email}, ${o.phone}, ${o.subject}, ${o.comment}, ${o.archived})`,
//       function(err, results) {
//         console.log(results);
//         console.error(err);
//       }
//     );
//   }
// }

// function generateUsers() {
//   for (let i = 0; i < 15; i++) {
//     const o: Omit<IUser, 'id'> = {
//       // full_name: faker.,
//       // description: faker.,
//       // email: faker.,
//       // password: faker.,
//       // photo: faker.,
//       // position: faker.,
//       // state: faker.,
//       // username: faker.,
//       // phone: faker.,
//       // start_date: faker.,
//     }
    
//     db.query(
//       `INSERT INTO \`rooms\` (full_name, description, email, password, photo, position, state, username, phone, start_date) 
//       VALUES (${o.full_name}, ${o.description}, ${o.email}, ${o.password}, ${o.photo}, ${o.position}, ${o.state}, ${o.username}. ${o.phone}, ${o.start_date})`,
//       function(err, results) {
//         console.log(results);
//         console.error(err);
//       }
//     );
//   }
// }

// export { generateBookings, generateRooms, generateContacts, generateUsers }