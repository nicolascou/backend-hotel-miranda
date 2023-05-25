import { Request, Response } from 'express';
import users from '../repositories/users';
import { IUser, INewUser } from '../models/types';
import toNewUser from '../utils/toNewUser';

const getUsers = (_: Request, res: Response) => {
  try {
    return res.send(users.getAll());
  } catch (err: any) {
    return res.sendStatus(500);
  }
}

const getUserById = (req: Request<{ id: string }, IUser>, res: Response) => {
  try {
    return res.send(users.getOne(Number(req.params.id)));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const createUser = (req: Request<{}, IUser, INewUser>, res: Response) => {
  try {
    const newUser = toNewUser(req.body);
    return res.status(200).send(users.create(newUser));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const updateUser = (req: Request<{ id: string }, IUser, INewUser>, res: Response) => {
  try {
    const validateUser = toNewUser(req.body);
    return res.send(users.update({ id: Number(req.params.id), ...validateUser }));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const deleteUser = (req: Request<{ id: string }, string>, res: Response) => {
  try {
    return res.send(users.delete(Number(req.params.id)));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

export { getUsers, getUserById, createUser, updateUser, deleteUser }