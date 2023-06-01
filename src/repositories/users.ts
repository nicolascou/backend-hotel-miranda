import { INewUser, IUser } from '../models/types';
import { BadRequest } from '../models/error';
import moment from 'moment';
import { db } from './db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

const getAll = async () => {
  const [ results ] = await db.promise().query('SELECT * FROM users');
  return results as IUser[];
};

const getOne = async (id: number) => {
  const [ results ] = await db.promise().query<RowDataPacket[]>('SELECT * FROM users WHERE id=?', [id]);
  if (!results[0]) {
    throw new BadRequest('No user found by provided ID', 404);
  }
  return results[0] as IUser;
}

const create = async (u: INewUser) => {
  const start_date = moment().format('YYYY-MM-DD');
  const [ results ] = await db.promise().execute<RowDataPacket[]>('INSERT INTO users (full_name, description, email, password, photo, position, active, username, phone, start_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
  [u.full_name, u.description, u.email, u.password, u.photo, u.position, u.active, u.username, u.phone, start_date]);
  return results[0] as IUser;
}

const update = async (u: Omit<IUser, 'start_date'>) => {
  const [ results ] = await db.promise().execute<RowDataPacket[]>('UPDATE users SET full_name=?, description=?, email=?, password=?, photo=?, position=?, active=?, username=?, phone=? WHERE id=?',
  [u.full_name, u.description, u.email, u.password, u.photo, u.position, u.active, u.username, u.phone, u.id]);
  if (!results[0]) {
    throw new BadRequest('No user found by provided ID', 404);
  }
  return results[0] as IUser;
}

const _delete = async (id: number) => {
  const [ results ] = await db.promise().query<ResultSetHeader>('DELETE FROM users WHERE id=?', [id]);
  if (results.affectedRows === 0) {
    throw new BadRequest('No user found by provided ID', 404);
  }
  return `User with ID ${id} deleted`;
}

export default { getAll, getOne, create, update, delete: _delete }