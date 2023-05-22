import { Request, Response } from 'express';
import Users from '../data/users.json';

export function getUsers(_: Request, res: Response) {
  return res.json(Users);
}

export function getUserById(req: Request, res: Response) {
  const requestedUser = Users.find(user => user.id === Number(req.params.id));
  return res.json(requestedUser);
}

export function createUser(req: Request, res: Response) {
  return res.json(201);
}

export function updateUserById(req: Request, res: Response) {
  return res.sendStatus(200);
}

export function deleteUserById(req: Request, res: Response) {
  return res.sendStatus(200);
}