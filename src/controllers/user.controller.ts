import { Request, Response } from 'express';
import users from '../repositories/users';
import { IUser, INewUser } from '../models/types';
import { userSchema } from '../validators/schemas';
import { BadRequest } from '../models/error';
import bcrypt from 'bcrypt';

const encryptPassword = (input: string) => {
  return bcrypt.hashSync(input, bcrypt.genSaltSync(10));
}

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
    const { error } = userSchema.validate(req.body);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`, 400);
    }
    req.body.password = encryptPassword(req.body.password);
    return res.status(201).send(await users.create(req.body));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const updateUser = async (req: Request<{ id: string }, IUser, INewUser>, res: Response) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`, 400);
    }
    req.body.password = encryptPassword(req.body.password);
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