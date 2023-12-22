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
    await database.query("truncate item");

    // Insert fake data into the 'item' table
    for (let i = 0; i < 10; i += 1) {
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

    for (let i = 0; i < 10; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO ingredient (title, cooking_time, preparation_time, difficulty, image) VALUES (?, ?, ?, ?, ?)",
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
