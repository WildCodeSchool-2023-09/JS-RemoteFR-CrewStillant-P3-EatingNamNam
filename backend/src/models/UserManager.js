const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "users" as configuration
    super({ table: "users" });
  }

  // The C of CRUD - Create operation
  // The Rs of CRUD - Read operations
  // The U of CRUD - Update operation
  // The D of CRUD - Delete operation
}

module.exports = UserManager;
