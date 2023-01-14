const fs = require("fs").promises;
const path = require("node:path");

const contactsPath = path.resolve("db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath)
    .then((data) => console.table(JSON.parse(data)))
    .catch((error) => console.log(error.message));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((contacts) => contacts.filter((contact) => contact.id === contactId))
    .then((contact) => console.table(contact))
    .catch((error) => console.log(error.message));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((contacts) => contacts.filter((contact) => contact.id !== contactId))
    .then((filtredContacts) => {
      console.table(filtredContacts);
      return filtredContacts;
    })
    .then((filtredContacts) => {
      fs.writeFile(
        contactsPath,
        JSON.stringify(filtredContacts, null, 4)
      ).catch((error) => console.log(error.message));
    });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then((data) => JSON.parse(data))
    .then((contacts) => {
      contacts.push({
        id: (contacts.length + 1).toString(),
        name,
        email,
        phone,
      });
      return contacts;
    })
    .then((newContacts) => {
      console.table(newContacts);
      return newContacts;
    })
    .then((newContacts) => {
      fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 4)).catch(
        (error) => console.log(error.message)
      );
    });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
