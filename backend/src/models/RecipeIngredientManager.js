const AbstractManager = require("./AbstractManager");

class IngredientRecipeManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "item" as configuration
    super({ table: "ingredient_recipe" });
  }

  // The C of CRUD - Create operation

  async create(recipeId, ingredientRecipe) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (quantity, mesure_unit_recipe, recipe_id, ingredient_id) VALUES (?, ?, ?, ?)`,
      [
        ingredientRecipe.quantity,
        ingredientRecipe.mesure_unit,
        recipeId,
        ingredientRecipe.id,
      ]
    );
    return result.insertId;
  }
}

module.exports = IngredientRecipeManager;
