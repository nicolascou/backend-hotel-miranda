import { IUser } from "../models/types";
import { BadRequest } from "../models/error";

const stringValidation = (s: string) => {
  if (typeof s !== 'string' || s.length <= 1) {
    throw new BadRequest('Incorrect or missing Full Name', 400);
  }
  return s;
}

export function validateUser(body: any) {
  const user: Omit<IUser, 'id' | 'start_date'> = {
    full_name: stringValidation(body.full_name),
    description: stringValidation(body.description),
    email: stringValidation(body.email),
    password: stringValidation(body.password),
    photo: stringValidation(body.photo),
    position: stringValidation(body.photo),
    state: stringValidation(body.state),
    username: stringValidation(body.username),
    phone: stringValidation(body.phone)
  }
}