import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
/* eslint-disable react/jsx-props-no-spreading */

export default function RecipeInformationForm({
  selectedInformations,
  setSelectedInformations,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { image: "toto" } });

  const onSubmit = (data) => {
    setSelectedInformations([...selectedInformations, data]);
  };

  const [formIsValidated, setFormIsValidated] = useState(false);
  const handleClick = (event) => {
    event.preventDefault();
    setFormIsValidated(true);
  };
  return (
    <div className="flex flex-col border rounded-2xl items-center mb-3 p-3 text-black bg-orange">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
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
            className="w-48"
            placeholder="ex : 40"
            type="number"
            {...register("cooking_time", {
              required: "Ce champ est obligatoire",
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
            className="w-48"
            placeholder="ex : 30"
            type="number"
            {...register("preparation_time", {
              required: "Ce champ est obligatoire",
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
        <div>
          <label htmlFor="difficulty"> Difficulté de votre recette </label>
          <select
            {...register("difficulty", {
              required: "Ce champ est obligatoire ",
            })}
          >
            <option value="1">Facile</option>
            <option value="2">Moyen</option>
            <option value="3">Diffile</option>
          </select>
          {errors.difficulty && (
            <span className="bg-red-600 text-white py-1 px-4" role="alert">
              {errors.difficulty?.message}
            </span>
          )}
        </div>
        {formIsValidated ? (
          <p>
            Bravo, vous venez de valider la première étape de votre recette
            🥕🥕🥕
          </p>
        ) : (
          <button className="" type="submit" onClick={handleClick}>
            Validez les informations de votre recette ici ! 🥕🥕🥕
          </button>
        )}
      </form>
    </div>
  );
}

RecipeInformationForm.propTypes = {
  selectedInformations: PropTypes.arrayOf.isRequired,
  setSelectedInformations: PropTypes.func.isRequired,
};
