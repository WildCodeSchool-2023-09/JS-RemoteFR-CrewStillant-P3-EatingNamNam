import React from "react";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import sum from "../services/calculator";

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

  const calories = [];
  const proteins = [];
  const fats = [];
  const sugars = [];

  recipe.ingredients.forEach((i) => {
    calories.push(i.calories);
    proteins.push(i.protein);
    fats.push(i.fat);
    sugars.push(i.sugar);
  });

  const totalCalories = sum(calories);
  const totalProteins = sum(proteins);
  const totalFats = sum(fats);
  const totalSugars = sum(sugars);

  return (
    <div className="m-3 text-xl">
      <h1>{recipe.infos.title}</h1>
      <div className={!auth ? "blur-sm" : null}>
        <img
          src={recipe.infos.image}
          alt={recipe.infos.title}
          className={
            !auth ? "blur-md mb-3 w-68 rounded-3xl" : "mb-3 w-68 rounded-3xl"
          }
        />
        <div className="border rounded-2xl flex flex-row justify-around mb-3 p-3 text-beige bg-orange">
          <div className="text-center">
            <p>Temps de préparation : </p>
            <div>{recipe.infos.preparation_time} minutes</div>
          </div>
          <div className="text-center">
            <p>Temps de cuisson : </p>
            <div className="flex justify-around">
              {recipe.infos.cooking_time} minutes
            </div>
          </div>
          <div className="text-center">
            <p>Difficulté :</p>
            <div>{difficultyEmoji(recipe.infos.difficulty)}</div>
          </div>
        </div>
        <div className="border rounded-2xl flex flex-row justify-around mb-3 p-3 text-beige bg-orange">
          <div className="text-center">
            <p>Calories : </p>
            <div>{totalCalories}kcal</div>
          </div>
          <div className="text-center">
            <p>Lipides :</p>
            <p>{totalFats}g</p>
          </div>
          <div className="text-center">
            <p>Glucides :</p>
            <p>{totalSugars}g</p>
          </div>
          <div className="text-center">
            <p>Protéines :</p>
            <p>{totalProteins}g</p>
          </div>
        </div>
        <div className="border rounded-2xl mb-4 p-4 text-beige bg-orange">
          <p>Liste des ingrédients:</p>
          <ul className="sm:columns-3 columns-2">
            {recipe.ingredients.map((i) => (
              <li className="flex flex-row" key={i.id}>
                {i.name} : {i.quantity}g
              </li>
            ))}
          </ul>
        </div>
        <p className="text-orange mb-3">Etapes de préparation:</p>
        <div className="border-green flex flex-col border-4 rounded-2xl p-3 bg-slate-200 mb-4 gap-4">
          {recipe.steps.map((s, index) => (
            <p key={s.id}>
              Etape {index + 1} : {s.text}
            </p>
          ))}
        </div>
        <p className="text-orange  mb-3">Commentaires:</p>
        <div className="border-green flex flex-col gap-4 border-4 rounded-2xl p-3 bg-slate-200">
          {recipe.comments.map((c) => (
            <div className="flex flex-col gap-1" key={c.id}>
              <p>{c.pseudo} :</p>
              <p key={c.id}>{c.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Recipes.propTypes = {
  recipe: PropTypes.shape({
    infos: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      cooking_time: PropTypes.number.isRequired,
      preparation_time: PropTypes.number.isRequired,
      difficulty: PropTypes.number.isRequired,
    }),
    ingredients: PropTypes.arrayOf().isRequired,
    steps: PropTypes.arrayOf().isRequired,
    comments: PropTypes.arrayOf().isRequired,
  }).isRequired,
};

export default Recipes;
