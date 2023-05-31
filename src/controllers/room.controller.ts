import { Request, Response } from 'express';
import rooms from '../repositories/rooms';
import { IRoom, INewRoom } from '../models/types';
import toNewRoom from '../utils/toNewRoom';

const getRooms = async (_: Request, res: Response) => {
  try {
    return res.send(await rooms.getAll());
  } catch (err: any) {
    return res.sendStatus(500);
  }
}

const getRoomById = async (req: Request<{ id: string }, IRoom>, res: Response) => {
  try {
    return res.send(await rooms.getOne(Number(req.params.id)));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const createRoom = async (req: Request<{}, IRoom, INewRoom>, res: Response) => {
  try {
    // const newRoom = toNewRoom(req.body);
    return res.status(201).send(await rooms.create(req.body));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const updateRoom = async (req: Request<{ id: string }, IRoom, INewRoom>, res: Response) => {
  try {
    // const validateRoom = toNewRoom(req.body);
    return res.send(await rooms.update({ id: Number(req.params.id), ...req.body }));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const deleteRoom = async (req: Request<{ id: string }, string>, res: Response) => {
  try {
    return res.send(await rooms.delete(Number(req.params.id)));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

export { getRooms, getRoomById, createRoom, updateRoom, deleteRoom }