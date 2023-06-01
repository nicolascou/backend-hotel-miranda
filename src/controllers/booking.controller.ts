import { Request, Response } from 'express';
import bookings from '../repositories/bookings';
import { IBooking, INewBooking } from '../models/types';
import { bookingSchema } from '../validators/schemas';
import { BadRequest } from '../models/error';

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
    const { error } = bookingSchema.validate(req.body);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`, 400);
    }
    return res.status(201).send(await bookings.create(req.body));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const updateBooking = async (req: Request<{ id: string }, IBooking, INewBooking>, res: Response) => {
  try {
    const { error } = bookingSchema.validate(req.body);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`, 400);
    }
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