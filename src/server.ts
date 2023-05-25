import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import UserRouter from './routes/UserRoutes';
import BookingRouter from './routes/BookingRoutes';
import RoomRouter from './routes/RoomRoutes';
import ContactRouter from './routes/ContactRoutes';
import loginRouter from './controllers/login.controller';

import passport from 'passport';
import './services/auth';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/login', loginRouter)
app.use('/users', passport.authenticate('jwt', { session: false }), UserRouter);
app.use('/bookings', passport.authenticate('jwt', { session: false }), BookingRouter);
app.use('/rooms', passport.authenticate('jwt', { session: false }), RoomRouter);
app.use('/contact', passport.authenticate('jwt', { session: false }), ContactRouter);

export const server = app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`));
export default app;