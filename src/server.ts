import express from 'express';
import cors from 'cors';

import { getRooms, getRoomById, createRoom, updateRoomById, deleteRoomById } from './controllers/rooms';
import { getBookings, getBookingById, createBooking, updateBookingById, deleteBookingById } from './controllers/bookings';
import { getContacts, getContactById, createContact, updateContactById, deleteContactById } from './controllers/contact';
import UserRouter from './routes/UserRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use('/users', UserRouter);

app.get('/rooms', getRooms);
app.get('/rooms/:id', getRoomById);
app.post('/rooms', createRoom);
app.put('/rooms/:id', updateRoomById);
app.delete('/rooms/:id', deleteRoomById);

app.get('/bookings', getBookings);
app.get('/bookings/:id', getBookingById);
app.post('/bookings', createBooking);
app.put('/bookings/:id', updateBookingById);
app.delete('/bookings/:id', deleteBookingById);

app.get('/contact', getContacts);
app.get('/contact/:id', getContactById);
app.post('/contact', createContact);
app.put('/contact/:id', updateContactById);
app.delete('/contact/:id', deleteContactById);

export const server = app.listen(PORT, () => console.log(`Running on port ${PORT}`));
export default app;