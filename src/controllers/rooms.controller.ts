import { Request, Response } from 'express';

export function getRooms(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function createRoom(_: Request, res: Response) {
  return res.sendStatus(201);
}

export function updateRoom(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function deleteRoom(_: Request, res: Response) {
  return res.sendStatus(200);
}