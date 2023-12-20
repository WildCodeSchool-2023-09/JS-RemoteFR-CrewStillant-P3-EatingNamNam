const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "users" as configuration
    super({ table: "users" });
  }

  // The C of CRUD - Create operation

  async create(user) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, email, pseudo, password, sexe, weight, week_time_kitchen, birthdate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.pseudo,
        user.password,
        user.sexe,
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

  async update(user) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET firstname=?, lastname=?, email=?, pseudo=?, password=?, sexe=?, weight=?, week_time_kitchen=? WHERE id = ?`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.pseudo,
        user.password,
        user.sexe,
        user.weight,
        user.week_time_kitchen,
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
