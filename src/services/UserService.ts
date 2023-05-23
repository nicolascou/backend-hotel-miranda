import usersData from './data/users.json';
import { IUser } from '../types';

const users = usersData as IUser[];

const getAll = () => users;

const getOne = (id: number) => users.find(user => user.id === id);

const create = (newUser: IUser) => {
  users.push(newUser)
  return newUser;
}

const update = (updatedUser: IUser) => {
  return updatedUser;
}

const _delete = (id: number) => {
  return 'Deleted';
}

export default { getAll, getOne, create, update, delete: _delete }