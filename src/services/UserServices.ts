import usersData from './data/users.json';
import { IUser } from '../types';

const users = usersData as IUser[];

export const getAll = () => users;

export const getOne = (id: number) => users.find(user => user.id === id);

export const create = (newUser: IUser) => {
  users.push(newUser);
  return newUser;
}