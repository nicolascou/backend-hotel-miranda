import { Request, Response } from 'express';
import users from '../repositories/users';
import { IUser, INewUser } from '../models/types';
import toNewUser from '../utils/toNewUser';

const getUsers = async (_: Request, res: Response) => {
  try {
    return res.send(await users.getAll());
  } catch (err: any) {
    return res.sendStatus(500);
  }
}

const getUserById = async (req: Request<{ id: string }, IUser>, res: Response) => {
  try {
    return res.send(await users.getOne(Number(req.params.id)));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const createUser = async (req: Request<{}, IUser, INewUser>, res: Response) => {
  try {
    // const newUser = toNewUser(req.body);
    return res.status(201).send(await users.create(req.body));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const updateUser = async (req: Request<{ id: string }, IUser, INewUser>, res: Response) => {
  try {
    // const validateUser = toNewUser(req.body);
    return res.send(await users.update({ id: Number(req.params.id), ...req.body }));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const deleteUser = async (req: Request<{ id: string }, string>, res: Response) => {
  try {
    return res.send(await users.delete(Number(req.params.id)));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

export { getUsers, getUserById, createUser, updateUser, deleteUser }