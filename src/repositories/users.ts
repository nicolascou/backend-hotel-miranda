import { INewUser, IUser } from '../models/types';
import { BadRequest } from '../models/error';
import moment from 'moment';
import { User } from './db/models';

const getAll = async () => {
  const users: IUser[] = await User.find();
  return users;
};

const getOne = async (_id: string) => {
  const user: IUser | null = await User.findOne({ _id });
  if (!user) {
    throw new BadRequest('No user found by provided ID', 404);
  }
  return user;
};

const create = async (u: INewUser) => {
  const start_date = moment().format('YYYY-MM-DD');
  const user = new User({ start_date, ...u });
  return await user.save();
};

const update = async (u: INewUser, _id: string) => {
  const user = await User.findOneAndUpdate({ _id }, { $set: { ...u } }, { new: true });
  if (!user) {
    throw new BadRequest('No user found by provided ID', 404);
  }
  return user;
};

const _delete = async (_id: string) => {
  const user = await User.findOneAndDelete({ _id });
  if (!user) {
    throw new BadRequest('No user found by provided ID', 404);
  }
  return `User with id ${_id} deleted`;
};

export default { getAll, getOne, create, update, delete: _delete };
