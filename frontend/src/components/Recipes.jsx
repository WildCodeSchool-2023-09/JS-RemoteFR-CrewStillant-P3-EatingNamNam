import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import { sum, stringToNumberArray } from "../services/calculator";

import difficult from "../assets/logo_difficulty/diff-chef.png";
import diffNone from "../assets/logo_difficulty/diff-chef-none.png";

function Recipes({ recipe }) {
  const { auth } = useOutletContext();

  const { infos, comments, steps } = recipe;

  const [favList, setFavList] = useState();

  const [isTrue, setIsTrue] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/favorite/${infos.id}`)
      .then((res) => setFavList(res.data));
    setIsTrue(false);
  }, [isTrue]);

  const isFav = favList?.userList.includes("1");

  const handleClick = async () => {
    const data = { userID: 1, recipeID: infos.id };
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/favorite`, data)
      .then((res) => console.info(res.data))
      .then(setIsTrue(true));
  };

  const handleClickSupp = async () => {
    const ID = 1;
    await axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/favorite/${ID}`)
      .then((res) => console.info(res.data));
    setIsTrue(true);
  };

  const difficultyEmoji = (difficulty) => {
    switch (difficulty) {
      case 1:
        return (
          <>
            <img className="h-8 w-8" src={difficult} alt={difficult} />
            <img className="h-9 w-9" src={diffNone} alt={diffNone} />
            <img className="h-9 w-9" src={diffNone} alt={diffNone} />
          </>
        );
      case 2:
        return (
          <>
            <img className="h-8 w-8" src={difficult} alt={difficult} />
            <img className="h-8 w-8" src={difficult} alt={diffNone} />
            <img className="h-9 w-9" src={diffNone} alt={diffNone} />
          </>
        );
      case 3:
        return (
          <>
            <img className="h-8 w-8" src={difficult} alt={difficult} />
            <img className="h-8 w-8" src={difficult} alt={difficult} />
            <img className="h-8 w-8" src={difficult} alt={difficult} />
          </>
        );
      default:
        return (
          <>
            <img className="h-9 w-9" src={diffNone} alt={diffNone} />
            <img className="h-9 w-9" src={diffNone} alt={diffNone} />
            <img className="h-9 w-9" src={diffNone} alt={diffNone} />
          </>
        );
    }
  };

  const calories = stringToNumberArray(infos.calories);
  const proteins = stringToNumberArray(infos.proteins);
  const fats = stringToNumberArray(infos.fats);
  const sugars = stringToNumberArray(infos.sugars);

  const totalCalories = sum(calories);
  const totalProteins = sum(proteins);
  const totalFats = sum(fats);
  const totalSugars = sum(sugars);

  const ingredientArray = infos.ingredient.split(",");
  const quantityArray = infos.quantity.split(",");
  const ingredientList = [];

  for (let i = 0; i < ingredientArray.length; i += 1) {
    ingredientList.push({
      id: (i += 1),
      ingredient: ingredientArray[i],
      quantity: parseInt(quantityArray[i], 10),
    });
  }

  return (
    <div className="m-5 text-xl">
      <h1>{infos.title}</h1>
      {!isFav ? (
        <button type="button" onClick={handleClick}>
          Ajoutez à vos favoris
        </button>
      ) : (
        <button type="button" onClick={handleClickSupp}>
          supprimer de vos favoris
        </button>
      )}
      <div className={!auth.token ? "" : null}>
        <img
          src={infos.image}
          alt={infos.title}
          className={
            !auth
              ? "blur-md flex flex-col w-full h-96 rounded-3xl"
              : "flex flex-col w-full h-96 rounded-3xl"
          }
        />
        <div className="flex flex-col">
          <div className="rounded-2xl flex flex-row mb-3 p-2 sm:gap-10 gap-8 justify-center text-beige bg-orange">
            <div className="text-center text-lg">
              <p>Temps de préparation</p>
              <p>{infos.preparation_time} minutes</p>
            </div>
            <div className="text-center text-lg">
              <p>Temps de cuisson</p>
              <p>{infos.cooking_time} minutes</p>
            </div>
            <div className="text-center text-lg">
              <p>Difficulté</p>
              <p className="flex flex-row gap-2 items-center">
                {difficultyEmoji(infos.difficulty)}
              </p>
            </div>
          </div>
          <div className="rounded-2xl flex flex-row mb-3 p-2 sm:gap-10 gap-3 justify-center text-beige bg-orange">
            <div className="text-center text-lg break-normal">
              <p>Calories</p>
              <p>{totalCalories}kcal</p>
            </div>
            <div className="text-center text-lg">
              <p>Lipides</p>
              <p>{totalFats}g</p>
            </div>
            <div className="text-center text-lg">
              <p>Glucides</p>
              <p>{totalSugars}g</p>
            </div>
            <div className="text-center text-lg">
              <p>Protéines</p>
              <p>{totalProteins}g</p>
            </div>
          </div>
          <div className="rounded-2xl p-16 text-beige text-lg bg-orange">
            <p>Liste des ingrédients :</p>
            <ul className="sm:columns-3 columns-2">
              {ingredientList.map((i) => (
                <li className="flex flex-row" key={i.id}>
                  {i.ingredient} : {i.quantity}g
                </li>
              ))}
            </ul>
          </div>
          <p className="text-orange mb-3">Etapes de préparation:</p>
          <div className="border-green flex flex-col border-4 rounded-2xl p-3 bg-slate-200 mb-4 gap-4">
            {steps.map((s, index) => (
              <p key={s.id}>
                Etape {index + 1} : {s.text}
              </p>
            ))}
          </div>
          <p className="text-orange  mb-3">Commentaires:</p>
          <div className="border-green flex flex-col gap-4 border-4 rounded-2xl p-3 bg-slate-200">
            {comments.map((c) => (
              <div className="flex flex-col gap-1" key={c.id}>
                <p>{c.pseudo} :</p>
                <p className="pl-6">{c.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Recipes.propTypes = {
  recipe: PropTypes.shape().isRequired,
};

export default Recipes;
