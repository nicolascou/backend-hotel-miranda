import { IContact, INewContact } from '../models/types';
import { BadRequest } from '../models/error';
import fs from 'fs';
import moment from 'moment';
import { db } from './db';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

const contacts: IContact[] = JSON.parse(fs.readFileSync(__dirname + '/databases/contact.json').toString());

function saveJson() {
  const jsonData = JSON.stringify(contacts, null, 2);
  fs.writeFileSync(__dirname + '/databases/contact.json', jsonData);
}

const getAll = async () => {
  const [ results ] = await db.promise().query('SELECT * FROM contact');
  return results as IContact[];
};

const getOne = async (id: number) => {
  const [ results ] = await db.promise().query<RowDataPacket[]>('SELECT * FROM contact WHERE id=?', [id]);
  if (!results[0]) {
    throw new BadRequest('No contact found by provided ID', 404);
  }
  return results[0] as IContact;
}

const create = async (c: INewContact) => {
  const date = moment().format('YYYY/MM/DD');
  const [ results ] = await db.promise().query<ResultSetHeader>(`INSERT INTO contact (date, name, email, phone, subject, comment, archived) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`, [date, c.name, c.email, c.phone, c.subject, c.comment, c.archived]);
  return {
    id: results.insertId,
    ...c,
    date
  }
}

const update = async (c: Omit<IContact, 'date'>) => {
  const [ results ] = await db.promise().query<ResultSetHeader>('UPDATE contact SET name=?, email=?, phone=?, subject=?, comment=?, archived=? WHERE id=?', 
  [c.name, c.email, c.phone, c.subject, c.comment, c.archived, c.id])
  if (results.affectedRows === 0) {
    throw new BadRequest('No contact found by provided ID', 404);
  }
  return c;
}

const _delete = async (id: number) => {
  const [ results ] = await db.promise().query<ResultSetHeader>('DELETE FROM contact WHERE id=?', [id]);
  if (results.affectedRows === 0) {
    throw new BadRequest('No contact found by provided ID', 404);
  }
  return `Contact with ID ${id} deleted`;
}

export default { getAll, getOne, create, update, delete: _delete }