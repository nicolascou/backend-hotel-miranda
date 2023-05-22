import { Request, Response } from 'express';

export function getUsers(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function getUserById(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function createUser(_: Request, res: Response) {
  return res.sendStatus(201);
}

export function updateUserById(_: Request, res: Response) {
  return res.sendStatus(200);
}

export function deleteUserById(_: Request, res: Response) {
  return res.sendStatus(200);
}