import Joi from 'joi';

export const roomSchema = Joi.object({
  name: Joi.string().required(),
  bed_type: Joi.string().valid('Single Bed', 'Double Bed', 'Double Luxury').required(),
  photo: Joi.string().uri(),
  description: Joi.string(),
  amenities: Joi.array().items(Joi.string().valid('Wifi', 'LED TV', 'AC')),
  rate: Joi.number(),
  offer: Joi.number(),
  available: Joi.boolean()
});

export const bookingSchema = Joi.object({
  room_id: Joi.number().required(),
  guest: Joi.string().required(),
  photo: Joi.string().uri(),
  check_in: Joi.string(),
  check_out: Joi.string(),
  room_type: Joi.string(),
  special_request: Joi.string()
});

export const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().length(9),
  subject: Joi.string().required(),
  comment: Joi.string(),
  archived: Joi.boolean()
});

export const userSchema = Joi.object({
  full_name: Joi.string().required(),
  username: Joi.string(),
  photo: Joi.string().uri(),
  phone: Joi.string().length(9),
  position: Joi.string(),
  description: Joi.string(),
  email: Joi.string().email(),
  active: Joi.boolean(),
  password: Joi.string()
});