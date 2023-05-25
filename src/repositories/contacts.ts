import { IContact, INewContact } from '../models/types';
import { BadRequest } from '../models/error';
import fs from 'fs';
import moment from 'moment';

const contacts: IContact[] = JSON.parse(fs.readFileSync(__dirname + '/databases/contact.json').toString());

function saveJson() {
  const jsonData = JSON.stringify(contacts, null, 2);
  fs.writeFileSync(__dirname + '/databases/contact.json', jsonData);
}

const getAll = () => contacts;

const getOne = (id: string) => {
  const contact = contacts.find(contact => contact.id === id);
  if (!contact) {
    throw new BadRequest('No user found by provided ID', 404);
  }
  return contact;
}

const create = (newContactInfo: INewContact) => {
  const newContact: IContact = {
    id: (Number(contacts[contacts.length-1].id) + 1).toString(),
    ...newContactInfo,
    date: moment().format('YYYY-MM-DD')
  }
  contacts.push(newContact);
  saveJson();
  return newContact;
}

const update = (updatedContact: Omit<IContact, 'date'>) => {
  for (let [idx, contact] of contacts.entries()) {
    if (contact.id === updatedContact.id) {
      contacts[idx] = {
        ...updatedContact,
        date: contact.date
      }
      saveJson();
      return contacts[idx];
    }
  }
  throw new BadRequest('No user found by provided ID', 404);
}

const _delete = (id: string) => {
  for (const [idx, contact] of contacts.entries()) {
    if (contact.id === id) {
      contacts.splice(idx, 1);
       saveJson();
      return 'Contact Deleted';
    }
  }
  throw new BadRequest('No contact found by provided ID', 404);
}

export default { getAll, getOne, create, update, delete: _delete }