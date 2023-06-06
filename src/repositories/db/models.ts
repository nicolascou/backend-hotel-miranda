import mongoose, { model } from "mongoose";

const roomSchema = new mongoose.Schema({
  name: String,
  bed_type: String,
  photo: String,
  description: String,
  amenities: JSON,
  rate: Number,
  offer: Number,
  available: Boolean
});

export const Room = model('Room', roomSchema);

const bookingSchema = new mongoose.Schema({
  room_id: String,
  guest: String,
  guest_id: String,
  photo: String,
  order_date: String,
  check_in: String,
  check_out: String,
  room_type: String,
  special_request: String
});

export const Booking = model('Booking', bookingSchema);

const contactSchema = new mongoose.Schema({
  date: String,
  name: String,
  email: String,
  phone: String,
  subject: String,
  comment: String,
  archived: Boolean
});

export const Contact = model('Contact', contactSchema);

const userSchema = new mongoose.Schema({
  full_name: String,
  username: String,
  photo: String,
  phone: String,
  position: String,
  description: String,
  email: String,
  start_date: String,
  active: Boolean,
  password: String,
});

export const User = model('User', userSchema);