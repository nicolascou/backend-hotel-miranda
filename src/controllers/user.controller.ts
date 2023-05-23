import { Request, Response } from 'express';
import UserService from '../services/UserService';

export const getUsers = (_: Request, res: Response) =>
  res.json(UserService.getAll());

export const getUserById = (req: Request, res: Response) =>
  res.json(UserService.getOne(Number(req.params.id)));

export const createUser = (req: Request, res: Response) =>
  res.json(UserService.create(req.body));

export const updateUser = (req: Request, res: Response) =>
  res.json(UserService.update(req.body));

export const deleteUser = (req: Request, res: Response) =>
  res.json(UserService.delete(Number(req.params.id)));