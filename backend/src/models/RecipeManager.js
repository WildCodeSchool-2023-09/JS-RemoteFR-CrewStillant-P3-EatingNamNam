const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "item" });
  }

  // The C of CRUD - Create operation
  // The Rs of CRUD - Read operations
  // The U of CRUD - Update operation
  // The D of CRUD - Delete operation
}

module.exports = ItemManager;
