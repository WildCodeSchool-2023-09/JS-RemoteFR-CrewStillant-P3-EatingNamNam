const AbstractManager = require("./AbstractManager");

class RecipeCommentManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "comments" as configuration
    super({ table: "recipe_comment" });
  }

  async read(id) {
    const [rows] = await this.database.query(`SELECT `[id]);
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

// const ingredients = await tables.ingredient_recipe.read(parseInt(id, 10));
// const comments = await tables.recipe_comment.read(parseInt(id, 10));
// const steps = await tables.step.read(parseInt(id, 10));
