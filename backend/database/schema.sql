CREATE TABLE `success` (
  `id` INT AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE `role`(
  `id` INT AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE `ingredient` (
  `id` INT AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `nutritional_value` VARCHAR(255) NOT NULL,
  `international_unit` VARCHAR(50) NOT NULL,
  `imperial_unit` VARCHAR(50) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE `comment`(
  `id` INT AUTO_INCREMENT,
  `content` TEXT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE `recipe` (
  `id` INT AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `publication_date` DATE NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `note` INT,
  `nb_of_portions` INT NOT NULL,
  `difficulty` INT NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `preparation_time` INT NOT NULL,
  `cooking_time` INT NOT NULL,
  `steps` TEXT NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE `ingredient_recipe` (
  `id` INT AUTO_INCREMENT,
  recipe_id INT, 
  ingredient_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY(ingredient_id) REFERENCES ingredient(id),
  FOREIGN KEY(recipe_id) REFERENCES recipe(id)
);

CREATE TABLE `user` (
  `id` INT AUTO_INCREMENT,
  `firstname` VARCHAR(150) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `pseudo` VARCHAR(50) NOT NULL,
  `password` VARCHAR(50) NOT NULL, 
  `sexe` VARCHAR(50) NOT NULL,
  `weight` INT NOT NULL,
  `age` INT NOT NULL,
  `week_time_kitchen` INT NOT NULL,
  `creation_date` DATE,
  role_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY(role_id) REFERENCES role(id)
);

CREATE TABLE `recipe_comment` (
  `id` INT AUTO_INCREMENT,
  comment_id INT,
  user_id INT,
  recipe_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY(user_id) REFERENCES user(id),
  FOREIGN KEY(recipe_id) REFERENCES recipe(id),
  FOREIGN KEY(comment_id) REFERENCES comment(id)
);

CREATE TABLE `favorite_recipe_user` (
  `id` INT AUTO_INCREMENT,
  user_id INT,
  recipe_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY(user_id) REFERENCES user(id),
  FOREIGN KEY(recipe_id) REFERENCES recipe(id)
);

CREATE TABLE `recipe_user` (
  `id` INT AUTO_INCREMENT,
  user_id INT,
  recipe_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY(user_id) REFERENCES user(id),
  FOREIGN KEY(recipe_id) REFERENCES recipe(id)
  );

CREATE TABLE `user_success` (
  `id` INT AUTO_INCREMENT,
  user_id INT,
  success_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY(user_id) REFERENCES user(id),
  FOREIGN KEY(success_id) REFERENCES success(id)
);