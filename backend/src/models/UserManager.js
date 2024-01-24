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
        user.hashedPassword,
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
    const [rows] = await this.database.query(
      `SELECT u.*, r.type AS role FROM ${this.table} AS u JOIN role AS r ON r.id = u.role_id`
    );
    return rows;
  }
  // , COUNT(rc.recipe_id) AS total_recipe JOIN recipe_comment AS rc ON rc.user_id=u.id

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id=?`,
      [id]
    );
    return rows[0];
  }

  async readByEmail(mail) {
    const [rows] = await this.database.query(
      `SELECT u.*, r.type AS role FROM ${this.table} AS u JOIN role AS r ON r.id = u.role_id WHERE mail = ?`,
      [mail]
    );
    return rows[0];
  }
  // The U of CRUD - Update operation

  async update(
    firstname,
    lastname,
    mail,
    pseudo,
    password,
    birthdate,
    weight,
    weekTimeKitchen,
    id
  ) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET firstname=?, lastname=?, mail=?, pseudo=?, password=?,birthdate=?, weight=?, week_time_kitchen=? WHERE id = ?`,
      [
        firstname,
        lastname,
        mail,
        pseudo,
        password,
        birthdate,
        weight,
        weekTimeKitchen,
        id,
      ]
    );
    return result.affectedRows;
  }

  async updateRole(id, roleID) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET role_id=? WHERE id=?`,
      [roleID, id]
    );
    return result.affectedRows;
  }

  async updateAnonymous(id) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET firstname= 'anonymous', lastname= 'anonymous', birthdate = '1900-01-01', pseudo= 'anonymous', mail= ?, password='anonymous', week_time_kitchen='999', weight='999', role_id=1 WHERE id=?`,
      [`anonymous${id}@anonymous.fr`, id]
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
