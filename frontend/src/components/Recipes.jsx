import React from "react";
import PropTypes from "prop-types";

import difficult from "../assets/logo_difficulty/diff-chef.png";
import diffNone from "../assets/logo_difficulty/diff-chef-none.png";

function Recipes({ recipe }) {
  const difficultyEmoji = (difficulty) => {
    switch (difficulty) {
      case 1:
        return <img className="h-8 w-8" src={difficult} alt={difficult} />;
      case 2:
        return (
          (<img className="h-8 w-8" src={difficult} alt={difficult} />),
          (<img className="h-8 w-8" src={difficult} alt={difficult} />)
        );
      case 3:
        return (
          (<img className="h-8 w-8" src={difficult} alt={difficult} />),
          (<img className="h-8 w-8" src={difficult} alt={difficult} />),
          (<img className="h-8 w-8" src={difficult} alt={difficult} />)
        );
      default:
        return <img className="h-8 w-8" src={diffNone} alt="" />;
    }
  };

  return (
    <div className="m-5 text-xl">
      <div className="flex flex-row justify-between m-5 gap-7">
        <img
          className="w-full h-96 rounded-3xl"
          src={recipe.image}
          alt={recipe.image}
        />
        <div className="flex flex-col">
          <div className="rounded-2xl flex flex-row mb-3 p-3 gap-32 text-beige bg-orange">
            <div className="text-center">
              <p>Préparation : </p>
              <div>{recipe.preparation_time}min</div>
            </div>
            <div className="text-center">
              <p>Cuisson : </p>
              <div>{recipe.cooking_time}min</div>
            </div>
            <div className="text-center">
              <p>Difficultés :</p>
              <div>{difficultyEmoji(recipe.difficulty)}</div>
            </div>
          </div>
          <div className="border rounded-2xl flex flex-row justify-around mb-3 p-3 text-beige bg-orange">
            <div className="text-center">
              <p>Calories : </p>
              <div>{recipe.calories}kcal</div>
            </div>
            <div className="text-center">
              <p>Lipides : </p>
              <div>{recipe.sugar}g</div>
            </div>
            <div className="text-center">
              <p>Glucides :</p>
              <div>{recipe.fat}g</div>
            </div>
            <div className="text-center">
              <p>Protéines :</p>
              <div>{recipe.protein}g</div>
            </div>
          </div>
          <div className="border rounded-2xl mb-3 p-3 text-beige bg-orange">
            <p>Liste des ingrédients :</p>
            <ul>
              <li className="flex flex-row">
                {recipe.name}: <div className="ml-3">{recipe.quantity}g</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="bg-orange w-fit text-beige mb-3 p-2 rounded-xl">
        Etapes de préparation :
      </p>
      <div className="border-green border-4 rounded-2xl p-16 bg-slate-200 mb-4">
        {recipe.text}
      </div>
      <p className="bg-orange w-fit text-beige mb-3 p-2 rounded-xl">
        Commentaires :
      </p>
      <div className="border-green border-4 rounded-2xl p-16 bg-slate-200">
        {recipe.text}
      </div>
    </div>
  );
}

Recipes.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    cooking_time: PropTypes.number.isRequired,
    preparation_time: PropTypes.number.isRequired,
    difficulty: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    sugar: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
  }).isRequired,
};

export default Recipes;
