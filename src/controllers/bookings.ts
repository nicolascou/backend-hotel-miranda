import { Request, Response } from 'express';

export function getBookings(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function getBookingById(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function createBooking(_: Request, res: Response) {
  return res.sendStatus(201);
}

export function updateBookingById(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function deleteBookingById(_: Request, res: Response) {
  return res.sendStatus(200);
}