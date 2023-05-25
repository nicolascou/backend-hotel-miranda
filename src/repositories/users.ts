import { INewUser, IUser } from '../models/types';
import { BadRequest } from '../models/error';
import fs from 'fs';
import moment from 'moment';

const users: IUser[] = JSON.parse(fs.readFileSync(__dirname + '/databases/users.json').toString());

function saveJson() {
  const jsonData = JSON.stringify(users, null, 2);
  fs.writeFileSync(__dirname + '/databases/users.json', jsonData);
}

const getAll = () => users;

const getOne = (id: number) => {
  const user = users.find(user => user.id === id);
  if (!user) {
    throw new BadRequest('No user found by provided ID', 404);
  }
  return user;
}

const create = (newUserInfo: INewUser) => {
  const newUser: IUser = {
    id: users[users.length-1].id + 1,
    ...newUserInfo,
    start_date: moment().format('YYYY-MM-DD')
  }
  users.push(newUser);
  saveJson();
  return newUser;
}

const update = (updatedUser: Omit<IUser, 'start_date'>) => {
  for (let [idx, user] of users.entries()) {
    if (user.id === updatedUser.id) {
      users[idx] = {
        ...updatedUser,
        start_date: user.start_date
      }
      saveJson();
      return users[idx];
    }
  }
  throw new BadRequest('No user found by provided ID', 404);
}

const _delete = (id: number) => {
  for (const [idx, user] of users.entries()) {
    if (user.id === id) {
      users.splice(idx, 1);
       saveJson();
      return 'User Deleted';
    }
  }
  throw new BadRequest('No user found by provided ID', 404);
}

export default { getAll, getOne, create, update, delete: _delete }