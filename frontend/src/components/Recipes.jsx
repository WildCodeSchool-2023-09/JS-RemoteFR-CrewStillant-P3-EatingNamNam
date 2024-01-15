import React from "react";
import PropTypes from "prop-types";

function Recipes({ recipeId }) {
  const difficultyEmoji = (difficulty) => {
    switch (difficulty) {
      case 1:
        return "🧑🏻‍🍳";
      case 2:
        return "🧑🏻‍🍳🧑🏻‍🍳";
      case 3:
        return "🧑🏻‍🍳🧑🏻‍🍳🧑🏻‍🍳";
      default:
        return "❓";
    }
  };

  return (
    <div className="m-3 text-xl">
      <img
        src={recipeId.image}
        alt={recipeId.image}
        className="mb-3 w-68 rounded-3xl"
      />
      <div className="border rounded-2xl flex flex-row justify-around mb-3 p-3 text-beige bg-orange">
        <div className="text-center">
          <p>Préparation: </p>
          <div>{recipeId.preparation_time}min</div>
        </div>
        <div className="text-center">
          <p>Cuisson: </p>
          <div className="flex justify-around">{recipeId.cooking_time}min</div>
        </div>
        <div className="text-center">
          <p>Difficulté:</p>
          <div>{difficultyEmoji(recipeId.difficulty)}</div>
        </div>
      </div>
      <div className="border rounded-2xl flex flex-row justify-around mb-3 p-3 text-beige bg-orange">
        <div className="text-center">
          <p>Calories : </p>
          <div>{recipeId.calories}kcal</div>
        </div>
        <div className="text-center">
          <p>Lipides : </p>
          <div>{recipeId.sugar}g</div>
        </div>
        <div className="text-center">
          <p>Glucides :</p>
          <div>{recipeId.fat}g</div>
        </div>
        <div className="text-center">
          <p>Protéines :</p>
          <div>{recipeId.protein}g</div>
        </div>
      </div>
      <div className="border rounded-2xl mb-4 p-4 text-beige bg-orange">
        <p>Liste des ingrédients:</p>
        <ul>
          <li className="flex flex-row">
            {recipeId.name}: <div className="ml-3">{recipeId.quantity}g</div>
          </li>
        </ul>
      </div>
      <p className="text-orange mb-3">Etapes de préparation:</p>
      <div className="border-green border-4 rounded-2xl p-3 bg-slate-200 mb-4">
        {recipeId.steps}
      </div>
      <p className="text-orange  mb-3">Commentaires:</p>
      <div className="border-green border-4 rounded-2xl p-3 bg-slate-200">
        {recipeId.comments}
      </div>
    </div>
  );
}

Recipes.propTypes = {
  recipeId: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    steps: PropTypes.string.isRequired,
    comments: PropTypes.string.isRequired,
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
