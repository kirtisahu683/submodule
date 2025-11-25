const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "database.json");

function loadDB() {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
}

function saveDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = {
  createUser(user) {
    const db = loadDB();
    user.id = Date.now();
    db.users.push(user);
    saveDB(db);
    return user;
  },

  getUsers() {
    const db = loadDB();
    return db.users;
  },

  updateUser(id, update) {
    const db = loadDB();
    const user = db.users.find((u) => u.id == id);
    if (!user) return null;

    Object.assign(user, update);
    saveDB(db);
    return user;
  },

  deleteUser(id) {
    const db = loadDB();
    db.users = db.users.filter((u) => u.id != id);
    saveDB(db);
    return true;
  }
};
