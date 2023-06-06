import { IRoom, INewRoom } from '../models/types';
import { BadRequest } from '../models/error';
// import { db } from './db';
// import { ResultSetHeader, RowDataPacket } from 'mysql2';

const getAll = async () => {
  const [ results ] = await db.promise().query('SELECT * FROM rooms');
  return results as IRoom[];
};

const getOne = async (id: number) => {
  const [ results ] = await db.promise().query<RowDataPacket[]>('SELECT * FROM rooms WHERE id=?', [id]);
  if (!results[0]) {
    throw new BadRequest('No room found by provided ID', 404);
  }
  return results[0] as IRoom;
}

const create = async (r: INewRoom) => {
  const [ results ] = await db.promise().query<ResultSetHeader>(`INSERT INTO rooms (\`name\`, \`bed_type\`, \`photo\`, \`description\`, \`amenities\`, \`rate\`, \`offer\`, \`available\`)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [r.name, r.bed_type, r.photo, r.description, JSON.stringify(r.amenities), r.rate, r.offer, r.available]);
  return {
    id: results.insertId,
    r
  };
}

const update = async (r: IRoom) => {
  const [ results ] = await db.promise().query<ResultSetHeader>('UPDATE rooms SET name=?, bed_type=?, photo=?, description=?, amenities=?, rate=?, offer=?, available=? WHERE id=?',
  [r.name, r.bed_type, r.photo, r.description, JSON.stringify(r.amenities), r.rate, r.offer, r.available, r.id]);
  if (results.affectedRows === 0) {
    throw new BadRequest('No room found by provided ID', 404);
  }
  return r;
}

const _delete = async (id: number) => {
  const results = await db.promise().query<ResultSetHeader>('DELETE FROM rooms WHERE id=?', [id]);
  if (results[0].affectedRows === 0) {
    throw new BadRequest('No room found by provided ID', 404);
  }
  return `Room with id ${id} deleted`;
}

export default { getAll, getOne, create, update, delete: _delete }