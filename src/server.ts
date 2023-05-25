import express from 'express';
import cors from 'cors';

import UserRouter from './routes/UserRoutes';
import BookingRouter from './routes/BookingRoutes';
import RoomRouter from './routes/RoomRoutes';
import ContactRouter from './routes/ContactRoutes';
import loginController from './controllers/login.controller';
import passport from 'passport';
import './services/auth';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.post('/login', loginController)
app.use('/users', passport.authenticate('jwt', { session: false }), UserRouter);
// app.use('/users', UserRouter);
app.use('/bookings', BookingRouter);
app.use('/rooms', RoomRouter);
app.use('/contact', ContactRouter);

export const server = app.listen(PORT, () => console.log(`Running on port ${PORT}`));
export default app;