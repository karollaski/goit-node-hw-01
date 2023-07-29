const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");
console.log(contactsPath);

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

console.log(listContacts);

const getContactById = async (id) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === id) || null;
};

console.log(getContactById);

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};
console.log(removeContact);

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: Math.round(Math.random() * 100),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};
console.log(addContact);

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
