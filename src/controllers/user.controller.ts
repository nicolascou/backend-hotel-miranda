import { Request, Response } from 'express';
import users from '../repositories/users';
import { BadRequest } from '../models/error';

export const getUsers = (_: Request, res: Response) => {
  try {
    return res.json(users.getAll());
  } catch (err: any) {
    return res.sendStatus(500);
  }
}

export const getUserById = (req: Request, res: Response) => {
  try {
    return res.json(users.getOne(Number(req.params.id)));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

export const createUser = (req: Request, res: Response) => {
  try {
    res.json(users.create(req.body));
  } catch (err: any) {
    res.status(err.status).send(err.message);
  }
}

export const updateUser = (req: Request, res: Response) => {
  try {
    res.json(users.update(req.body));
  } catch (err: any) {
    res.status(400).send(err.message);
  }
}

export const deleteUser = (req: Request, res: Response) =>
  res.json(users.delete(Number(req.params.id)));