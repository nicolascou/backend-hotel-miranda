import { IContact, INewContact } from '../models/types';
import { BadRequest } from '../models/error';
import moment from 'moment';
import { Contact } from './db/models';

const getAll = async () => {
  const contacts: IContact[] = await Contact.find();
  return contacts;
};

const getOne = async (id: number) => {
  const contact: IContact | null = await Contact.findOne({ id });
  if (!contact) {
    throw new BadRequest('No contact found by provided ID', 404);
  }
  return contact;
}

const create = async (c: INewContact) => {
  const date = moment().format('YYYY/MM/DD');
  const contact = new Contact({ date, ...c });
  return await contact.save();
}

const update = async (c: INewContact, id: string) => {
  const contact = Contact.updateOne({ id }, {
    $set: {
      ...c
    }
  });
  if (!contact) {
    throw new BadRequest('No contact found by provided ID', 404);
  }
  return contact;
}

const _delete = async (id: number) => {
  const contact = Contact.deleteOne({ id });
  if (!contact) {
    throw new BadRequest('No contact found by provided ID', 404);
  }
  return `Contact with id ${id} deleted`;
}

export default { getAll, getOne, create, update, delete: _delete }