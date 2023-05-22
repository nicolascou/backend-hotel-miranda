import express from 'express';
import cors from 'cors';

import { getRooms, getRoomById, createRoom, updateRoomById, deleteRoomById } from './controllers/rooms';
import { getBookings, getBookingById, createBooking, updateBookingById, deleteBookingById } from './controllers/bookings';
import { getUsers, getUserById, createUser, updateUserById, deleteUserById } from './controllers/users';
import { getContacts, getContactById, createContact, updateContactById, deleteContactById } from './controllers/contact';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  return res.send('Hola');
})

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

app.get('/users', getUsers);
app.get('/users/:id', getUserById);
app.post('/users', createUser);
app.put('/users/:id', updateUserById);
app.delete('/users/:id', deleteUserById);

app.get('/contact', getContacts);
app.get('/contact/:id', getContactById);
app.post('/contact', createContact);
app.put('/contact/:id', updateContactById);
app.delete('/contact/:id', deleteContactById);

const port = 3000;
app.listen(port, () => console.log(`Running on port ${port}`));

export default app;