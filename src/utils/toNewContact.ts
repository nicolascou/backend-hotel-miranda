import { INewContact } from "../models/types";
import { BadRequest } from "../models/error";
import { booleanValidation, stringValidation } from "./validators";

export default function toNewContact(body: any): INewContact {
  return {
    name: stringValidation(body.name),
    email: stringValidation(body.email),
    phone: stringValidation(body.phone),
    subject: stringValidation(body.subject),
    comment: stringValidation(body.comment),
    archived: booleanValidation(body.archived)
  }
}