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
    await database.query(
      "INSERT INTO recipe (title, cooking_time, preparation_time, difficulty, image, type) VALUES ('Poulet au Curry', 30, 15, 2, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'fat'), ('Salade de Quinoa', 45, 20, 3, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'healthy'), ('Soupe aux légumes', 45, 20, 3, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'healthy'), ('Lasagnes au Bœuf', 40, 25, 2, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'fat'), ('Saumon Grillé', 55, 10, 1, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'healty'), ('Risotto aux Champignons', 70, 35, 3, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'light'), ('Burger Végétarien', 25, 12, 1, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'fat'), ('Pâtes Carbonara', 50, 18, 2, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'healthy'), ('Salade César', 65, 30, 3, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'light'), ('Tacos au Poulet', 35, 20, 1, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'fat'), ('Pizza Margherita', 60, 25, 2, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'healthy'), ('Crevettes à l/Ail', 60, 25, 2, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'light'), ('Tajine de Poulet', 28, 15, 1, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'fat'), ('Salmon Poke Bowl', 48, 22, 2, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'healthy'), ('Wraps au Thon', 63, 28, 3, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'light'), ('Ratatouille Provençale', 42, 30, 1, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'fat'), ('Poulet Teriyaki', 55, 18, 2, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'healthy'), ('Salade de Lentilles', 68, 35, 3, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'light'), ('Galette de Pommes de Terre', 32, 14, 1, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'fat'), ('Poisson Grillé', 52, 20, 2, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'healthy'), ('Riz Cantonais', 70, 32, 3, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'light'), ('Quiche Lorraine', 38, 18, 1, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'fat'), ('Spaghetti Bolognese', 58, 25, 2, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'healthy'), ('Couscous aux Légumes', 73, 40, 3, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'light'), ('Poulet au Citron', 45, 22, 1, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'fat'), ('Salade de Fruits de Mer', 60, 28, 2, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'healthy'), ('Steak de Thon', 75, 42, 3, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'light'), ('Fajitas au Bœuf', 30, 15, 1, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'fat'), ('Chili Con Carne', 50, 20, 2, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'healthy'), ('Poulet au Curry Coco', 65, 35, 3, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'light'), ('Pâtes à la Carbonara', 40, 18, 1, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'fat'), ('Salade Grecque', 55, 25, 2, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'healthy'), ('Poke Bowl au Saumon', 70, 40, 3, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'light'),('Tarte aux Légumes', 35, 15, 1, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'fat'), ('Crevettes à la Créole', 48, 22, 2, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'healthy'), ('Hachis Parmentier', 62, 30, 3, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'light'),  ('Brochettes de Poulet', 25, 12, 1, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'fat'), ('Salmon Avocado Roll', 50, 20, 2, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'healthy'), ('Poulet au Paprika', 65, 32, 3, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'light'),  ('Gratin de Pommes de Terre', 38, 15, 1, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'fat'), ('Penne Arrabiata', 58, 28, 2, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'healthy'), ('Curry de Légumes', 73, 40, 3, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'light'), ('Omelette aux Champignons', 42, 22, 1, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'fat'), ('Tagliatelles au Saumon', 55, 25, 2, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'healthy'), ('Tagliatelles au champignons', 55, 25, 2, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'light'), ('Poulet au Citron Vert', 30, 14, 1, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'fat'), ('Tacos aux Crevettes', 52, 22, 2, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'healthy'), ('Risotto aux Asperges', 67, 38, 3, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'light'), ('Pizza Végétalienne', 40, 18, 1, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'fat'), ('Poulet aux Herbes', 55, 30, 2, 'https://t3.ftcdn.net/jpg/02/60/12/88/360_F_260128861_Q2ttKHoVw2VrmvItxyCVBnEyM1852MoJ.jpg', 'healthy')"
    );

    // Insert fake data into the 'ingredient' table
    await database.query(
      "INSERT INTO ingredient (name, calories, fat, sugar, protein) VALUES ('Tomate', 18, 1, 4, 1), ('Oignon', 40, 1, 9, 1), ('Poivron rouge', 31, 1, 5, 1), ('Poulet cuit', 165, 3, 0, 31), ('Pâtes', 220, 1, 43, 8), ('Huile d/olive', 120, 13, 0, 0),('Sel', 0, 0, 0, 0), ('Poivre', 0, 0, 0, 0), ('Ail', 4, 0, 1, 0), ('Cumin', 8, 0, 0, 0), ('Laitue', 5, 0, 1, 0), ('Poisson', 206, 11, 0, 22), ('Riz', 130, 0, 28, 2), ('Haricots noirs', 114, 0, 20, 7), ('Œuf', 68, 4, 0, 5), ('Fromage râpé', 110, 9, 1, 7), ('Avocat', 160, 14, 2, 2), ('Crevettes', 99, 0, 0, 24), ('Brocoli', 55, 0, 11, 4), ('Carotte', 41, 0, 10, 1),('Yaourt nature', 59, 3, 4, 3), ('Lentilles ', 230, 0, 39, 18), ('Champignons', 22, 0, 1, 3), ('Saumon', 206, 13, 0, 22), ('Chou-fleur', 29, 0, 5, 2), ('Citron', 29, 0, 9, 1), ('Cerises', 50, 0, 12, 1), ('Miel', 304, 0, 82, 0),('Pomme', 52, 0, 14, 0), ('Pomme de terre', 93, 0, 21, 2), ('Poulet', 165, 3, 0, 31), ('Pois chiches', 164, 2, 27, 8), ('Thon en conserve', 115, 0, 0, 26),('Quinoa', 120, 1, 21, 4), ('Ananas', 50, 0, 13, 0), ('Fraise', 32, 0, 7, 0), ('Beurre', 717, 81, 0, 1), ('Raisins secs', 299, 0, 79, 2), ('Noix', 654, 65, 6, 15),('Crème fraîche', 340, 35, 2, 2), ('Sirop d/érable', 260, 0, 67, 0), ('Cacao en poudre', 12, 0, 0, 1), ('Chocolat noir', 546, 31, 61, 7), ('Moutarde', 66, 3, 6, 3), ('Vinaigre balsamique', 88, 0, 17, 0), ('Crabe', 84, 0, 0, 18),('Gingembre', 80, 0, 17, 1), ('Patate douce', 90, 0, 21, 2), ('Asperges', 20, 0, 3, 2), ('Courgette', 17, 0, 3, 1), ('Sauce soja', 61, 0, 10, 6), ('Câpres', 3, 0, 0, 0)"
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
