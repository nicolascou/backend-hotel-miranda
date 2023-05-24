import { Request, Response } from 'express';
import users from '../repositories/users';
import { IUser, INewUser } from '../models/types';

export const getUsers = (_: Request, res: Response) => {
  try {
    return res.send(users.getAll());
  } catch (err: any) {
    return res.sendStatus(500);
  }
}

export const getUserById = (req: Request<{ id: number }, IUser>, res: Response) => {
  try {
    return res.send(users.getOne(Number(req.params.id)));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

export const createUser = (req: Request<{}, IUser, INewUser>, res: Response) => {
  try {
    return res.send(users.create(req.body));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

export const updateUser = (req: Request<{ id: number }, IUser, INewUser>, res: Response) => {
  try {
    return res.send(users.update({ id: Number(req.params.id), ...req.body }));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

export const deleteUser = (req: Request<{ id: number }, string>, res: Response) => {
  try {
    return res.send(users.delete(Number(req.params.id)));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}