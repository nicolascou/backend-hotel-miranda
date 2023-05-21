import { Request, Response } from 'express';

export function getContacts(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function createContact(_: Request, res: Response) {
  return res.sendStatus(201);
}

export function updateContact(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function deleteContact(_: Request, res: Response) {
  return res.sendStatus(200);
}