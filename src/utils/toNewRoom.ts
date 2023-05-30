import { INewRoom } from "../models/types";
import { amenitiesValidation, booleanValidation, numberValidation, stringValidation } from "./validators";

export default function toNewRoom(body: any): INewRoom {
  return {
    name: stringValidation(body.name),
    bed_type: stringValidation(body.bed_type),
    photo: stringValidation(body.bed_type),
    description: stringValidation(body.bed_type),
    amenities: amenitiesValidation(body.amenities),
    rate: numberValidation(body.rate),
    offer: numberValidation(body.offer),
    available: booleanValidation(body.available)
  }
}