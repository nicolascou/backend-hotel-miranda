import { INewUser, IUser } from '../models/types';
import { BadRequest } from '../models/error';
import moment from 'moment';
import { User } from './db/models';

const getAll = async () => {
  const users: IUser[] = await User.find();
  return users;
};

const getOne = async (id: string) => {
  const user: IUser | null = await User.findOne({ id });
  if (!user) {
    throw new BadRequest('No user found by provided ID', 404);
  }
  return user;
}

const create = async (u: INewUser) => {
  const start_date = moment().format('YYYY-MM-DD');
  const user = new User({ start_date, ...u });
  return await user.save();
}

const update = async (u: INewUser, id: string) => {
  const user = User.updateOne({ id }, {
    $set: {
      ...u
    }
  });
  if (!user) {
    throw new BadRequest('No user found by provided ID', 404);
  }
  return user;
}

const _delete = async (id: number) => {
  const user = User.deleteOne({ id });
  if (!user) {
    throw new BadRequest('No user found by provided ID', 404);
  }
  return `User with id ${id} deleted`;
}

export default { getAll, getOne, create, update, delete: _delete }