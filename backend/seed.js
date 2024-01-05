/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
const { faker } = require("@faker-js/faker");

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // Optional: Truncate tables (remove existing data)

    // await database.query("truncate recipe");
    // await database.query("truncate ingredient");
    // await database.query("truncate ingredient_recipe");

    // Insert fake data into the 'recipe' table
    for (let i = 0; i < 50; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO recipe (title, cooking_time, preparation_time, difficulty, image) VALUES (?, ?, ?, ?, ?)",
          [
            faker.lorem.word(),
            faker.number.int({ min: 1, max: 100 }),
            faker.number.int({ min: 1, max: 120 }),
            faker.number.int({ min: 1, max: 3 }),
            faker.image.food(),
          ]
        )
      );
    }

    // Insert fake data into the 'ingredient' table
    await database.query(
      "INSERT INTO ingredient (name, calories, fat, sugar, protein) VALUES ('Tomate', 18, 0.2, 3.9, 0.9), ('Oignon', 40, 0.1, 9.3, 1.1), ('Poivron rouge', 31, 0.3, 5.3, 1.3), ('Poulet cuit', 165, 3.6, 0, 31), ('Pâtes cuites', 220, 1.3, 43.2, 8), ('Huile d/olive', 120, 13.5, 0, 0),('Sel', 0, 0, 0, 0), ('Poivre', 0, 0, 0, 0), ('Ail', 4, 0, 1, 0.2), ('Cumin', 8, 0.5, 0.9, 0.4), ('Laitue', 5, 0.1, 1, 0.5), ('Poisson', 206, 11.4, 0, 22), ('Riz cuit', 130, 0.3, 28.7, 2.7), ('Haricots noirs', 114, 0.5, 20.4, 7.6), ('Œuf', 68, 4.8, 0.6, 5.5), ('Fromage râpé', 110, 9, 1, 7), ('Avocat', 160, 14.7, 2, 2), ('Crevettes', 99, 0.3, 0, 24), ('Brocoli', 55, 0.6, 11.2, 4.2), ('Carotte', 41, 0.2, 10, 1),('Yaourt nature', 59, 3.3, 4.7, 3.5), ('Lentilles ', 230, 0.8, 39.9, 18), ('Champignons', 22, 0.3, 1, 3.1), ('Saumon', 206, 13, 0, 22), ('Chou-fleur', 29, 0.3, 5, 2), ('Citron', 29, 0.3, 9, 1.1), ('Cerises', 50, 0.3, 12, 1), ('Miel', 304, 0, 82.1, 0.3),('Pomme', 52, 0.2, 14, 0.3), ('Pomme de terre cuite', 93, 0.2, 21, 2), ('Poulet cru', 165, 3.6, 0, 31), ('Pois chiches', 164, 2.6, 27.4, 8.9), ('Thon en conserve', 115, 0.5, 0, 26),('Quinoa', 120, 1.9, 21.3, 4), ('Ananas', 50, 0.1, 13.1, 0.5), ('Fraise', 32, 0.3, 7.7, 0.7), ('Beurre', 717, 81, 0, 1), ('Raisins secs', 299, 0.5, 79.2, 2.5), ('Noix', 654, 65, 6, 15),('Crème fraîche', 340, 35, 2, 2), ('Sirop d/érable', 260, 0, 67, 0), ('Cacao en poudre', 12, 0.5, 0.9, 1.5), ('Chocolat noir', 546, 31, 61, 7), ('Moutarde', 66, 3.4, 6, 3), ('Vinaigre balsamique', 88, 0, 17, 0), ('Crabe cuit', 84, 0.9, 0, 18),('Gingembre', 80, 0.8, 17.8, 1.8), ('Patate douce cuite', 90, 0.2, 21, 2), ('Asperges cuites', 20, 0.2, 3.7, 2.2), ('Courgette cuite', 17, 0.3, 3.1, 1.2), ('Sauce soja', 61, 0.1, 10, 6), ('Câpres', 3, 0.1, 0.9, 0.3)"
    );

    // Insert fake data into the 'ingredient_recipe' table
    for (let i = 0; i < 50; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO ingredient_recipe (quantity, recipe_id, Ingredient_id) VALUES (?, ?, ?)",
          [
            faker.number.int({ min: 1, max: 50 }),
            faker.number.int({ min: 1, max: 50 }),
            faker.number.int({ min: 1, max: 50 }),
          ]
        )
      );
    }

    // Insert fake data into the 'step' table
    for (let i = 0; i < 50; i += 1) {
      queries.push(
        database.query("INSERT INTO step (text, recipe_id) VALUES (?, ?)", [
          faker.lorem.words(30),
          faker.number.int({ min: 1, max: 50 }),
        ])
      );
    }

    // Insert fake data into the 'comment' table
    for (let i = 0; i < 50; i += 1) {
      queries.push(
        database.query("INSERT INTO comment (text) VALUES (?)", [
          faker.lorem.words(20),
        ])
      );
    }

    await database.query("INSERT INTO role (type)VALUES ('member'), ('admin')");

    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
