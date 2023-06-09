import { IBooking, INewBooking } from '../models/types';
import { BadRequest } from '../models/error';
import fs from 'fs';
import moment from 'moment';

const bookings: IBooking[] = JSON.parse(fs.readFileSync(__dirname + '/databases/bookings.json').toString());

function saveJson() {
  const jsonData = JSON.stringify(bookings, null, 2);
  fs.writeFileSync(__dirname + '/databases/bookings.json', jsonData);
}

const getAll = () => bookings;

const getOne = (id: number) => {
  const booking = bookings.find(booking => booking.id === id);
  if (!booking) {
    throw new BadRequest('No booking found by provided ID', 404);
  }
  return booking;
}

const create = (newBookingInfo: INewBooking) => {
  const newBooking: IBooking = {
    id: bookings[bookings.length-1].id + 1,
    ...newBookingInfo,
    order_date: moment().format('YYYY-MM-DD'),
    guest_id: '#' + Math.trunc(Math.random() * 100000000)
  }
  bookings.push(newBooking);
  saveJson();
  return newBooking;
}

const update = (updatedBooking: INewBooking & {id: number}) => {
  for (let [idx, booking] of bookings.entries()) {
    if (booking.id === updatedBooking.id) {
      bookings[idx] = {
        ...updatedBooking,
        order_date: booking.order_date,
        guest_id: booking.guest_id
      }
      saveJson();
      return bookings[idx];
    }
  }
  throw new BadRequest('No booking found by provided ID', 404);
}

const _delete = (id: number) => {
  for (const [idx, booking] of bookings.entries()) {
    if (booking.id === id) {
      bookings.splice(idx, 1);
       saveJson();
      return `Booking ${id} Deleted`;
    }
  }
  throw new BadRequest('No booking found by provided ID', 404);
}

export default { getAll, getOne, create, update, delete: _delete }