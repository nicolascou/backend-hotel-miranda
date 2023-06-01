import { Request, Response } from 'express';
import contacts from '../repositories/contacts';
import { IContact, INewContact } from '../models/types';
import { contactSchema } from '../validators/schemas';
import { BadRequest } from '../models/error';

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
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`, 400);
    }
    return res.status(201).send(await contacts.create(req.body));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const updateContact = async (req: Request<{ id: number }, IContact, INewContact>, res: Response) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`, 400);
    }
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