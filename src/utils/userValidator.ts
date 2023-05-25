import { INewUser } from "../models/types";
import { BadRequest } from "../models/error";

function stringValidation(s: string) {
  if ( typeof s !== 'string' || s.length <= 1) {
    throw new BadRequest('Incorrect user data', 400);
  }
  return s;
}

function stateValidation(state: 'active' | 'inactive') {
  if (state !== 'active' && state !== 'inactive') {
    throw new BadRequest('Incorrect user data', 400);
  }
  return state;
}

function emailValidation(email: string) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    throw new BadRequest('Incorrect or missing email', 400);
  }
  return email;
}

function phoneValidation(phoneNumber: string) {
  var re = /^\d{9}$/;
  if (!re.test(phoneNumber)) {
    throw new BadRequest('Incorrect or missing phone number', 400);
  }
  return phoneNumber;
}

export function toNewUser(body: any): INewUser {
  return {
    full_name: stringValidation(body.full_name),
    description: stringValidation(body.description),
    email: emailValidation(body.email),
    password: stringValidation(body.password),
    photo: stringValidation(body.photo),
    position: stringValidation(body.photo),
    state: stateValidation(body.state),
    username: stringValidation(body.username),
    phone: phoneValidation(body.phone) || undefined
  }
}