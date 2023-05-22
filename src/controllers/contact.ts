import { Request, Response } from 'express';

export function getContacts(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function getContactById(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function createContact(_: Request, res: Response) {
  return res.sendStatus(201);
}

export function updateContactById(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function deleteContactById(_: Request, res: Response) {
  return res.sendStatus(200);
}