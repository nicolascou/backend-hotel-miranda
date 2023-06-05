import mongoose from "mongoose";

export const roomSchema = new mongoose.Schema({
  name: String,
  bed_type: String,
  photo: String,
  description: String,
  amenities: JSON,
  rate: Number,
  offer: Number,
  available: Boolean
});