const AbstractManager = require("./AbstractManager");

class ContactManager extends AbstractManager {
  constructor() {
    super({ table: "contact" });
  }

  async create(contact) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, email, message) VALUES (?, ?, ?)`,
      [contact.name, contact.email, contact.message]
    );
    return result.insertId;
  }
}

module.exports = ContactManager;
