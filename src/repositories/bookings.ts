import { IBooking, INewBooking } from '../models/types';
import { BadRequest } from '../models/error';
import moment from 'moment';
import { Booking } from './db/models';

const getAll = async () => {
  const bookings: IBooking[] = await Booking.find({});
  return bookings;
};

const getOne = async (_id: string) => {
  const booking: IBooking | null = await Booking.findOne({ _id });
  if (!booking) {
    throw new BadRequest('No booking found by provided ID', 404);
  }
  return booking;
};

const create = async (b: INewBooking) => {
  const order_date = moment().format('YYYY/MM/DD');
  const booking = new Booking({ order_date, ...b, guest_id: '#' + Math.trunc(Math.random() * 100000000) });
  return await booking.save();
};

const update = async (b: INewBooking, _id: string) => {
  const booking = await Booking.findOneAndUpdate(
    { _id },
    {
      $set: {
        ...b,
      },
    },
    { new: true }
  );
  if (!booking) {
    throw new BadRequest('No booking found by provided ID', 404);
  }
  return booking;
};

const _delete = async (_id: string) => {
  const booking = await Booking.findOneAndDelete({ _id });
  if (!booking) {
    throw new BadRequest('No booking found by provided ID', 404);
  }
  return `Booking with id ${_id} deleted`;
};

export default { getAll, getOne, create, update, delete: _delete };
