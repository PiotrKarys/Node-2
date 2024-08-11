const { Command } = require("commander");
const contacts = require("./contacts");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      //wyrzucenie danych w konsoli w formie tablicy
      console.table(allContacts);
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      //wylogowanie wyszukanego kontaktu
      console.log("Contact By ID:".bgBlue.white, contact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      //wylogowanie dodanego kontaktu
      console.log("Added Contact:".bgGreen.white);
      console.table(newContact);
      break;

    case "remove":
      const updatedContacts = await contacts.removeContact(id);
      console.log("Succesfull deleted a contact!".bgYellow.white);
      console.table(updatedContacts);
      break;

    default:
      console.warn("Unknown action type!".bgRed.white);
      program.help();
  }
}

invokeAction(argv);
