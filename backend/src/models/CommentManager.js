const AbstractManager = require("./AbstractManager");

class CommentManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "comments" as configuration
    super({ table: "comment" });
  }

  // The C of CRUD - Create operation

  async create(content) {
    // Execute the SQL INSERT query to add a new comment to the "comments" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (text) VALUES (?)`,
      [content]
    );
    // Return the ID of the newly inserted comment
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific comment by its ID
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    // Return the first row of the result, which represents the comment
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all comments from the "comments" table
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    // Return the array of items
    return rows;
  }

  async readByRecipe(recipeID) {
    const [rows] = await this.database.query(
      `SELECT comment.* FROM ${this.table} JOIN recipe_comment AS rc ON rc.comment_id = comment.id JOIN recipe ON recipe.id = rc.recipe_id WHERE recipe_id = ?`,
      [recipeID]
    );
    return rows;
  }

  // The U of CRUD - Update operation
  async update(comment, id) {
    // Execute the SQL SELECT query to modify a specific comment by its ID
    const [result] = await this.database.query(
      `ALTER TABLE ${this.table} SET comment=? WHERE id=?`,
      [comment, id]
    );

    return result.affectedRows;
  }
  // The D of CRUD - Delete operation

  async delete(id) {
    // Execute the SQL SELECT query to delete a specific comment by its ID
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id=?`,
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = CommentManager;
