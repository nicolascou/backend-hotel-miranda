import { Request, Response } from 'express';

export function getUsers(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function createUser(_: Request, res: Response) {
  return res.sendStatus(201);
}

export function updateUser(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function deleteUser(_: Request, res: Response) {
  return res.sendStatus(200);
}