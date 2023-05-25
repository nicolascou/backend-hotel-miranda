import { INewRoom } from "../models/types";
import { BadRequest } from "../models/error";

function stringValidation(s: string) {
  if ( typeof s !== 'string' || s.length <= 1) {
    throw new BadRequest('Incorrect user data', 400);
  }
  return s;
}

function numberValidation(n: number) {
  if (typeof n !== 'number') {
    throw new BadRequest('Incorrect user data', 400);
  }
  return n;
}

function amenitiesValidation(a: string[]) {
  if (!Array.isArray(a)) {
    throw new BadRequest('Incorrect amenities', 400);
  }
  return a;
}

export function toNewRoom(body: any): INewRoom {
  return {
    name: stringValidation(body.name),
    bed_type: stringValidation(body.bed_type),
    photo: stringValidation(body.bed_type),
    description: stringValidation(body.bed_type),
    amenities: amenitiesValidation(body.amenities),
    rate: numberValidation(body.rate),
    offer: numberValidation(body.offer),
    status: stringValidation(body.status)
  }
}