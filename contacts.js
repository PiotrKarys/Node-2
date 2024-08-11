// Importuje moduł 'colors' do kolorowania tekstu w konsoli
require("colors");
// node: dla bezpieczenstwa wywołania właściwej funkcji
// Importuje moduł 'fs' z metodami do obsługi plików w trybie asynchronicznym
const fs = require("node:fs").promises;
// node: dla bezpieczenstwa wywołania właściwej funkcji
// Importuje moduł 'path' do manipulacji ścieżkami plików
const path = require("node:path");

// ścieżka do pluiku kontaktów działająca na każdym typie systemu
const contactsPath = path.join(__dirname, "db", "contacts.json");

// TODO: udokumentuj każdą funkcję

//Zwraca listę wszystkich kontaktów.
async function listContacts() {
  try {
    // Odczytuje zawartość pliku 'contacts.json' jako tekst
    const data = await fs.readFile(contactsPath, "utf8");
    // Parsuje tekst JSON i zwraca dane jako obiekt
    return JSON.parse(data);
  } catch (error) {
    // Wypisuje błąd w konsoli z kolorem tła i tekstu
    console.error("Error reading contacts:".bgRed.black, error);
  }
}
// Zwraca kontakt po podanym identyfikatorze.
async function getContactById(contactId) {
  // ...twój kod
  try {
    // Oczekuje na listę kontaktów
    const contacts = await listContacts();
    // odnajdyywanie kontaktu po ID
    return contacts.find(contact => contact.id === contactId);
  } catch (error) {
    //wyświetlenie błędu na konsoli
    console.error(
      `Error getting contact with ID ${contactId}:`.bgRed.black,
      error
    );
  }
}
//Usuwa kontakt o podanym identyfikatorze.
async function removeContact(contactId) {
  // ...twój kod
  try {
    // oczekiwanie na listę kontaktów
    const contacts = await listContacts();
    // Filtrowanie kontaktów, aby usunąć ten z podanym ID
    const updatedContacts = contacts.filter(
      contact => contact.id !== contactId
    );
    // Zapisuje zaktualizowaną listę kontaktów do pliku
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return updatedContacts;
  } catch (error) {
    //wywołanie błędu w konsoli
    console.error(
      `Error removing contact with ID ${contactId}:`.bgRed.black,
      error
    );
  }
}
//Dodaje nowy kontakt do listy.
async function addContact(name, email, phone) {
  // ...twój kod
  try {
    //oczekiwnaier na listę kontaktów
    const contacts = await listContacts();
    //dynamiczne importowanie nanoid (aby uniknąć downgrade-u w package.json)
    const { nanoid } = await import("nanoid");
    //utworzenie nowego kontaktu
    const newContact = { id: nanoid(), name, email, phone };
    //dodanie nowoutworzonego kontaktu do listy
    contacts.push(newContact);
    //zapisywanie kontaktów w pliku
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    // Wypisuje błąd w konsoli z kolorem tła i tekstu
    console.error("Error adding contact:".bgRed.black, error);
  }
}
// Eksportuje funkcje do zarządzania kontaktami
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
