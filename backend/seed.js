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
    await database.query("delete FROM recipe");
    await database.query("delete FROM ingredient");

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
            faker.number.int({ min: 1, max: 5 }),
            faker.image.food(),
          ]
        )
      );
    }

    await database.query(
      "INSERT INTO unit (name, mesure_unit) VALUES ('solid','g kg pinch'), ('liquid','cL dL L cac cas')"
    );

    for (let i = 0; i < 40; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO ingredient (name, calories, fat, sugar, protein, unit_id) VALUES (?, ?, ?, ?, ?, ?)",
          [
            faker.lorem.word(),
            faker.number.int({ min: 1, max: 500 }),
            faker.number.int({ min: 1, max: 120 }),
            faker.number.int({ min: 1, max: 120 }),
            faker.number.int({ min: 1, max: 120 }),
            faker.number.int({ min: 1, max: 2 }),
          ]
        )
      );
    }

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
