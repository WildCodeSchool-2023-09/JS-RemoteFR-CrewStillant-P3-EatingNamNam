-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2023-12-20 13:22:36.059

-- tables
-- Table: comment
CREATE TABLE comment (
    id int  NOT NULL AUTO_INCREMENT,
    content TEXT NOT NULL,
    CONSTRAINT comment_pk PRIMARY KEY (id)
);

CREATE TABLE contact (
    id INT  NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email varchar(255)  NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT NOW(),
    CONSTRAINT id PRIMARY KEY (id)
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
    name varchar(150)  NOT NULL UNIQUE,
    calories int  NOT NULL,
    fat int  NOT NULL,
    sugar int  NOT NULL,
    protein int  NOT NULL,
    unit_id int NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: ingredient_recipe
CREATE TABLE ingredient_recipe (
    id int  NOT NULL AUTO_INCREMENT,
    quantity int  NOT NULL,
    mesure_unit_recipe VARCHAR (10),
    recipe_id int  NOT NULL,
    ingredient_id int  NOT NULL,
    CONSTRAINT ingredient_recipe_pk PRIMARY KEY (id)
);

CREATE TABLE notation (
    id int  NOT NULL AUTO_INCREMENT,
    note int NOT NULL,
    recipe_id INT NOT NULL,
    user_id int NOT NULL,
        CONSTRAINT id PRIMARY KEY (id)

);

-- Table: recipe
CREATE TABLE recipe (
    id int  NOT NULL AUTO_INCREMENT,
    registration_date DATETIME NOT NULL DEFAULT NOW(),
    title varchar(150)  NOT NULL,
    cooking_time int  NOT NULL,
    preparation_time int  NOT NULL,
    difficulty int  NOT NULL,
    image varchar(255)  NOT NULL,
    type varchar(255) NOT NULL DEFAULT 'healthy',
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
    recipe_id int  NOT NULL,
    user_id int  NOT NULL,
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

-- Reference: unit_ingredient (table: ingredient)
ALTER TABLE ingredient ADD CONSTRAINT ingredient_unit FOREIGN KEY (unit_id) REFERENCES unit (id);
ALTER TABLE notation ADD CONSTRAINT notation_recipe FOREIGN KEY notation_recipe (recipe_id)
    REFERENCES recipe (id);

ALTER TABLE notation ADD CONSTRAINT notation_user FOREIGN KEY notation_user (User_id)
    REFERENCES user (id);


-- End of file.

INSERT INTO `role` (`type`) VALUES
	 ('member'),
	 ('admin'),
	 ('deleted');

INSERT INTO `user` (firstname,lastname,birthdate,pseudo,mail,password,week_time_kitchen,weight,registration_date,role_id) VALUES
	 ('Benoit','Redfish','1980-05-09','Splagadou','benoit@wcs.fr','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',5,78,'2024-01-26 01:32:45',2),
	 ('Albin','Hodkiewicz','1962-10-09','Larry81','Arnold2@yahoo.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',10,65,'2024-01-26 01:32:45',1),
	 ('Joanie','Johnston','1964-11-18','Maude.Gislason19','Vickie36@hotmail.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',4,61,'2024-01-26 01:32:45',1),
	 ('Jarvis','Shields','1991-11-26','Toni.Emmerich','Destiney_Kirlin64@yahoo.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',1,59,'2024-01-26 01:32:45',1),
	 ('Terrell','Wuckert','2005-12-04','Hazle.Medhurst','Gloria50@hotmail.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',6,79,'2024-01-26 01:32:45',1),
	 ('Tracey','Doyle','1962-04-14','Wayne_Gislason84','Abner5@gmail.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',8,76,'2024-01-26 01:32:45',1),
	 ('Louie','Metz-Denesik','1991-04-09','Cleora.Fadel45','Neha47@gmail.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',9,48,'2024-01-26 01:32:45',1),
	 ('Kelvin','Torphy','1978-01-18','Stephan_Predovic95','Devon_Ledner@hotmail.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',8,74,'2024-01-26 01:32:45',1),
	 ('Americo','Rogahn','1959-06-26','Willie.Reichert','Adolfo_Rogahn44@gmail.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',12,60,'2024-01-26 01:32:45',1),
	 ('Enola','Runte','2000-11-20','Johathan.McGlynn','Zachariah_Buckridge@hotmail.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',10,73,'2024-01-26 01:32:45',1);
INSERT INTO `user` (firstname,lastname,birthdate,pseudo,mail,password,week_time_kitchen,weight,registration_date,role_id) VALUES
	 ('Earl','Wyman','2001-09-20','Jonatan_Hirthe','Randy32@yahoo.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',4,93,'2024-01-26 01:32:45',1),
	 ('Cassidy','Gerlach','1985-11-10','Rowland83','Hubert.Ryan44@gmail.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',8,79,'2024-01-26 01:32:45',1),
	 ('Angel','Grady','1962-11-27','Everett95','Amos_Sipes@yahoo.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',11,54,'2024-01-26 01:32:45',1),
	 ('Nash','Hayes','1977-03-19','Axel8','Casey_Ratke@gmail.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',2,86,'2024-01-26 01:32:45',1),
	 ('Myrtle','Haley','1997-07-27','Georgette_Conroy45','Gonzalo59@gmail.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',5,47,'2024-01-26 01:32:45',1),
	 ('Cooper','O''Kon','1984-12-24','Hubert21','Alysha44@yahoo.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',8,79,'2024-01-26 01:32:45',1),
	 ('Darrel','Bode','1998-03-26','Jeanie.Feil','Enrico.Rodriguez@yahoo.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',9,65,'2024-01-26 01:32:45',1),
	 ('Dax','Schmitt','1965-01-25','Kian_Marquardt88','Consuelo.Hammes@hotmail.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',11,41,'2024-01-26 01:32:45',1),
	 ('Stewart','Carroll','1981-06-17','Georgianna.Johns64','Ibrahim_Nolan@yahoo.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',1,82,'2024-01-26 01:32:45',1),
	 ('Tania','Robel','1960-06-12','Michel22','Karl.Prosacco@gmail.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',3,76,'2024-01-26 01:32:45',1);
INSERT INTO `user` (firstname,lastname,birthdate,pseudo,mail,password,week_time_kitchen,weight,registration_date,role_id) VALUES
	 ('Lavada','Greenholt','1972-07-23','Riley_Parisian49','Marlon81@hotmail.com','$argon2id$v=19$m=19456,t=2,p=1$Eqsu+b8nB6U8p2WO0Olq8w$EyJ7lx8g8cJa/DVjo0l7+V3EUSME8oJaa2Kp86nwfyc',3,50,'2024-01-26 01:32:45',1);

INSERT INTO unit (name,mesure_unit) VALUES
	 ('solid','g kg cac cas pièce'),
	 ('liquid','cL dc L càc càs');

INSERT INTO ingredient (name,calories,fat,sugar,protein,unit_id) VALUES
	 ('Tomate',18,1,4,1,1),
	 ('Oignon',40,1,9,1,1),
	 ('Poivron rouge',31,1,5,1,1),
	 ('Poulet cuit',165,3,0,31,1),
	 ('Pâtes',220,1,43,8,1),
	 ('Huile d olive',120,13,0,0,2),
	 ('Sel',0,0,0,0,1),
	 ('Poivre',0,0,0,0,1),
	 ('Ail',4,0,1,0,1),
	 ('Cumin',8,0,0,0,1);
INSERT INTO ingredient (name,calories,fat,sugar,protein,unit_id) VALUES
	 ('Laitue',5,0,1,0,1),
	 ('raie',206,11,0,22,1),
	 ('Riz',130,0,28,2,1),
	 ('Haricots noirs',114,0,20,7,1),
	 ('Oeuf',68,4,0,5,1),
	 ('Fromage râpé',110,9,1,7,1),
	 ('Avocat',160,14,2,2,1),
	 ('Crevettes',99,0,0,24,1),
	 ('Brocoli',55,0,11,4,1),
	 ('Carotte',41,0,10,1,1);
INSERT INTO ingredient (name,calories,fat,sugar,protein,unit_id) VALUES
	 ('Yaourt nature',59,3,4,3,1),
	 ('Lentilles ',230,0,39,18,1),
	 ('Champignons',22,0,1,3,1),
	 ('Saumon',206,13,0,22,1),
	 ('Chou-fleur',29,0,5,2,1),
	 ('Citron',29,0,9,1,1),
	 ('Cerises',50,0,12,1,1),
	 ('Miel',304,0,82,0,1),
	 ('Pomme',52,0,14,0,1),
	 ('Pomme de terre',93,0,21,2,1);
INSERT INTO ingredient (name,calories,fat,sugar,protein,unit_id) VALUES
	 ('Poulet',165,3,0,31,1),
	 ('Pois chiches',164,2,27,8,1),
	 ('Thon en conserve',115,0,0,26,1),
	 ('Quinoa',120,1,21,4,1),
	 ('Ananas',50,0,13,0,1),
	 ('Fraise',32,0,7,0,1),
	 ('Beurre',717,81,0,1,1),
	 ('Raisins secs',299,0,79,2,1),
	 ('Noix',654,65,6,15,1),
	 ('Crème fraîche',340,35,2,2,2);
INSERT INTO ingredient (name,calories,fat,sugar,protein,unit_id) VALUES
	 ('Sirop d/érable',260,0,67,0,2),
	 ('Cacao en poudre',12,0,0,1,1),
	 ('Chocolat noir',546,31,61,7,1),
	 ('Moutarde',66,3,6,3,2),
	 ('Vinaigre balsamique',88,0,17,0,2),
	 ('Crabe',84,0,0,18,1),
	 ('Gingembre',80,0,17,1,1),
	 ('Patate douce',90,0,21,2,1),
	 ('Asperges',20,0,3,2,1),
	 ('Courgette',17,0,3,1,1);
INSERT INTO ingredient (name,calories,fat,sugar,protein,unit_id) VALUES
	 ('Sauce soja',61,0,10,6,2),
	 ('Vin blanc', 0,0,0,0,2),
	 ('Poudre curry',5,0,2,1,1),
	 ('Viande de boeuf haché',126,10,0,20,1),
	 ('Farine',344,1,71,10,1),
	 ('Lait',47,2,5,3,2),
	 ('Purée de tomate',27,0,5,1,1),
	 ('Câpres',3,0,0,0,1);

INSERT INTO recipe (registration_date,title,cooking_time,preparation_time,difficulty,image,`type`) VALUES
	 ('2024-01-26 01:32:45','Poulet au Curry',20,15,1,'https://img.freepik.com/photos-gratuite/curry-poulet-oignons-cuisine-indienne-cuisine-asiatique_2829-4415.jpg?w=1060&t=st=1704983141~exp=1704983741~hmac=f398628e97636fb81de03109ef5c1769a81b147a235c4b902d56a66fa77f36ae','light'),
	 ('2024-01-26 01:32:45','Salade de Quinoa',35,25,1,'https://img.freepik.com/photos-gratuite/salade-taboule_2829-10886.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','healthy'),
	 ('2024-01-26 01:32:45','Soupe aux légumes',50,25,3,'https://img.freepik.com/photos-gratuite/soupe-tomate-au-vert-table_140725-2447.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','healthy'),
	 ('2024-01-26 01:32:45','Lasagnes au Bœuf',65,40,2,'https://img.freepik.com/photos-gratuite/lasagne-traditionnelle-riche-sauce-bolognaise_60438-3536.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','fat'),
	 ('2024-01-26 01:32:45','Saumon Grillé',55,10,1,'https://img.freepik.com/photos-gratuite/poisson-grille-bouchent-decore-legumes_1303-12328.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','healty'),
	 ('2024-01-26 01:32:45','Risotto aux Champignons',70,35,3,'https://img.freepik.com/photos-gratuite/risotto-vegetarien-sain-garniture-persil-frais-genere-par-ia_24640-80365.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','light'),
	 ('2024-01-26 01:32:45','Burger',25,12,2,'https://img.freepik.com/photos-gratuite/burger-boeuf-grille-fromage-tomate-oignon-pain-rustique-genere-par-intelligence-artificielle_25030-63164.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=sph','fat'),
	 ('2024-01-26 01:32:45','Pâtes Carbonara',50,18,2,'https://img.freepik.com/photos-gratuite/spaghetti-sauce-bolognaise-table-boisxa_123827-22962.jpg?size=626&ext=jpg&ga=GA1.1.2106550799.1701789518&semt=ais','fat'),
	 ('2024-01-26 01:32:45','Salade César',30,25,2,'https://img.freepik.com/photos-gratuite/salade-plate-au-poulet-graines-sesame_23-2148700369.jpg?size=626&ext=jpg&ga=GA1.1.2106550799.1701789518&semt=ais','light'),
	 ('2024-01-26 01:32:45','Tacos au Poulet',35,20,1,'https://img.freepik.com/photos-gratuite/tacos-mexicains-au-boeuf-sauce-tomate-salsa_2829-14270.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','light');
INSERT INTO recipe (registration_date,title,cooking_time,preparation_time,difficulty,image,`type`) VALUES
	 ('2024-01-26 01:32:45','Pizza Margarita',60,25,3,'https://img.freepik.com/photos-gratuite/pizza_144627-39500.jpg?size=626&ext=jpg&ga=GA1.1.2106550799.1701789518&semt=ais','fat'),
	 ('2024-01-26 01:32:45','Crevettes à l Ail',25,13,2,'https://img.freepik.com/photos-gratuite/pions-frits-herbes-vertes-interieur-casserole-rouge_114579-3313.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','light'),
	 ('2024-01-26 01:32:45','Tajine de Poulet',35,25,3,'https://img.freepik.com/photos-gratuite/vue-laterale-poulet-cuit-oignons-verts-grenade-dans-plat-argile_141793-5116.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','fat'),
	 ('2024-01-26 01:32:45','Salmon Poke Bowl',25,10,2,'https://img.freepik.com/photos-gratuite/photographie-plat-poke-bowl-au-saumon_53876-108183.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','healthy'),
	 ('2024-01-26 01:32:45','Wraps au Thon',5,5,1,'https://img.freepik.com/photos-gratuite/wrap-au-poulet_144627-33297.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','light'),
	 ('2024-01-26 01:32:45','Ratatouille Provençale',42,30,3,'https://img.freepik.com/photos-gratuite/ratatouille-legumes-dans-poele-table-bois_2829-19906.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=sph','fat'),
	 ('2024-01-26 01:32:45','Poulet Teriyaki',55,18,3,'https://img.freepik.com/photos-gratuite/poulet-prepare-sauce-servi-tranches-citron_141793-1148.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','light'),
	 ('2024-01-26 01:32:45','Salade de Lentilles',25,35,1,'https://img.freepik.com/photos-gratuite/bol-bouddha-vegetarien-quinoa-tofu-legumes-frais-concept-aliments-sains-salade-vegetalienne_2829-6931.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','light'),
	 ('2024-01-26 01:32:45','Galette de Pommes de Terre',32,14,1,'https://img.freepik.com/photos-gratuite/vue-plat-du-delicieux-plat-tortillas-espagnoles_23-2150165668.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','fat'),
	 ('2024-01-26 01:32:45','Poisson Grillé',52,20,2,'https://img.freepik.com/photos-gratuite/poisson-grille-salade-legumes-orange_114579-3656.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','healthy');
INSERT INTO recipe (registration_date,title,cooking_time,preparation_time,difficulty,image,`type`) VALUES
	 ('2024-01-26 01:32:45','Riz Cantonais',36,13,2,'https://img.freepik.com/photos-gratuite/riz-cuit-vapeur-fruits-mer-calamary-cors-pois-carotte-vue-laterale_141793-3564.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','light'),
	 ('2024-01-26 01:32:45','Quiche Lorraine',40,18,2,'https://img.freepik.com/photos-gratuite/photographie-culinaire-concept-restaurant-tarte-aux-legumes-maison_176420-15970.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','fat'),
	 ('2024-01-26 01:32:45','Spaghetti Bolognese',45,25,2,'https://img.freepik.com/photos-gratuite/pates-italiennes-authentiques_24972-2334.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','fat'),
	 ('2024-01-26 01:32:45','Couscous aux Légumes',73,40,3,'https://img.freepik.com/photos-premium/nourriture-bresilienne-typique-haricots-tropeiro_434193-4340.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','light'),
	 ('2024-01-26 01:32:45','Poulet au Citron',45,22,3,'https://img.freepik.com/photos-gratuite/vue-dessus-du-diner-noel_23-2147716303.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','fat'),
	 ('2024-01-26 01:32:45','Salade de Fruits de Mer',15,5,2,'https://img.freepik.com/photos-gratuite/salade-plaque_1232-1296.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','healthy'),
	 ('2024-01-26 01:32:45','Steak de Thon',55,42,3,'https://img.freepik.com/photos-gratuite/graines-sesame-garnies-thon-cuit-salade-verte_1147-527.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','light'),
	 ('2024-01-26 01:32:45','Fajitas au Bœuf',30,15,1,'https://img.freepik.com/photos-gratuite/vue-laterale-croustilles-nachos-tortilla-viande-hachee-grillee-tomate-oignon-printemps-fromage-tomate-piment-jalapeno-creme-sure-dessus_141793-5032.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','fat'),
	 ('2024-01-26 01:32:45','Chili Con Carne',50,21,3,'https://img.freepik.com/photos-gratuite/repas-savoureux-arrangement-sambal_23-2149076154.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','healthy'),
	 ('2024-01-26 01:32:45','Sushi',65,35,3,'https://img.freepik.com/photos-gratuite/vue-laterale-sushis-sauce-soja-baguettes-dans-planche-service-bois_176474-3234.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=sph','light');
INSERT INTO recipe (registration_date,title,cooking_time,preparation_time,difficulty,image,`type`) VALUES
	 ('2024-01-26 01:32:45','Pâtes au pesto',15,9,1,'https://img.freepik.com/photos-gratuite/pates-penne-sauce-pesto-courgettes-petits-pois-basilic-nourriture-italienne_2829-5842.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','fat'),
	 ('2024-01-26 01:32:45','Gratin de courgette',55,25,2,'https://img.freepik.com/photos-gratuite/lasagne-aux-epinards_74190-523.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','healthy'),
	 ('2024-01-26 01:32:45','Tomate farcie',70,40,3,'https://img.freepik.com/photos-gratuite/vue-dessus-poivrons-cuits-surface-grise-nourriture-repas-legumes-dolma-boeuf_140725-74493.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','healthy'),
	 ('2024-01-26 01:32:45','Tarte aux Légumes',35,15,1,'https://img.freepik.com/photos-gratuite/photo-gros-plan-quiche-lorraine-classique-aux-tomates_176420-15965.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','light'),
	 ('2024-01-26 01:32:45','Crevettes à la Créole',48,22,2,'https://img.freepik.com/photos-gratuite/delicieux-plat-crevettes-high-angle_23-2148771282.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','healthy'),
	 ('2024-01-26 01:32:45','Hachis Parmentier',62,30,3,'https://img.freepik.com/photos-gratuite/delicieux-plat-empadao-traditionnel-portugais_23-2149862991.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','fat'),
	 ('2024-01-26 01:32:45','Falafel',25,8,2,'https://img.freepik.com/photos-gratuite/falafel-houmous-pita-plats-du-moyen-orient-arabes-nourriture-halal_2829-14339.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=sph','fat'),
	 ('2024-01-26 01:32:45','Nouilles',24,13,2,'https://img.freepik.com/photos-gratuite/vue-dessus-du-concept-delicieuses-nouilles_23-2148773774.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=sph','healthy'),
	 ('2024-01-26 01:32:45','Rôti de poulet',65,32,3,'https://img.freepik.com/photos-gratuite/table-noel-servie-dinde-decoree-guirlandes-lumineuses-bougies_2829-18829.jpg?size=626&ext=jpg&ga=GA1.1.2106550799.1701789518&semt=sph','light'),
	 ('2024-01-26 01:32:45','Gratin de Pommes de Terre',38,15,1,'https://img.freepik.com/photos-gratuite/casserole-vegetarienne-legumes-aux-courgettes-champignons-tomates-cerises_2829-11068.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','fat');
INSERT INTO recipe (registration_date,title,cooking_time,preparation_time,difficulty,image,`type`) VALUES
	 ('2024-01-26 01:32:45','Penne Arrabiata',58,28,2,'https://img.freepik.com/photos-gratuite/pates-sauce-tomate-servies-dans-bol_1220-7550.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','fat'),
	 ('2024-01-26 01:32:45','Curry de Légumes',73,40,3,'https://img.freepik.com/photos-gratuite/chili-poulet-saute-poivrons-tomates-carottes_1150-27209.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','light'),
	 ('2024-01-26 01:32:45','Omelette aux Champignons',12,8,1,'https://img.freepik.com/photos-gratuite/frittata-aux-champignons-courgettes-fromage_2829-8507.jpg?size=626&ext=jpg&ga=GA1.1.2106550799.1701789518&semt=ais','healthy'),
	 ('2024-01-26 01:32:45','Tagliatelles au Saumon',26,14,2,'https://img.freepik.com/photos-gratuite/penne-carbonara-au-saumon_74190-2783.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','healthy'),
	 ('2024-01-26 01:32:45','Tagliatelles au champignons',23,14,1,'https://img.freepik.com/photos-gratuite/vue-rapprochee-fettuccine-pates_23-2148305664.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','light'),
	 ('2024-01-26 01:32:45','Camembert rôti',30,5,1,'https://img.freepik.com/photos-gratuite/composition-delicieux-repas-cuisine-locale_23-2148833813.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','fat'),
	 ('2024-01-26 01:32:45','Magret de canard',52,22,3,'https://img.freepik.com/photos-gratuite/delicieuses-cailles-frites-aux-herbes-tomates-cerises_114579-65625.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','fat'),
	 ('2024-01-26 01:32:45','Risotto aux Asperges',67,38,3,'https://img.freepik.com/photos-gratuite/salade-legumes-mayyonaise-salee-savoureuse-interieur-plaque-blanche-fourchette-pain-pendant-journee_140725-14988.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','light'),
	 ('2024-01-26 01:32:45','Pizza Végétalienne',40,18,3,'https://img.freepik.com/photos-gratuite/composition-savoureuses-pizzas-traditionnelles_23-2148921364.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','fat'),
	 ('2024-01-26 01:32:45','Poulet aux Herbes',55,30,2,'https://img.freepik.com/photos-gratuite/poulet-au-four-garni-asperges-herbes_2829-11074.jpg?size=626&ext=jpg&ga=GA1.2.2106550799.1701789518&semt=ais','healthy');

INSERT INTO ingredient_recipe (quantity,mesure_unit_recipe,recipe_id,ingredient_id) VALUES
	 (400, 'g', 1, 31),
	 (200,'g',1,2),
	 (5, 'g', 1, 47),
	 (10, 'cL', 1, 52),
	 (10, 'g', 1, 53),
	 (500, 'g', 4,54),
	 (2,'pièce',4,2),
	 (80,'g',4,37),
	 (80,'g',4,55),
	 (1, 'L', 4,56),
	 (150,'g',4,20),
	 (400,'g', 4, 57),
	 (250,'g',4,5),
	 (2,'pièce',3,2),
	 (50,'g',3,46),
	 (2,'pièce',4,2),
	 (50,'g',2,46),
	 (2,'pièce',2,2),
	 (50,'g',2,46),
	 (120,'g',2,2),
	 (250,'g',3,3);
INSERT INTO ingredient_recipe (quantity,mesure_unit_recipe,recipe_id,ingredient_id) VALUES
	 (1,'pièce',2,4),
	 (1,'kg',5,5),
	 (28,'g',2,9),
	 (14,'cL',6,6),
	 (28,'g',15,9),
	 (1,'càc',7,7),
	 (5,'g',8,8),
	 (28,'g',9,9),
	 (28,'g',3,9),
	 (5,'g',10,10);
INSERT INTO ingredient_recipe (quantity,mesure_unit_recipe,recipe_id,ingredient_id) VALUES
	 (1,'pièce',11,11),
	 (1,'kg',12,12),
	 (300,'g',13,13),
	 (200,'g',14,14),
	 (1,'pièce',15,15),
	 (200,'g',16,16),
	 (1,'pièce',17,17),
	 (100,'g',18,18),
	 (1,'pièce',19,19),
	 (300,'g',20,20);
INSERT INTO ingredient_recipe (quantity,mesure_unit_recipe,recipe_id,ingredient_id) VALUES
	 (1,'pièce',21,21),
	 (200,'g',22,22),
	 (500,'g',23,23),
	 (150,'g',24,24),
	 (1,'pièce',25,25),
	 (1,'pièce',26,26),
	 (50,'g',27,27),
	 (1,'càs',28,28),
	 (2,'pièce',29,29),
	 (1,'kg',30,30);
INSERT INTO ingredient_recipe (quantity,mesure_unit_recipe,recipe_id,ingredient_id) VALUES
	 (1,'pièce',31,31),
	 (150,'g',32,32),
	 (100,'g',33,33),
	 (300,'g',34,34),
	 (1,'pièce',35,35),
	 (50,'g',36,36),
	 (50,'g',37,37),
	 (50,'g',38,38),
	 (75,'g',39,39),
	 (50,'g',40,40);
INSERT INTO ingredient_recipe (quantity,mesure_unit_recipe,recipe_id,ingredient_id) VALUES
	 (1,'càs',41,41),
	 (5,'càs',42,42),
	 (150,'g',43,43),
	 (1,'càs',44,44),
	 (5,'cL',45,45),
	 (50,'g',46,46),
	 (10,'g',47,47),
	 (1,'kg',48,48),
	 (100,'g',49,49),
	 (1,'kg',50,50);
INSERT INTO ingredient_recipe (quantity,mesure_unit_recipe,recipe_id,ingredient_id) VALUES
	 (10,'g',9,47),
	 (10,'g',38,47),
	 (10,'g',14,47),
	 (10,'g',12,47),
	 (10,'g',5,47),
	 (10,'g',2,47),
	 (10,'g',1,47);

INSERT INTO recipe_user (recipe_id,user_id) VALUES
	 (1,16),
	 (2,14),
	 (4,1),
	 (3,7),
	 (5,11),
	 (6,15),
	 (7,5),
	 (8,8),
	 (9,13),
	 (10,6);
INSERT INTO recipe_user (recipe_id,user_id) VALUES
	 (11,20),
	 (12,16),
	 (13,14),
	 (14,15),
	 (15,9),
	 (16,7),
	 (17,3),
	 (18,11),
	 (19,2),
	 (20,4);
INSERT INTO recipe_user (recipe_id,user_id) VALUES
	 (21,2),
	 (22,13),
	 (23,7),
	 (24,3),
	 (25,12),
	 (26,9),
	 (27,4),
	 (28,19),
	 (29,18),
	 (30,4);
INSERT INTO recipe_user (recipe_id,user_id) VALUES
	 (31,9),
	 (32,2),
	 (33,18),
	 (34,1),
	 (35,3),
	 (36,20),
	 (37,13),
	 (38,12),
	 (39,1),
	 (40,15);
INSERT INTO recipe_user (recipe_id,user_id) VALUES
	 (41,5),
	 (42,20),
	 (43,10),
	 (44,11),
	 (45,14),
	 (46,5),
	 (47,17),
	 (48,3),
	 (49,5),
	 (50,16);

INSERT INTO step (`text`,recipe_id) VALUES
	('Emincer les oignons et les réserver.',1 ),
	 ('Couper le poulet en morceaux puis les rissoler dans une sauteuse.',1),
	 ('Débarasser la viande puis faites revenir les oignons dans les sucs.',1),
	 ('Déglacer un vin blanc, ajouter le poulet, le curry, le gingembre gratté et le lait de coco.',1),
	 ('Laissez mijoter, à couvert, une dixaine de minutes en remuant régulièrement. Servez la viande accompagné, par exemple, d un riz pilaf !',1),
	 ('Faire cuire le quinoa',2),
	 ('Mettez les dans un bol',2),
	 ('Coupez les légumes puis ajoutez les au bol',2),
	 ('Mélangez, et mettez des épices',2),
	 ('Servez-vous',2),
	 ('Couper les légumes en petit morceau',3),
	 ('ajouter une cueillère à soupe d/huile d/olive et faire revenir',3);
INSERT INTO step (`text`,recipe_id) VALUES
	 ('Ajouter un peu de farine puis faire mijoter dans 1L d/eau',3),
	 ('attendre 10min puis mixer le tous',3),
	 ('Servez-vous.',3),
	 ('Ciselez les oignons et couper en brunoise les carottes puis les faire rissoler dans une sauteuse.',4),
	 ('Ajouter la viande hachée, laissez mijoter 4/5min puis ajouter la	purée de tomate. Laissez cuire encore une dixaine de minutes',4),
	 ('Dans une autre sauteuse, faire suer le beurre puis ajouter la farine et bien mélanger. Ajoutez-y le lait petit à petit pour réaliser la béchamel',4),
	 ('Cuire les pâtes à lasagnes quelques minutes et les égouter.',4),
	 ('Prendre un plat et alterner entre béchamel, viande et les lasagnes jusqu`à épuisement des ingrédients',4),
	 ('Finir par une couche de pâte puis de béchamel et ajouter du fromage râpés par dessu. Mettre au four pendant 30min',4),
	 ('Dégustez à la sortie du four !',4);
INSERT INTO step (`text`,recipe_id) VALUES
	 ('Griller le saumon après avoir préparé une marinade à base de jus de citron, d/huile d/olive et d/herbes',5),
	 ('Laisser mariner le saumon pendant 30 minutes.',6),
	 ('Réaliser une sauce aux champignons',6),
	 ('Cuire le riz et mélanger avec la sauce',6),
	 ('Servir avec du parmesan râpé.',6),
	 ('Préparer les ingrédients pour le burger',7),
	 ('Griller le bœuf et assembler le burger avec les garnitures de votre choix.',7),
	 ('Cuire les pâtes',8),
	 ('Préparer la sauce carbonara avec de la crème du bacon et des œufs.',8),
	 ('Mélanger avec les pâtes cuites.',8);
INSERT INTO step (`text`,recipe_id) VALUES
	 ('Préparer la vinaigrette pour la salade césar',9),
	 ('Couper le poulet en lanières et les faire griller',9),
	 ('Mélanger le poulet grillé avec la salade et la vinaigrette.',9),
	 ('Préparer la garniture pour les tacos au poulet',10),
	 ('Faire cuire le poulet avec les épices',10),
	 ('Assembler les tacos avec la garniture et servir.',10),
	 ('Préparer la pâte à pizza',11),
	 ('Étaler la pâte',11),
	 ('ajouter la sauce tomate et les garnitures de votre choix',11),
	 ('Cuire au four jusqu/à ce que la croûte soit dorée.',11);
INSERT INTO step (`text`,recipe_id) VALUES
	 ('Faire mariner les crevettes avec de l/ail et des épices',12),
	 ('Cuire les crevettes à la poêle jusqu/à ce qu/elles soient roses',12),
	 ('Servir avec du riz.',12),
	 ('Préparer le tajine en coupant le poulet et en le faisant cuire avec des épices et des légumes',13),
	 ('Servir avec de la semoule.',13),
	 ('Préparer le saumon pour le poke bowl',14),
	 ('Assembler le poke bowl avec du riz, des légumes et du saumon mariné.',14),
	 ('Préparer les wraps au thon en mélangeant le thon avec des légumes et de la mayonnaise',15),
	 ('Envelopper le mélange dans des tortillas.',15),
	 ('Réaliser une ratatouille provençale en coupant les légumes',16);
INSERT INTO step (`text`,recipe_id) VALUES
	 ('les faire mijoter dans une casserole. Servir chaud.',16),
	 ('Préparer le poulet teriyaki en faisant mariner le poulet dans la sauce teriyaki',17),
	 ('le faire griller. Servir avec du riz.',17),
	 ('Préparer la salade de lentilles en faisant cuire les lentilles',18),
	 ('les mélanger avec des légumes',18),
	 ('Assaisonner avec une vinaigrette légère.',18),
	 ('Faire des galettes de pommes de terre en râpant les pommes de terre',19),
	 ('les mélanger avec des œufs',19),
	 ('les faire frire jusqu/à ce qu/elles soient croustillantes.',19),
	 ('Faire griller le poisson en l/assaisonnant avec des herbes et des épices',20);
INSERT INTO step (`text`,recipe_id) VALUES
	 ('Servir avec une salade de légumes frais.',20),
	 ('Préparer le riz cantonais en faisant cuire le riz',21),
	 ('le faire sauté avec des légumes, des œufs et des crevettes',21),
	 ('Assaisonner avec de la sauce soja.',21),
	 ('Préparer la quiche lorraine en préparant la pâte',22),
	 ('la garnir de lardons, de crème et de fromage',22),
	 ('Cuire au four jusqu/à ce que la quiche soit dorée.',22),
	 ('Préparer les spaghetti bolognese en faisant cuire la viande hachée avec une sauce tomate maison',23),
	 ('Servir sur des spaghettis cuits al dente.',23),
	 ('Préparer le couscous aux légumes en faisant cuire la semoule',24);
INSERT INTO step (`text`,recipe_id) VALUES
	 ('le mélanger avec des légumes cuits à la vapeur',24),
	 ('Servir chaud.',24),
	 ('Préparer le poulet au citron en faisant mariner le poulet dans une sauce citronnée',25),
	 ('Cuire au four jusqu/à ce que le poulet soit bien cuit.',25),
	 ('Préparer la salade de fruits de mer en mélangeant des fruits de mer cuits avec une vinaigrette légère',26),
	 ('Servir sur un lit de laitue.',26),
	 ('Faire griller le steak de thon en le marinant avec des herbes et des épices',27),
	 ('Servir avec une salade verte fraîche.',27),
	 ('Préparer les fajitas au bœuf en faisant griller la viande hachée avec des poivrons et des oignons',28),
	 ('Servir dans des tortillas avec des garnitures.',28);
INSERT INTO step (`text`,recipe_id) VALUES
	 ('Préparer le chili con carne en faisant cuire la viande avec des haricots et des épices',29),
	 ('Servir avec du riz ou des tortillas.',29),
	 ('Préparer les sushis en préparant du riz vinaigré, du poisson cru et des légumes',30),
	 ('Rouler les sushis dans des feuilles d/algue.',30),
	 ('Pour les pâtes au pesto faire cuire les pâtes',31),
	 ('Mélanger avec une sauce pesto maison',31),
	 ('Servir avec des légumes.',31),
	 ('Préparer le gratin de courgette en coupant les courgettes et en les gratinant avec du fromage',32),
	 ('Cuire au four jusqu/à ce que le gratin soit doré.',32),
	 ('Préparer les tomates farcies en vidant les tomates et les farcirs d/un mélange de viande hachée et de riz',33);
INSERT INTO step (`text`,recipe_id) VALUES
	 ('Cuire au four jusqu/à ce qu/elles soient tendres.',33),
	 ('Préparer la tarte aux légumes en préparant la pâte et en la garnissant de légumes colorés',34),
	 ('Cuire au four jusqu/à ce que la tarte soit dorée.',34),
	 ('Faire cuire les crevettes à la créole en les faisant sauter avec des épices créoles et des légumes',35),
	 ('Servir sur du riz cuit.',35),
	 ('Préparer le hachis parmentier en faisant cuire la viande hachée avec des épices',36),
	 ('la superposer avec de la purée de pommes de terre',37),
	 ('Cuire au four jusqu/à ce que le dessus soit doré.',36),
	 ('Préparer les falafels en mélangeant des pois chiches écrasés avec des épices et des herbes',37),
	 ('Former des boules et les faire frire jusqu/à ce qu/elles soient croustillantes.',37);
INSERT INTO step (`text`,recipe_id) VALUES
	 ('Faire cuire les nouilles en les faisant bouillir',38),
	 ('les mélanger avec une sauce aux légumes',38),
	 ('Garnir de légumes frais.',38),
	 ('Rôtir le poulet en l/assaisonnant avec des herbes et des épices',39),
	 ('Servir avec des légumes rôtis et une sauce légère.',39),
	 ('Préparer le gratin de pommes de terre en faisant cuire les pommes de terre et en les gratinant avec du fromage',40),
	 ('Cuire au four jusqu/à ce que le gratin soit doré.',40),
	 ('Faire cuire les penne arrabiata en faisant cuire les pâtes',41),
	 ('les mélanger avec une sauce piquante à la tomate',41),
	 ('Servir avec du parmesan.',41);
INSERT INTO step (`text`,recipe_id) VALUES
	 ('Préparer le curry de légumes en faisant cuire les légumes dans une sauce au curry épicée',42),
	 ('Servir sur du riz cuit à la vapeur.',42),
	 ('Préparer l/omelette aux champignons en battant les œufs avec des champignons coupés',43),
	 ('Cuire jusqu/à ce que l/omelette soit bien prise.',43),
	 ('Faire cuire les tagliatelles au saumon en faisant cuire les pâtes',44),
	 ('les mélanger avec une sauce crémeuse au saumon',44),
	 ('Servir avec des câpres.',44),
	 ('Préparer les tagliatelles aux champignons en faisant cuire les pâtes',45),
	 ('les mélanger avec une sauce crémeuse aux champignons',45),
	 ('Garnir de persil frais.',45);
INSERT INTO step (`text`,recipe_id) VALUES
	 ('Rôtir le camembert en l/assaisonnant avec des herbes et en le faisant cuire au four jusqu/à ce qu/il soit fondant',46),
	 ('Servir avec du pain frais.',46),
	 ('Rôtir le magret de canard en le faisant mariner avec des épices',47),
	 ('Cuire au four jusqu/à ce que le magret soit bien cuit',48),
	 ('Servir avec une sauce aux fruits rouges.',47),
	 ('Préparer le risotto aux asperges en faisant cuire le riz dans un bouillon avec des asperges',48),
	 ('Servir chaud.',48),
	 ('Faire cuire la pizza végétalienne en étalant une pâte à pizza végétalienne',49),
	 ('la garnir de légumes colorés',49),
	 ('Cuire au four jusqu/à ce que la croûte soit dorée.',49);
INSERT INTO step (`text`,recipe_id) VALUES
	 ('Préparer le poulet aux herbes en faisant mariner le poulet avec des herbes fraîches',50),
	 ('Cuire au four jusqu/à ce que le poulet soit bien doré.',50);

INSERT INTO comment (content) VALUES
	 ('Super recette, merci!'),
	 ('cette recette est extraordinaire'),
	 ('Juste parfait comme recette!'),
	 ('TROP BON !!!  MERCI'),
	 ('Super recette, merci!'),
	 ('Mon mari en redemande!!'),
	 ('La famille a adoré! merci'),
	 ('Ma femme trouve cette recette super!'),
	 ('Ca n''a pas trop plus à la famille !'),
	 ('Mon mari en redemande!!');
INSERT INTO comment (content) VALUES
	 ('Super recette, merci!'),
	 ('cette recette est extraordinaire');


INSERT INTO recipe_comment (comment_id,user_id,recipe_id) VALUES
	 (1,10,20),
	 (2,2,17),
	 (3,6,26),
	 (4,5,20),
	 (5,11,2),
	 (6,9,37),
	 (7,19,20),
	 (8,20,49),
	 (9,9,21),
	 (10,2,11);
INSERT INTO recipe_comment (comment_id,user_id,recipe_id) VALUES
	 (11,6,16),
	 (12,3,21);