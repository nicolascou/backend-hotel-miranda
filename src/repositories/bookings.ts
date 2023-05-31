import { IBooking, INewBooking } from '../models/types';
import { BadRequest } from '../models/error';
import moment from 'moment';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { db } from './db';

const getAll = async () => {
  const [ results ] = await db.promise().query('SELECT * FROM bookings');
  return results as IBooking[];
};

const getOne = async (id: number) => {
  const [ results ] = await db.promise().query<RowDataPacket[]>('SELECT * FROM bookings WHERE id=?', [id]);
  if (!results) {
    throw new BadRequest('No booking found by provided ID', 404);
  }
  return results[0] as IBooking;
}

const create = async (b: INewBooking) => {
  const [ results ] = await db.promise().query<ResultSetHeader>(`INSERT INTO bookings (\`room_id\`, \`guest\`, \`guest_id\`, \`photo\`, \`order_date\`, \`check_in\`, \`check_out\`, \`room_type\`, \`special_request\`)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [b.room_id, b.guest, '#' + Math.trunc(Math.random() * 100000000), b.photo, moment().format('YYYY/MM/DD'), b.check_in, b.check_out, b.room_type, b.special_request]);
  return {
    id: results.insertId,
    ...b
  };
}

const update = async (b: INewBooking & {id: number}) => {
  const [ results ] = await db.promise().query<ResultSetHeader>('UPDATE bookings SET room_id=?, guest=?, photo=?, check_in=?, check_out=?, room_type=?, special_request=? WHERE id=?',
  [b.room_id, b.guest, b.photo, b.check_in, b.check_out, b.room_type, b.special_request, b.id]);
  if (results.insertId) {
    throw new BadRequest('No booking found by provided ID', 404);
  }
  return b;
}

const _delete = async (id: number) => {
  const results = await db.promise().query<ResultSetHeader>('DELETE FROM bookings WHERE id=?', [id]);
  if (results[0].affectedRows === 0) {
    throw new BadRequest('No booking found by provided ID', 404);
  }
  return `Booking with id ${id} deleted`;
}

export default { getAll, getOne, create, update, delete: _delete }