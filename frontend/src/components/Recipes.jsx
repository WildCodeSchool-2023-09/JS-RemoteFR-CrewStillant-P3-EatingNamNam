import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useOutletContext } from "react-router-dom";
import ReactStars from "react-stars";

function Recipes({ recipe }) {
  const { auth } = useOutletContext();
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

  const ratingChanged = (newRating) => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/note`, {
      note: newRating,
      recipeID: recipe,
      userID: auth.id,
    });
  };

  return (
    <div className="m-3 text-xl">
      <h1>{recipe.title}</h1>
      <div className={!auth ? "blur-sm" : null}>
        <img
          src={recipe.image}
          alt={recipe.image}
          className={
            !auth ? "blur-md mb-3 w-68 rounded-3xl" : "mb-3 w-68 rounded-3xl"
          }
        />
        <div className="flex flex-row justify-around mb-2 text-2xl">
          <p>Noter la recette :</p>
          <ReactStars onChange={ratingChanged} size={40} half={false} />
        </div>
        <div className="border rounded-2xl flex flex-row justify-around mb-3 p-3 text-beige bg-orange">
          <div className="text-center">
            <p>Préparation: </p>
            <div>{recipe.preparation_time}min</div>
          </div>
          <div className="text-center">
            <p>Cuisson: </p>
            <div className="flex justify-around">{recipe.cooking_time}min</div>
          </div>
          <div className="text-center">
            <p>Difficulté:</p>
            <div>{difficultyEmoji(recipe.difficulty)}</div>
          </div>
        </div>
        <div className="border rounded-2xl flex flex-row justify-around mb-3 p-3 text-beige bg-orange">
          <div className="text-center">
            <p>Calories: </p>
            <div>{recipe.calories}kcal</div>
          </div>
          <div className="text-center">
            <p>Lipide: </p>
            <div>{recipe.sugar}g</div>
          </div>
          <div className="text-center">
            <p>Glucides:</p>
            <div>{recipe.fat}g</div>
          </div>
          <div className="text-center">
            <p>Protéine:</p>
            <div>{recipe.protein}g</div>
          </div>
        </div>
        <div className="border rounded-2xl mb-4 p-4 text-beige bg-orange">
          <p>Liste des ingrédients:</p>
          <ul>
            <li className="flex flex-row">
              {recipe.name}: <div className="ml-3">{recipe.quantity}g</div>
            </li>
          </ul>
        </div>
        <p className="text-orange mb-3">Etapes de préparation:</p>
        <div className="border-green border-4 rounded-2xl p-3 bg-slate-200 mb-4">
          {recipe.steps}
        </div>
        <p className="text-orange  mb-3">Commentaires:</p>
        <div className="border-green border-4 rounded-2xl p-3 bg-slate-200">
          {recipe.comments}
        </div>
      </div>
    </div>
  );
}

Recipes.propTypes = {
  recipe: PropTypes.shape({
    title: PropTypes.string.isRequired,
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
