import { Booking, Contact, Room, User } from "./models";
import roomsJson from './data/rooms.json';

const createRooms = async () => await Room.insertMany(roomsJson);
createRooms();

// const createBookings = async () => await Booking.insertMany(bookingsJson);
// createBookings();

// const createContacts = async () => await Contact.insertMany(contactsJson);
// createContacts();

// const createUsers = async () => await User.insertMany(usersJson);
// createUsers();