import { INewBooking } from "../models/types";
import { bookingStatusValidation, stringValidation } from "./validators";

export default function toNewContact(body: any): INewBooking {
  return {
    check_in: stringValidation(body.name),
    check_out: stringValidation(body.email),
    guest: stringValidation(body.phone),
    photo: stringValidation(body.subject),
    room_type: stringValidation(body.comment),
    special_request: stringValidation(body.archived),
    status: bookingStatusValidation(body.status)
  }
}