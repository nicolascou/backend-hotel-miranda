import { Request, Response } from 'express';
import contacts from '../repositories/contacts';
import { IContact, INewContact } from '../models/types';
import toNewContact from '../utils/toNewContact';

const getContacts = async (_: Request, res: Response) => {
  try {
    return res.send(await contacts.getAll());
  } catch (err: any) {
    return res.sendStatus(500);
  }
}

const getContactById = async (req: Request<{ id: number }, IContact>, res: Response) => {
  try {
    return res.send(await contacts.getOne(req.params.id));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const createContact = async (req: Request<{}, IContact, INewContact>, res: Response) => {
  try {
    // const newContact = toNewContact(req.body);
    return res.status(201).send(await contacts.create(req.body));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const updateContact = async (req: Request<{ id: number }, IContact, INewContact>, res: Response) => {
  try {
    // const validateContact = toNewContact(req.body);
    return res.send(await contacts.update({ id: req.params.id, ...req.body }));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const deleteContact = async (req: Request<{ id: number }, string>, res: Response) => {
  try {
    return res.send(await contacts.delete(req.params.id));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

export { getContacts, getContactById, createContact, updateContact, deleteContact }