import { IRoom, INewRoom } from '../models/types';
import { BadRequest } from '../models/error';
import { Room } from './db/models';

const getAll = async () => {
  const rooms: IRoom[] = await Room.find();
  return rooms;
};

const getOne = async (_id: string) => {
  const room: IRoom | null = await Room.findOne({ _id });
  if (!room) {
    throw new BadRequest('No room found by provided ID', 404);
  }
  return room;
}

const create = async (r: INewRoom) => {
  const room = new Room(r);
  return await room.save();
}

const update = async (r: INewRoom, _id: string) => {
  const room = await Room.findOneAndUpdate({ _id }, {
    $set: {
      ...r
    }
  }, { new: true });
  if (!room) {
    throw new BadRequest('No room found by provided ID', 404);
  }
  return room;
}

const _delete = async (_id: number) => {
  const room = await Room.findOneAndDelete({ _id });
  if (!room) {
    throw new BadRequest('No room found by provided ID', 404);
  }
  return `Room with id ${_id} deleted`;
}

export default { getAll, getOne, create, update, delete: _delete }