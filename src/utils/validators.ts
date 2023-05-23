import { IUser } from "../types";

const stringValidation = (s: string) => {
  if (typeof s !== 'string' || s.length <= 1) {
    throw new Error('Incorrect or missing Full Name');
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