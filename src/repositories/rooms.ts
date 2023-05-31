import { IRoom, INewRoom } from '../models/types';
import { BadRequest } from '../models/error';
import fs from 'fs';
import { db } from './db';
import { RowDataPacket } from 'mysql2';

const rooms: IRoom[] = JSON.parse(fs.readFileSync(__dirname + '/databases/rooms.json').toString());

function saveJson() {
  const jsonData = JSON.stringify(rooms, null, 2);
  fs.writeFileSync(__dirname + '/databases/rooms.json', jsonData);
}

const getAll = async (): Promise<IRoom[]> => {
  return new Promise((resolve) => {
    db.query('SELECT * FROM rooms', (err, results) => {
      if (err) throw new Error('Query to database failed');
      resolve(results as IRoom[]);
    });
  });
};

const getOne = async (id: number): Promise<IRoom> => {
  return new Promise((resolve) => {
    db.query('SELECT * FROM rooms WHERE id=?', [id], (err, results) => {
      if ((results as RowDataPacket[]).length === 0) throw new BadRequest('No room found by provided ID', 404);
      if (err) throw new Error('Query to database failed');
      resolve((results as RowDataPacket[])[0] as IRoom);
    })
  });
}

const create = async (r: INewRoom): Promise<INewRoom> => {
  return new Promise((resolve) => {
    db.query(`INSERT INTO rooms (\`name\`, \`bed_type\`, \`photo\`, \`description\`, \`amenities\`, \`rate\`, \`offer\`, \`available\`)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [r.name, r.bed_type, r.photo, r.description, JSON.stringify(r.amenities), r.rate, r.offer, r.available], 
    (err, results) => {
      if (err) throw new Error('Query to database failed');
      console.log(results)
      resolve(r)
    })
  });
}

const update = async (r: IRoom) => {
  return new Promise((resolve) => {
    db.query('UPDATE rooms SET name=?, bed_type=?, photo=?, description=?, amenities=?, rate=?, offer=?, available=?, WHERE id=?',
    [r.name, r.bed_type, r.photo, r.description, JSON.stringify(r.amenities), r.rate, r.offer, r.available, r.id],
    (err, results) => {
      if ((results as RowDataPacket[]).length === 0) throw new BadRequest('No room found by provided ID', 404);
      if (err) throw new Error('Query to database failed');
      resolve(results);
    });
  });
}

const _delete = (id: number) => {
  for (const [idx, room] of rooms.entries()) {
    if (room.id === id) {
      rooms.splice(idx, 1);
       saveJson();
      return `Room ${id} Deleted`;
    }
  }
  throw new BadRequest('No room found by provided ID', 404);
}

export default { getAll, getOne, create, update, delete: _delete }