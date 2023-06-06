import { IBooking, INewBooking } from '../models/types';
import { BadRequest } from '../models/error';
import moment from 'moment';
import { Booking } from './db/models';

const getAll = async () => {
  const bookings: IBooking[] = await Booking.find();
  return bookings;
};

const getOne = async (id: number) => {
  const booking: IBooking | null = await Booking.findOne({ id });
  if (!booking) {
    throw new BadRequest('No booking found by provided ID', 404);
  }
  return booking;
}

const create = async (b: INewBooking) => {
  const date = moment().format('YYYY/MM/DD');
  const booking = new Booking({ date, ...b });
  return await booking.save();
}

const update = async (b: INewBooking, id: string) => {
  const booking = Booking.updateOne({ id }, {
    $set: {
      ...b
    }
  });
  if (!booking) {
    throw new BadRequest('No booking found by provided ID', 404);
  }
  return booking;
}

const _delete = async (id: number) => {
  const booking = Booking.deleteOne({ id });
  if (!booking) {
    throw new BadRequest('No booking found by provided ID', 404);
  }
  return `Booking with id ${id} deleted`;
}

export default { getAll, getOne, create, update, delete: _delete }