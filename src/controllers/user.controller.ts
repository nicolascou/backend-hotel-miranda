import { Request, Response } from 'express';
import users from '../repositories/users';

export const getUsers = (_: Request, res: Response) => {
  try {
    return res.json(users.getAll());
  } catch (err: any) {
    return res.status(err.status).send(err.message);
  }
}

export const getUserById = (req: Request, res: Response) =>
  res.json(users.getOne(Number(req.params.id)));

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