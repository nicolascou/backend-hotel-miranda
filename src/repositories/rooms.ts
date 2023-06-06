import { IRoom, INewRoom } from '../models/types';
import { BadRequest } from '../models/error';
import { Room } from './db/models';

const getAll = async () => {
  const rooms: IRoom[] = await Room.find();
  return rooms;
};

const getOne = async (id: string) => {
  const room: IRoom | null = await Room.findOne({ id });
  if (!room) {
    throw new BadRequest('No room found by provided ID', 404);
  }
  return room;
}

const create = async (r: INewRoom) => {
  const room = new Room(r);
  return await room.save();
}

const update = async (r: INewRoom, id: string) => {
  const room = Room.updateOne({ id }, {
    $set: {
      ...r
    }
  });
  if (!room) {
    throw new BadRequest('No room found by provided ID', 404);
  }
  return room;
}

const _delete = async (id: number) => {
  const room = Room.deleteOne({ id });
  if (!room) {
    throw new BadRequest('No room found by provided ID', 404);
  }
  return `Room with id ${id} deleted`;
}

export default { getAll, getOne, create, update, delete: _delete }