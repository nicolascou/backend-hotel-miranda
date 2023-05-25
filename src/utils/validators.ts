import { BadRequest } from "../models/error";

export function stringValidation(s: string) {
  if ( typeof s !== 'string' || s.length <= 1) {
    throw new BadRequest('Incorrect data', 400);
  }
  return s;
}

export function stateValidation(state: 'active' | 'inactive') {
  if (state !== 'active' && state !== 'inactive') {
    throw new BadRequest('Incorrect data', 400);
  }
  return state;
}

export function emailValidation(email: string) {
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) {
    throw new BadRequest('Incorrect or missing email', 400);
  }
  return email;
}

export function phoneValidation(phoneNumber: string) {
  var re = /^\d{9}$/;
  if (!re.test(phoneNumber)) {
    throw new BadRequest('Incorrect or missing phone number', 400);
  }
  return phoneNumber;
}

export function numberValidation(n: number) {
  if (typeof n !== 'number') {
    throw new BadRequest('Incorrect data', 400);
  }
  return n;
}

export function amenitiesValidation(a: string[]) {
  if (!Array.isArray(a)) {
    throw new BadRequest('Incorrect amenities', 400);
  }
  return a;
}

export function booleanValidation(x: boolean) {
  if (typeof x !== 'boolean') {
    throw new BadRequest('Incorrect data', 400);
  }
  return x;
}

export function bookingStatusValidation(status: 'Check In' | 'Check Out' | 'In Progress') {
  if (!['Check In', 'Check Out', 'In Progress'].includes(status)) {
    throw new BadRequest('Incorrect booking status', 400);
  }
  return status;
}