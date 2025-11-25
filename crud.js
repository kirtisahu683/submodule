import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "database.json");

function loadDB() {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

function saveDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export function createUser(user) {
    const db = loadDB();
    user.id = Date.now();
    db.users.push(user);
    saveDB(db);
    return user;
  }

  export function getUsers() {
    const db = loadDB();
    return db.users;
  }

 export  function updateUser(id, update) {
    const db = loadDB();
    const user = db.users.find((u) => u.id == id);
    if (!user) return null;

    Object.assign(user, update);
    saveDB(db);
    return user;
  }

 export function deleteUser(id) {
    const db = loadDB();
    db.users = db.users.filter((u) => u.id != id);
    saveDB(db);
    return true;
  }
