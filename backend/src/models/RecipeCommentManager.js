const AbstractManager = require("./AbstractManager");

class RecipeCommentManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "comments" as configuration
    super({ table: "recipe_comment" });
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
