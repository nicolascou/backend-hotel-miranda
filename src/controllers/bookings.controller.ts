import { Request, Response } from 'express';

export function getBookings(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function createBooking(_: Request, res: Response) {
  return res.sendStatus(201);
}

export function updateBooking(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function deleteBooking(_: Request, res: Response) {
  return res.sendStatus(200);
}