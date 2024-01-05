import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
/* eslint-disable react/jsx-props-no-spreading */

export default function RecipeInformationForm({
  selectedIngredients,
  setSelectedIngredients,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.info(data);
    setSelectedIngredients([...selectedIngredients, data]);
    reset();
  };
  return (
    <div>
      <h1>JE SUIS UN CAROUSEL</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 mb-3">
          <label htmlFor="title">Titre de votre recette</label>
          <input
            placeholder="Le titre de votre recette"
            type="text"
            {...register("title", {
              required: "ce champ est obligatoire",
              minLength: {
                value: 5,
                message: "Votre titre doit contenir au moins 5 caractères",
              },
              maxLength: { value: 150, message: "Votre titre est trop long" },
            })}
          />
          {errors.title && (
            <span className="bg-red-600 text-white py-1 px-4" role="alert">
              {errors.title?.message}
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
              required: "ce champ est obligatoire",
              min: {
                value: 1,
                message: "Votre recette doit au moins prendre 1 minute à cuire",
              },
              max: {
                value: 720,
                message:
                  "Votre recette ne peux pas prendre plus de 12h de cuisson",
              },
            })}
          />
          {errors.cookingTime && (
            <span className="bg-red-600 text-white py-1 px-4" role="alert">
              {errors.cookingTime?.message}
            </span>
          )}
          <label htmlFor="preparationTime">
            Temps de préparation en minutes de votre recette{" "}
          </label>
          <input
            placeholder="ex : 30"
            type="number"
            {...register("preparation_time", {
              required: "ce champ est obligatoire",
              min: {
                value: 1,
                message:
                  "Votre recette ne peux pas prendre moins d'une heure de préparation",
              },
              max: {
                value: 1440,
                message:
                  "Votre recette ne peux pas prendre plus de 24h de préparation",
              },
            })}
          />
          {errors.preparation_time && (
            <span className="bg-red-600 text-white py-1 px-4" role="alert">
              {errors.preparation_time?.message}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

RecipeInformationForm.propTypes = {
  selectedIngredients: PropTypes.arrayOf.isRequired,
  setSelectedIngredients: PropTypes.func.isRequired,
};
