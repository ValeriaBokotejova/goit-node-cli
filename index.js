import { program } from "commander";
import chalk from "chalk";
import Table from "cli-table3";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";

program
  .option("-a, --action <type>", "choose action: list|get|add|remove")
  .option("-i, --id <type>", "contact id")
  .option("-n, --name <type>", "contact name")
  .option("-e, --email <type>", "contact email")
  .option("-p, --phone <type>", "contact phone");

program.parse();
const { action, id, name, email, phone } = program.opts();

/* ---------- table helpers ---------- */

function printContacts(contacts) {
  if (!contacts || contacts.length === 0) {
    console.log(chalk.yellow("null"));
    return;
  }
  const t = new Table({
    head: [chalk.bold("ID"), chalk.bold("Name"), chalk.bold("Email"), chalk.bold("Phone")],
    colWidths: [36, 18, 28, 18],
    wordWrap: true,
    style: { head: [], border: [] },
  });
  contacts.forEach(c => t.push([
    chalk.dim(c.id),
    chalk.green(c.name),
    chalk.gray(c.email),
    chalk.yellow(c.phone),
  ]));
  console.log(t.toString());
}

/* ----------------------------------- */

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list": {
      const contacts = await listContacts();
      printContacts(contacts);
      break;
    }
    case "get": {
      if (!id) return console.log(chalk.yellow("Please provide --id"));
      const contact = await getContactById(id);
      if (contact) {
        printContacts([contact]);
      } else {
        console.log(chalk.yellow("No such contact"));
      }
      break;
    }
    case "add": {
      if (!name || !email || !phone)
        return console.log(chalk.yellow("Please provide --name, --email and --phone"));
      const created = await addContact(name, email, phone);
      console.log(chalk.green("✔ Added"));
      printContacts([created]);
      break;
    }
    case "remove": {
      if (!id) return console.log(chalk.yellow("Please provide --id"));
      const removed = await removeContact(id);
      if (removed) {
        console.log(chalk.green("✔ Removed"));
        printContacts([removed]);
      } else {
        console.log(chalk.red(`✖ Contact with id ${id} not found`));
      }
      break;
    }
    default:
      console.log(chalk.red("Unknown action.") + " Use: " + chalk.cyan("list|get|add|remove"));
  }
}

invokeAction({ action, id, name, email, phone }).catch(err => {
  console.error(chalk.red("Error:"), err.message);
  process.exit(1);
});
