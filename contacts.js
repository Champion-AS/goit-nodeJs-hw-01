/** @format */

const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function getContactById(contactsId) {
  const contacts = await listContacts();
  const result = await contacts.find(({ id }) => id === contactsId);
  if (!result) return null;
  return result;
}

async function removeContact(contactsId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(({ id }) => id === contactsId);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContacts = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContacts;
}
module.exports = { listContacts, getContactById, removeContact, addContact };
