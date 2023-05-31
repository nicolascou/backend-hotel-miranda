import { IRoom, INewRoom } from '../models/types';
import { BadRequest } from '../models/error';
import fs from 'fs';
import { db } from './db';
import { OkPacket, RowDataPacket } from 'mysql2';

const rooms: IRoom[] = JSON.parse(fs.readFileSync(__dirname + '/databases/rooms.json').toString());

function saveJson() {
  const jsonData = JSON.stringify(rooms, null, 2);
  fs.writeFileSync(__dirname + '/databases/rooms.json', jsonData);
}

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
  const results = await db.promise().query(`INSERT INTO rooms (\`name\`, \`bed_type\`, \`photo\`, \`description\`, \`amenities\`, \`rate\`, \`offer\`, \`available\`)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [r.name, r.bed_type, r.photo, r.description, JSON.stringify(r.amenities), r.rate, r.offer, r.available]);
  return results;
}

const update = async (r: IRoom) => {
  const results = db.promise().query('UPDATE rooms SET name=?, bed_type=?, photo=?, description=?, amenities=?, rate=?, offer=?, available=? WHERE id=?',
  [r.name, r.bed_type, r.photo, r.description, JSON.stringify(r.amenities), r.rate, r.offer, r.available, r.id]);
  if (!results) {
    throw new BadRequest('No room found by provided ID', 404);
  }
  return results;
}

const _delete = (id: number) => {
  const results = db.promise().query('DELETE FROM rooms WHERE id=?', [id]);
  if (!results) {
    throw new BadRequest('No room found by provided ID', 404);
  }
  return results;
}

export default { getAll, getOne, create, update, delete: _delete }