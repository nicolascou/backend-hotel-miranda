import { Router } from "express";
import * as bookings from '../services/BookingServices';

const BookingRouter = Router();

BookingRouter.get('/', (_, res) => {
  return res.send(bookings.getAll());
})

BookingRouter.get('/:id', (req, res) => {
  return res.send(bookings.getOne(Number(req.params.id)));
})

export default BookingRouter;