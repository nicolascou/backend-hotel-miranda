import { Request, Response } from 'express';

export function getRooms(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function getRoomById(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function createRoom(_: Request, res: Response) {
  return res.sendStatus(201);
}

export function updateRoomById(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function deleteRoomById(_: Request, res: Response) {
  return res.sendStatus(200);
}