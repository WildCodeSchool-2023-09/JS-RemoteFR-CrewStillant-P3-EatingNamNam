import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
/* eslint-disable react/jsx-props-no-spreading */

function RecipeCreation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.info(data);

  const totoingredient = axios.get(
    `${import.meta.env.VITE_BACKEND_URL}/api/ingredient`
  );
  console.info(totoingredient);

  return (
    <div className="flex gap-4 flex-col p-3 bg-orange justify-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 mb-3">
          <label htmlFor="title">Titre de votre recette</label>
          <input
            placeholder="Le titre de votre recette"
            type="text"
            {...register("title", { required: true, min: 5, max: 150 })}
          />
          {errors.title && (
            <span className="bg-red-600 text-white py-1 px-4">
              Ce champs est obligatoire pour l'envoi de votre recette
            </span>
          )}
        </div>
        <div className="flex flex-col gap-4 mb-3">
          <label htmlFor="cookingTime">
            Temps de cuisson en minutes de votre recette
          </label>
          <input
            placeholder="ex : 40"
            type="number"
            {...register("cooking_time", {
              required: true,
              valueAsNumber: true,
            })}
          />
          {errors.cookingTime && (
            <span className="bg-red-600 text-white py-1 px-4">
              Ce champs est obligatoire pour l'envoi de votre recette
            </span>
          )}
          <label htmlFor="preparationTime">
            Temps de préparation en minutes de votre recette{" "}
          </label>
          <input
            placeholder="ex : 30"
            type="number"
            {...register("preparation_time", {
              required: true,
              valueAsNumber: true,
            })}
          />
          {errors.preparationTime && (
            <span className="bg-red-600 text-white py-1 px-4">
              Ce champs est obligatoire pour l'envoi de votre recette
            </span>
          )}
          <label htmlFor="difficulty"> Difficulté de votre recette </label>
          <select
            {...register("difficulty", { required: true, valueAsNumber: true })}
          >
            <option value="1">Facile</option>
            <option value="2">Moyen</option>
            <option value="3">Diffile</option>
          </select>
          {errors.difficulty && (
            <span className="bg-red-600 text-white py-1 px-4">
              Ce champs est obligatoire pour l'envoi de votre recette
            </span>
          )}
        </div>
        <div className="">
          <label htmlFor="recipeimage">
            Selectionnez l'image correspond à votre type de recette
          </label>
          <select {...register("recipeimage", { required: true })}>
            <option value="1">UNE SOUPE !</option>
            <option value="2">Un plat de viande</option>
          </select>
          {errors.recipeimage && (
            <span className="bg-red-600 text-white py-1 px-4">
              Ce champs est obligatoire pour l'envoi de votre recette
            </span>
          )}
        </div>
        <div className="flex flex-col gap-4 mb-3 ">
          <label htmlFor="ingredients">Selectionnez ici votre ingrédient</label>
          <select {...register("ingredients", { required: true })}>
            <option value="nomIngredient1">nomIngredient1</option>
            <option value="nomIngredient2">nomIngredient2</option>
          </select>
          {errors.ingredients && (
            <span className="bg-red-600 text-white py-1 px-4">
              Ce champs est obligatoire pour l'envoi de votre recette
            </span>
          )}
          <label htmlFor="quantity">Quantité </label>
          <input
            placeholder="ex : 500"
            type="number"
            {...register("quantity", { required: true })}
          />
          {errors.quantity && (
            <span className="bg-red-600 text-white py-1 px-4">
              Ce champs est obligatoire pour l'envoi de votre recette
            </span>
          )}
          <label htmlFor="weightUnity">en : </label>
          <select {...register("weightUnity", { required: true })}>
            <option value="Kg">Kilogrammes</option>
            <option value="Gr">Grammes</option>
          </select>
          {errors.weightUnity && (
            <span className="bg-red-600 text-white py-1 px-4">
              Ce champs est obligatoire pour l'envoi de votre recette
            </span>
          )}
          <button className="" type="button">
            {" "}
            + Ajouter un ingrédient
          </button>
        </div>
        <div className="flex flex-col gap-4 mb-3">
          <label>
            A vous d'entrer les étapes de votre recette !
            <textarea
              placeholder="Ecrivez vous-même les étapes de votre recette !"
              type="message"
              {...register("steprecipe", { required: true })}
            />
            {errors.steprecipe && (
              <span className="bg-red-600 text-white py-1 px-4">
                Ce champs est obligatoire pour l'envoi de votre recette
              </span>
            )}
          </label>
          <button className="" type="button">
            + Rajouter une nouvelle étape
          </button>
        </div>
        <button className="bg-green" type="submit">
          J'envoie ma recette 🥕
        </button>
      </form>
      <p>JE SUIS UNE DONNEE VIDE UWU</p>
    </div>
  );
}

export default RecipeCreation;
