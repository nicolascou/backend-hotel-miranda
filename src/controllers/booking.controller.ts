import { Request, Response } from 'express';
import bookings from '../repositories/bookings';
import { IBooking, INewBooking } from '../models/types';

const getBookings = async (_: Request, res: Response) => {
  try {
    return res.send(await bookings.getAll());
  } catch (err: any) {
    return res.sendStatus(500);
  }
}

const getBookingById = async (req: Request<{ id: string }, IBooking>, res: Response) => {
  try {
    return res.send(await bookings.getOne(Number(req.params.id)));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const createBooking = async (req: Request<{}, IBooking, INewBooking>, res: Response) => {
  try {
    // const newBooking = toNewBooking(req.body);
    return res.status(201).send(await bookings.create(req.body));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const updateBooking = async (req: Request<{ id: string }, IBooking, INewBooking>, res: Response) => {
  try {
    // const validateBooking = toNewBooking(req.body);
    return res.send(await bookings.update({ id: Number(req.params.id), ...req.body }));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const deleteBooking = async (req: Request<{ id: string }, string>, res: Response) => {
  try {
    return res.send(await bookings.delete(Number(req.params.id)));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

export { getBookings, getBookingById, createBooking, updateBooking, deleteBooking }