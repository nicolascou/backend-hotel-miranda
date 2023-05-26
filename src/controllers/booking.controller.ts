import { Request, Response } from 'express';
import bookings from '../repositories/bookings';
import { IBooking, INewBooking } from '../models/types';
import toNewBooking from '../utils/toNewBookings';

const getBookings = (_: Request, res: Response) => {
  try {
    return res.send(bookings.getAll());
  } catch (err: any) {
    return res.sendStatus(500);
  }
}

const getBookingById = (req: Request<{ id: string }, IBooking>, res: Response) => {
  try {
    return res.send(bookings.getOne(Number(req.params.id)));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const createBooking = (req: Request<{}, IBooking, INewBooking>, res: Response) => {
  try {
    const newBooking = toNewBooking(req.body);
    return res.status(201).send(bookings.create(newBooking));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const updateBooking = (req: Request<{ id: string }, IBooking, INewBooking>, res: Response) => {
  try {
    const validateBooking = toNewBooking(req.body);
    return res.send(bookings.update({ id: Number(req.params.id), ...validateBooking }));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const deleteBooking = (req: Request<{ id: string }, string>, res: Response) => {
  try {
    return res.send(bookings.delete(Number(req.params.id)));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

export { getBookings, getBookingById, createBooking, updateBooking, deleteBooking }