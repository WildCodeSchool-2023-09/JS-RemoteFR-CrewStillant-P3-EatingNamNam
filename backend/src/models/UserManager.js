const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "users" as configuration
    super({ table: "user" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, mail, pseudo, password, weight, week_time_kitchen, birthdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.mail,
        user.pseudo,
        user.password,
        user.weight,
        user.week_time_kitchen,
        user.birthdate,
      ]
    );
    return result.insertId;
  }
  // The D of CRUD - Delete operation

  // The Rs of CRUD - Read operations

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id=?`,
      [id]
    );
    return rows[0];
  }
  // The U of CRUD - Update operation

  async update(user, id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET firstname=?, lastname=?, mail=?, pseudo=?, password=?, weight=?, week_time_kitchen=? WHERE id = ?`,
      [
        user.firstname,
        user.lastname,
        user.mail,
        user.pseudo,
        user.password,
        user.weight,
        user.week_time_kitchen,
        id,
      ]
    );
    return result.affectedRows;
  }
  // The D of CRUD - Delete operation

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = UserManager;
