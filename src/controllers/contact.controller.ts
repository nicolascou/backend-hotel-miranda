import { Request, Response } from 'express';
import contacts from '../repositories/contacts';
import { IContact } from '../models/types';

const getContacts = (_: Request, res: Response) => {
  try {
    return res.send(contacts.getAll());
  } catch (err: any) {
    return res.sendStatus(500);
  }
}

const getContactById = (req: Request<{ id: string }, IContact>, res: Response) => {
  try {
    return res.send(contacts.getOne(req.params.id));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const createContact = (req: Request<{}, IContact, Omit<IContact, 'id'>>, res: Response) => {
  try {
    return res.status(200).send(contacts.create(req.body));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const updateContact = (req: Request<{ id: string }, IContact, Omit<IContact, 'id'>>, res: Response) => {
  try {
    return res.send(contacts.update({ id: req.params.id, ...req.body }));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const deleteContact = (req: Request<{ id: string }, string>, res: Response) => {
  try {
    return res.send(contacts.delete(req.params.id));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

export { getContacts, getContactById, createContact, updateContact, deleteContact }