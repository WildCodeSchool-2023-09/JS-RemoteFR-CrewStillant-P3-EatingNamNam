const AbstractManager = require("./AbstractManager");

class RecipeCommentManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "comments" as configuration
    super({ table: "recipe_comment" });
  }

  async readByUserID(id) {
    const [rows] = await this.database.query(
      `SELECT rc.id, r.title, c.content AS comment FROM {this.database} JOIN recipe AS r ON r.id = rc.recipe_id JOIN comment AS c ON c.id = rc.comment_id WHERE rc.user_id=?`,
      [id]
    );
    return rows;
  }

  async create(commentID, userID, recipeID) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (comment_id, user_id, recipe_id) VALUES (?,?,?)`,
      [commentID, userID, recipeID]
    );
    return result.insertId;
  }
}

module.exports = RecipeCommentManager;
