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
    // await database.query("delete recipe");
    // await database.query("delete FROM recipe");
    // await database.query("delete FROM ingredient");

    // Insert fake data into the 'recipe' table
    // for (let i = 0; i < 10; i += 1) {
    //   queries.push(
    //     database.query(
    //       "INSERT INTO recipe (title, cooking_time, preparation_time, difficulty, image) VALUES (?, ?, ?, ?, ?)",
    //       [
    //         faker.lorem.word(),
    //         faker.number.int({ min: 1, max: 100 }),
    //         faker.number.int({ min: 1, max: 120 }),
    //         faker.number.int({ min: 1, max: 5 }),
    //         faker.image.food(),
    //       ]
    //     )
    //   );
    // }

    for (let i = 0; i < 40; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO recipe (title, cooking_time, preparation_time, difficulty, image) VALUES (?, ?, ?, ?, ?)",
          [
            faker.lorem.word(),
            faker.number.int({ min: 1, max: 100 }),
            faker.number.int({ min: 1, max: 120 }),
            faker.number.int({ min: 1, max: 3 }),
            faker.image.urlLoremFlickr({ category: "cat" }),
          ]
        )
      );
    }

    for (let i = 0; i < 400; i += 1) {
      queries.push(
        database.query("INSERT INTO step (text, recipe_id) VALUES (?, ?)", [
          faker.lorem.words(30),
          faker.number.int({ min: 1, max: 40 }),
        ])
      );
    }

    await database.query(
      "INSERT INTO unit (name, mesure_unit) VALUES ('solid', 'g kg cac cas'),('liquid','cl dc l cac cas')"
    );

    // Insert fake data into the 'ingredient' table
    await database.query(
      "INSERT INTO ingredient (name, calories, fat, sugar, protein, unit_id) VALUES ('Tomate', 18, 1, 4, 1, 1),('Oignon', 40, 1, 9, 1, 1),('Poivron rouge', 31, 1, 5, 1, 1),('Poulet cuit', 165, 3, 0, 31, 1), ('Pâtes', 220, 1, 43, 8, 1), ('Huile d/olive', 120, 13, 0, 0, 2),('Sel', 0, 0, 0, 0, 1), ('Poivre', 0, 0, 0, 0, 1), ('Ail', 4, 0, 1, 0, 1), ('Cumin', 8, 0, 0, 0, 1), ('Laitue', 5, 0, 1, 0, 1), ('Poisson', 206, 11, 0, 22, 1), ('Riz', 130, 0, 28, 2, 1), ('Haricots noirs', 114, 0, 20, 7, 1), ('Œuf', 68, 4, 0, 5, 1), ('Fromage râpé', 110, 9, 1, 7, 1), ('Avocat', 160, 14, 2, 2, 1), ('Crevettes', 99, 0, 0, 24, 1), ('Brocoli', 55, 0, 11, 4, 1), ('Carotte', 41, 0, 10, 1, 1),('Yaourt nature', 59, 3, 4, 3, 1), ('Lentilles ', 230, 0, 39, 18, 1), ('Champignons', 22, 0, 1, 3, 1), ('Saumon', 206, 13, 0, 22, 1), ('Chou-fleur', 29, 0, 5, 2, 1), ('Citron', 29, 0, 9, 1, 1), ('Cerises', 50, 0, 12, 1, 1), ('Miel', 304, 0, 82, 0, 1),('Pomme', 52, 0, 14, 0, 1), ('Pomme de terre', 93, 0, 21, 2, 1), ('Poulet', 165, 3, 0, 31, 1), ('Pois chiches', 164, 2, 27, 8, 1), ('Thon en conserve', 115, 0, 0, 26, 1),('Quinoa', 120, 1, 21, 4, 1), ('Ananas', 50, 0, 13, 0, 1), ('Fraise', 32, 0, 7, 0, 1), ('Beurre', 717, 81, 0, 1, 1), ('Raisins secs', 299, 0, 79, 2, 1), ('Noix', 654, 65, 6, 15, 1),('Crème fraîche', 340, 35, 2, 2, 2), ('Sirop d/érable', 260, 0, 67, 0, 2), ('Cacao en poudre', 12, 0, 0, 1, 1), ('Chocolat noir', 546, 31, 61, 7, 1), ('Moutarde', 66, 3, 6, 3, 2), ('Vinaigre balsamique', 88, 0, 17, 0, 2), ('Crabe', 84, 0, 0, 18, 1),('Gingembre', 80, 0, 17, 1, 1), ('Patate douce', 90, 0, 21, 2, 1), ('Asperges', 20, 0, 3, 2, 1), ('Courgette', 17, 0, 3, 1, 1), ('Sauce soja', 61, 0, 10, 6, 2), ('Câpres', 3, 0, 0, 0, 1)"
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
