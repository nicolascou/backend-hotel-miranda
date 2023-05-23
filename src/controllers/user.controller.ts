import { Request, Response } from 'express';
import UserService from '../services/UserService';
import { validateUser } from '../utils/validators';

export const getUsers = (_: Request, res: Response) =>
  res.json(UserService.getAll());

export const getUserById = (req: Request, res: Response) =>
  res.json(UserService.getOne(Number(req.params.id)));

export const createUser = (req: Request, res: Response) => {
  try {
    validateUser(req.body);
    res.json(UserService.create(req.body));
  } catch (err: any) {
    res.status(400).send(err.message)
  } 
}

export const updateUser = (req: Request, res: Response) => {
  try {
    validateUser(req.body);
    res.json(UserService.update(req.body));
  } catch (err: any) {
    res.status(400).send(err.message)
  } 
}

export const deleteUser = (req: Request, res: Response) =>
  res.json(UserService.delete(Number(req.params.id)));