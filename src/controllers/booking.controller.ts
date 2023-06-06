import { Request, Response } from 'express';
import bookings from '../repositories/bookings';
import { IBooking, INewBooking } from '../models/types';
import { bookingJoiSchema } from '../validators/schemas';
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
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequest('Invalid ID Format', 400);
    }
    return res.send(await bookings.getOne(req.params.id));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const createBooking = async (req: Request<{}, IBooking, INewBooking>, res: Response) => {
  try {
    const { error } = bookingJoiSchema.validate(req.body);
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
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequest('Invalid ID Format', 400);
    }
    const { error } = bookingJoiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`, 400);
    }
    return res.send(await bookings.update(req.body, req.params.id));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const deleteBooking = async (req: Request<{ id: string }, string>, res: Response) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequest('Invalid ID Format', 400);
    }
    return res.send(await bookings.delete(req.params.id));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

export { getBookings, getBookingById, createBooking, updateBooking, deleteBooking }