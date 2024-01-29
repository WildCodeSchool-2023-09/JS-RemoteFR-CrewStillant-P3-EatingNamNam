import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import ReactStars from "react-stars";
import { useOutletContext } from "react-router-dom";
import { sum, stringToNumberArray } from "../services/calculator";

import difficult from "../assets/logo_difficulty/diff-chef.png";
import diffNone from "../assets/logo_difficulty/diff-chef-none.png";
import redHeart from "../assets/logo_fav/red-heart.png";
import heartNone from "../assets/logo_fav/heart-none.png";

function Recipes({ recipe, notation }) {
  const { auth } = useOutletContext();
  const { infos, comments, steps } = recipe;
  const [recipeNote, setRecipeNote] = useState(notation);
  const [isNoted, setIsNoted] = useState(false);

  // ajoutez / enlevez les recettes favorites

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/favorite/${infos.id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => setIsFavorite(res.data && true));
  }, []);
  const handleClick = async () => {
    const data = { recipeID: infos.id };
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/favorite`,
        data,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setIsFavorite(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClickSupp = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/favorite/${infos.id}`,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );
      setIsFavorite(false);
    } catch (e) {
      console.error(e);
    }
  };

  const difficultyEmoji = (difficulty) => {
    switch (difficulty) {
      case 1:
        return (
          <>
            <img src={difficult} alt={difficult} width={32} />
            <img src={diffNone} alt="" width={32} />
            <img src={diffNone} alt="" width={32} />
          </>
        );
      case 2:
        return (
          <>
            <img src={difficult} alt={difficult} width={32} />
            <img src={difficult} alt={difficult} width={32} />
            <img src={diffNone} alt="" width={32} />
          </>
        );
      case 3:
        return (
          <>
            <img src={difficult} alt="" width={32} />
            <img src={difficult} alt="" width={32} />
            <img src={difficult} alt="" width={32} />
          </>
        );
      default:
        return <img src={diffNone} alt="" width={32} />;
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

  // Récupère la notation de l'utilisateur et la post en base de donnée
  const ratingChanged = (newRating) => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/note`,
        {
          note: newRating,
          recipeID: recipe.infos.id,
        },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      )
      .then((res) => console.info(res.data))
      .then(setIsNoted(true));
  };

  // met à jour la note moyenne à chaque vote
  useEffect(() => {
    if (isNoted) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/note/${infos.id}`)
        .then((res) => setRecipeNote(res.data))
        .then(setIsNoted(false));
    }
  }, [isNoted]);

  return (
    <div className="m-5 text-xl">
      <div>
        <h1 className="text-4xl text-center m-5">{infos.title}</h1>
        {recipeNote.average_note && (
          <div className="flex sm:flex-row flex-col justify-center">
            <p>Note moyenne des utilisateurs : </p>
            <p>
              {Math.round(recipeNote.average_note * 100) / 100}/5 sur{" "}
              {recipeNote.total_note}{" "}
              {recipeNote.total_note === 1 ? "vote" : "votes"}
            </p>
          </div>
        )}
      </div>
      <div className={!auth.token ? "blur-sm" : null}>
        {isFavorite ? (
          <button type="button" onClick={handleClickSupp}>
            <img className="h-7" src={redHeart} alt={redHeart} />
          </button>
        ) : (
          <button type="button" onClick={handleClick}>
            <img className="h-7" src={heartNone} alt={heartNone} />
          </button>
        )}
        <div className="flex flex-col sm:flex-row justify-around items-center m-3">
          <div>
            <img
              src={infos.image}
              alt={infos.title}
              className={
                !auth
                  ? "blur-md flex flex-col w-full h-96 rounded-3xl"
                  : "flex flex-col h-96 w- rounded-3xl"
              }
            />
            <div className="flex sm:flex-row flex-col items-center sm:justify-center sm:gap-4 mb-2 text-2xl">
              <p>Noter la recette :</p>
              <ReactStars onChange={ratingChanged} size={32} half={false} />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="rounded-2xl flex flex-col justify-center text-lg mb-3 p-2 sm:w-112 text-beige bg-orange">
              <div className="flex flex-row justify-between px-2">
                <p>Temps de préparation :</p>
                <p>{infos.preparation_time} minutes</p>
              </div>
              <div className="flex flex-row justify-between px-2">
                <p>Temps de cuisson :</p>
                <p>{infos.cooking_time} minutes</p>
              </div>
              <div className="flex flex-row justify-between px-2">
                <p>Difficulté :</p>
                <div className="flex flex-row  items-center">
                  {difficultyEmoji(infos.difficulty)}
                </div>
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
            <div className="rounded-2xl p-2 h-fit text-beige text-lg mt-5 bg-orange">
              <p>Liste des ingrédients :</p>
              <ul className="sm:columns-3 columns-2">
                {ingredientList.map((i) => (
                  <li className="flex flex-row" key={i.id}>
                    {i.ingredient} : {i.quantity}g
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="text-orange mb-3">Etapes de préparation:</p>
        <div className="border-green h-fit flex flex-col border-4 rounded-2xl p-3 bg-slate-200 mb-4 gap-4">
          {steps.map((s, index) => (
            <p key={s.id}>
              Etape {index + 1} : {s.text}
            </p>
          ))}
        </div>
        <p className="text-orange mt-5 mb-3">Commentaires:</p>
        <div className="border-green h-fit flex flex-col gap-4 border-4 rounded-2xl p-3 bg-slate-200">
          {comments.map((c) => (
            <div className="flex flex-col gap-1" key={c.id}>
              <p>{c.pseudo} :</p>
              <p className="pl-6">{c.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

Recipes.propTypes = {
  recipe: PropTypes.shape().isRequired,
  notation: PropTypes.shape().isRequired,
};

export default Recipes;
