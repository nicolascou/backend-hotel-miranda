import usersJson from './databases/users.json';
import { IUser } from '../models/types';
import { BadRequest } from '../models/error';
import fs from 'fs';

const users = usersJson as IUser[];

const saveJson = () => {
  const jsonData = JSON.stringify(users, null, 2);
  fs.writeFileSync((__dirname + '/databases/users.json'), jsonData);
}

const getAll = () => users;

const getOne = (id: number) => {
  const user = users.find(user => user.id === id);
  if (!user) {
    throw new BadRequest('No user found', 404);
  }
  return user;
}

const create = (newUser: IUser) => {
  users.push(newUser)
  saveJson();
  return newUser;
}

const update = (updatedUser: IUser) => {
  for (const [idx, user] of users.entries()) {
    if (user.id === updatedUser.id) {
      users[idx] = updatedUser;
      break;
    }
  }
  return updatedUser;
}

const _delete = (id: number) => {
  for (const [idx, user] of users.entries()) {
    if (user.id === id) {
      users.splice(idx, 1);
      break;
    }
  }
  return 'User Deleted';
}

export default { getAll, getOne, create, update, delete: _delete }