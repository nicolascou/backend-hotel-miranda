import { Request, Response } from 'express';
import bookings from '../repositories/bookings';
import { IBooking, INewBooking } from '../models/types';

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
    return res.status(200).send(bookings.create(req.body));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const updateBooking = (req: Request<{ id: string }, IBooking, INewBooking>, res: Response) => {
  try {
    return res.send(bookings.update({ id: Number(req.params.id), ...req.body }));
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