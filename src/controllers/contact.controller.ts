import { Request, Response } from 'express';
import contacts from '../repositories/contacts';
import { IContact, INewContact } from '../models/types';
import { contactJoiSchema } from '../validators/schemas';
import { BadRequest } from '../models/error';

const getContacts = async (_: Request, res: Response) => {
  try {
    return res.send(await contacts.getAll());
  } catch (err: any) {
    return res.sendStatus(500);
  }
}

const getContactById = async (req: Request<{ id: string }, IContact>, res: Response) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequest('Invalid ID Format', 400);
    }
    return res.send(await contacts.getOne(req.params.id));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const createContact = async (req: Request<{}, IContact, INewContact>, res: Response) => {
  try {
    const { error } = contactJoiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`, 400);
    }
    return res.status(201).send(await contacts.create(req.body));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const updateContact = async (req: Request<{ id: string }, IContact, INewContact>, res: Response) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequest('Invalid ID Format', 400);
    }
    const { error } = contactJoiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(`Validation error: ${error.details[0].message}`, 400);
    }
    return res.send(await contacts.update(req.body, req.params.id));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

const deleteContact = async (req: Request<{ id: string }, string>, res: Response) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequest('Invalid ID Format', 400);
    }
    return res.send(await contacts.delete(req.params.id));
  } catch (err: any) {
    return res.status(err.status ?? 500).send(err.message);
  }
}

export { getContacts, getContactById, createContact, updateContact, deleteContact }