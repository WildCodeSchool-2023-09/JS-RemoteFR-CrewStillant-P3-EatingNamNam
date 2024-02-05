import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

/* eslint-disable react/jsx-props-no-spreading */

export default function RecipeInformationForm({ setSelectedInformations }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [imageRecipe, setImageRecipe] = useState(
    "https://i.ibb.co/dWCZjNS/plathealthy.jpg"
  );
  const [formIsValidated, setFormIsValidated] = useState(false);
  const onSubmit = (data) => {
    setSelectedInformations(data);
    setFormIsValidated(true);
  };

  const imageArray = [
    {
      id: "1",
      name: "healthy",
      imageUrl:
        "https://img.freepik.com/photos-gratuite/poisson-grille-bouchent-decore-legumes_1303-12328.jpg",
    },
    {
      id: "2",
      name: "fat",
      imageUrl:
        "https://img.freepik.com/photos-gratuite/lasagne-traditionnelle-riche-sauce-bolognaise_60438-3536.jpg",
    },
    {
      id: "3",
      name: "light",
      imageUrl:
        "https://img.freepik.com/photos-gratuite/curry-poulet-oignons-cuisine-indienne-cuisine-asiatique_2829-4415.jpg",
    },
  ];
  const handleImageUrlChange = (event) => {
    const newimageurl = imageArray.find((i) => i.name === event.target.value);
    setImageRecipe(newimageurl.imageUrl);
  };
  return (
    <div className="flex flex-row justify-center border rounded-2xl text-center mb-3 p-3 text-3xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex sm:flex-row flex-col sm:justify-center gap-6 w-screen sm:gap-16">
          <img
            className="rounded-3xl border-4 border-orange mx-4"
            src={imageRecipe}
            alt="plat"
          />
          <input type="hidden" value={imageRecipe} {...register("image")} />
          <div className="flex flex-col items-center gap-6 text-beige p-5 bg-orange rounded-3xl mx-4">
            <div className="text-black flex flex-col gap-4">
              <label className="text-beige" htmlFor="title">
                Titre de votre recette :
              </label>
              <input
                className="px-2"
                type="text"
                {...register("title", {
                  required: "ce champ est obligatoire",
                  minLength: {
                    value: 5,
                    message: "Votre titre doit contenir au moins 5 caractères",
                  },
                  maxLength: {
                    value: 150,
                    message: "Votre titre est trop long",
                  },
                })}
              />
              {errors.title && (
                <span className="bg-red-600 text-white py-1 px-4" role="alert">
                  {errors.title?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="type">Choisissez votre type de recette</label>
              <select
                className="text-black px-2"
                name="type"
                {...register("type", {
                  required: "Ce champ est obligatoire ",
                })}
                onChange={handleImageUrlChange}
              >
                {imageArray.map((i) => (
                  <option key={i.id} value={i.name}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex sm:flex-row flex-col items-end gap-6 p-2 sm:w-112 text-beige">
              <div className="flex flex-col items-center gap-4">
                <label htmlFor="preparationTime">Temps de préparation</label>
                <input
                  className="w-16 text-black px-2"
                  placeholder="ex : 30"
                  type="number"
                  min="0"
                  {...register("preparation_time", {
                    required: "Ce champ est obligatoire",
                    valueAsNumber: "Un nombre est obligatoire",
                    min: {
                      value: 1,
                      message:
                        "Votre recette ne peux pas prendre moins d'une minute de préparation",
                    },
                    max: {
                      value: 1440,
                      message:
                        "Votre recette ne peux pas prendre plus de 24h de préparation",
                    },
                  })}
                />
                {errors.preparation_time && (
                  <span
                    className="bg-red-600 text-white py-1 px-4"
                    role="alert"
                  >
                    {errors.preparation_time?.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-4 items-center">
                <label htmlFor="cookingTime">Temps de cuisson</label>
                <input
                  className="w-16 px-2 text-black"
                  placeholder="ex : 40"
                  type="number"
                  min="0"
                  {...register("cooking_time", {
                    required: "Ce champ est obligatoire",
                    valueAsNumber: "Un nombre est obligatoire",
                    min: {
                      value: 1,
                      message:
                        "Votre recette doit au moins prendre 1 minute à cuire",
                    },
                    max: {
                      value: 720,
                      message:
                        "Votre recette ne peux pas prendre plus de 12h de cuisson",
                    },
                  })}
                />

                {errors.cookingTime && (
                  <span
                    className="bg-red-600 text-white py-1 px-4"
                    role="alert"
                  >
                    {errors.cookingTime?.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-4 items-center">
                <label htmlFor="difficulty">Difficulté</label>
                <select
                  className="w-28 px-2 text-black"
                  {...register("difficulty", {
                    required: "Ce champ est obligatoire ",
                    valueAsNumber: "Un nombre est obligatoire",
                  })}
                >
                  <option value="1">Facile</option>
                  <option value="2">Moyen</option>
                  <option value="3">Diffile</option>
                </select>
                {errors.difficulty && (
                  <span
                    className="bg-red-600 text-white py-1 px-4"
                    role="alert"
                  >
                    {errors.difficulty?.message}
                  </span>
                )}
              </div>
            </div>
            {formIsValidated ? (
              <p>
                Vos informations sont enregistrées. <br />
                Maintenant, ajoutez les ingrédients nécessaires
              </p>
            ) : (
              <button
                className="bg-green rounded-3xl p-3 hover:text-orange font-semibold"
                type="submit"
              >
                Validez ces informations
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

RecipeInformationForm.propTypes = {
  selectedInformations: PropTypes.arrayOf.isRequired,
  setSelectedInformations: PropTypes.func.isRequired,
};
