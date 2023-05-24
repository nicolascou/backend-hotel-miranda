import express from 'express';
import cors from 'cors';

import UserRouter from './routes/UserRoutes';
import BookingRouter from './routes/BookingRoutes';
import RoomRouter from './routes/RoomRoutes';
import ContactRouter from './routes/ContactRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// app.use('/login')
app.use('/users', UserRouter);
app.use('/bookings', BookingRouter);
app.use('/rooms', RoomRouter);
app.use('/contact', ContactRouter);

export const server = app.listen(PORT, () => console.log(`Running on port ${PORT}`));
export default app;