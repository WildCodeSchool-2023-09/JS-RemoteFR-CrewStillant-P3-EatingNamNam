-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2023-12-20 13:22:36.059

-- tables
-- Table: comment
CREATE TABLE comment (
    id int  NOT NULL AUTO_INCREMENT,
    text varchar(255)  NOT NULL,
    CONSTRAINT comment_pk PRIMARY KEY (id)
);

-- Table: favoriteRecipe_user
CREATE TABLE favoriteRecipe_user (
    id int  NOT NULL AUTO_INCREMENT,
    user_id int  NOT NULL,
    recipe_id int  NOT NULL,
    CONSTRAINT favoriteRecipe_user_pk PRIMARY KEY (id)
);

-- Table: ingredient
CREATE TABLE ingredient (
    id int  NOT NULL AUTO_INCREMENT,
    name varchar(150)  NOT NULL,
    calories int  NOT NULL,
    fat int  NOT NULL,
    sugar int  NOT NULL,
    protein int  NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: ingredient_recipe
CREATE TABLE ingredient_recipe (
    id int  NOT NULL AUTO_INCREMENT,
    quantity int  NOT NULL,
    recipe_id int  NOT NULL,
    Ingredient_id int  NOT NULL,
    CONSTRAINT ingredient_recipe_pk PRIMARY KEY (id)
);

-- Table: recipe
CREATE TABLE recipe (
    id int  NOT NULL AUTO_INCREMENT,
    title varchar(150)  NOT NULL,
    cooking_time int  NOT NULL,
    preparation_time int  NOT NULL,
    difficulty int  NOT NULL,
    image varchar(255)  NOT NULL,
    CONSTRAINT recipe_pk PRIMARY KEY (id)
);

-- Table: recipe_comment
CREATE TABLE recipe_comment (
    id int  NOT NULL AUTO_INCREMENT,
    comment_id int  NOT NULL,
    user_id int  NOT NULL,
    recipe_id int  NOT NULL,
    CONSTRAINT recipe_comment_pk PRIMARY KEY (id)
);

-- Table: recipe_user
CREATE TABLE recipe_user (
    id int  NOT NULL AUTO_INCREMENT,
    Recipe_id int  NOT NULL,
    User_id int  NOT NULL,
    CONSTRAINT recipe_user_pk PRIMARY KEY (id)
);

-- Table: role
CREATE TABLE role (
    id int  NOT NULL AUTO_INCREMENT,
    type varchar(150)  NOT NULL,
    CONSTRAINT role_pk PRIMARY KEY (id)
);

-- Table: step
CREATE TABLE step (
    id int  NOT NULL AUTO_INCREMENT,
    text TEXT  NOT NULL,
    recipe_id int  NOT NULL,
    CONSTRAINT step_pk PRIMARY KEY (id)
);

-- Table: success
CREATE TABLE success (
    id int  NOT NULL AUTO_INCREMENT,
    name varchar(150)  NOT NULL,
    CONSTRAINT success_pk PRIMARY KEY (id)
);

-- Table: success_user
CREATE TABLE success_user (
    id int  NOT NULL AUTO_INCREMENT,
    User_id int  NOT NULL,
    Success_id int  NOT NULL,
    CONSTRAINT success_user_pk PRIMARY KEY (id)
);

-- Table: unit
CREATE TABLE unit (
    id int  NOT NULL AUTO_INCREMENT,
    name varchar(50)  NOT NULL,
    mesure_unit varchar(255)  NOT NULL,
    CONSTRAINT unit_pk PRIMARY KEY (id)
);

-- Table: unit_ingredient
CREATE TABLE unit_ingredient (
    id int  NOT NULL AUTO_INCREMENT,
    ingredient_id int  NOT NULL,
    unit_id int  NOT NULL,
    CONSTRAINT unit_ingredient_pk PRIMARY KEY (id)
);

-- Table: user
CREATE TABLE user (
    id int  NOT NULL AUTO_INCREMENT,
    firstname varchar(150)  NOT NULL,
    lastname varchar(150)  NOT NULL,
    birthdate date  NOT NULL,
    pseudo varchar(50)  NOT NULL,
    mail varchar(255)  NOT NULL UNIQUE,
    password varchar(255)  NOT NULL,
    week_time_kitchen int  NOT NULL,
    weight int  NOT NULL,
    registration_date DATETIME NOT NULL DEFAULT NOW(),
    role_id int  NOT NULL DEFAULT 1,
    CONSTRAINT user_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: Recipe_ingredient_list (table: recipe)

-- Reference: Table_13_Success (table: success_user)
ALTER TABLE success_user ADD CONSTRAINT Table_13_Success FOREIGN KEY Table_13_Success (Success_id)
    REFERENCES success (id);

-- Reference: Table_13_User (table: success_user)
ALTER TABLE success_user ADD CONSTRAINT Table_13_User FOREIGN KEY Table_13_User (User_id)
    REFERENCES user (id);

-- Reference: User_Role (table: user)
ALTER TABLE user ADD CONSTRAINT User_Role FOREIGN KEY User_Role (role_id)
    REFERENCES role (id);

-- Reference: favoriteRecipe_user_Recipe (table: favoriteRecipe_user)
ALTER TABLE favoriteRecipe_user ADD CONSTRAINT favoriteRecipe_user_Recipe FOREIGN KEY favoriteRecipe_user_Recipe (recipe_id)
    REFERENCES recipe (id);

-- Reference: favoriteRecipe_user_User (table: favoriteRecipe_user)
ALTER TABLE favoriteRecipe_user ADD CONSTRAINT favoriteRecipe_user_User FOREIGN KEY favoriteRecipe_user_User (user_id)
    REFERENCES user (id);

-- Reference: ingredient_list_Ingredient (table: ingredient_recipe)
ALTER TABLE ingredient_recipe ADD CONSTRAINT ingredient_list_Ingredient FOREIGN KEY ingredient_list_Ingredient (Ingredient_id)
    REFERENCES ingredient (id);

-- Reference: recipe_comment_Comment (table: recipe_comment)
ALTER TABLE recipe_comment ADD CONSTRAINT recipe_comment_Comment FOREIGN KEY recipe_comment_Comment (comment_id)
    REFERENCES comment (id);

-- Reference: recipe_comment_Recipe (table: recipe_comment)
ALTER TABLE recipe_comment ADD CONSTRAINT recipe_comment_Recipe FOREIGN KEY recipe_comment_Recipe (recipe_id)
    REFERENCES recipe (id);

-- Reference: recipe_comment_User (table: recipe_comment)
ALTER TABLE recipe_comment ADD CONSTRAINT recipe_comment_User FOREIGN KEY recipe_comment_User (user_id)
    REFERENCES user (id);

-- Reference: recipe_user_Recipe (table: recipe_user)
ALTER TABLE recipe_user ADD CONSTRAINT recipe_user_Recipe FOREIGN KEY recipe_user_Recipe (Recipe_id)
    REFERENCES recipe (id);

-- Reference: recipe_user_User (table: recipe_user)
ALTER TABLE recipe_user ADD CONSTRAINT recipe_user_User FOREIGN KEY recipe_user_User (User_id)
    REFERENCES user (id);

-- Reference: step_recipe (table: step)
ALTER TABLE step ADD CONSTRAINT step_recipe FOREIGN KEY step_recipe (recipe_id)
    REFERENCES recipe (id);

-- Reference: unit_ingredient_ingredient (table: unit_ingredient)
ALTER TABLE unit_ingredient ADD CONSTRAINT unit_ingredient_ingredient FOREIGN KEY unit_ingredient_ingredient (ingredient_id)
    REFERENCES ingredient (id);

-- Reference: unit_ingredient_unit (table: unit_ingredient)
ALTER TABLE unit_ingredient ADD CONSTRAINT unit_ingredient_unit FOREIGN KEY unit_ingredient_unit (unit_id)
    REFERENCES unit (id);

-- End of file.