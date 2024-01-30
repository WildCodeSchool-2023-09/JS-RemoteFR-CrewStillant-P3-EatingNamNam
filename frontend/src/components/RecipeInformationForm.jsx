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
    <div className="border rounded-2xl text-center mb-3 p-3">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row gap-32">
          <img className="rounded-3xl" src={imageRecipe} alt="plat" />
          <input type="hidden" value={imageRecipe} {...register("image")} />
          <div className="flex flex-col items-center gap-2 text-beige p-5 bg-orange rounded-3xl">
            <div className="text-black">
              <label className="text-beige" htmlFor="title">
                Titre de votre recette :
              </label>
              <br />
              <input
                className="mt-4 justify-center"
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
            <div>
              <label htmlFor="type">Choisissez votre type de recette</label>
              <br />
              <select
                className="mt-4 text-black"
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
            <div className="flex flex-row justify-center mb-3 p-2 gap-8 sm:w-112 text-beige">
              <div className="flex flex-col items-center gap-1">
                <label htmlFor="preparationTime">Temps de préparation :</label>
                <input
                  className="w-24 mt-2 text-black"
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
              <div className="flex flex-col gap-1">
                <label htmlFor="cookingTime">
                  Temps de cuisson :
                  <br />
                  <input
                    className="w-24 mt-3 text-black"
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
                </label>
                {errors.cookingTime && (
                  <span
                    className="bg-red-600 text-white py-1 px-4"
                    role="alert"
                  >
                    {errors.cookingTime?.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="difficulty">Difficulté :</label>
                <select
                  className="w-24 mt-2 text-black"
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
                className="border-2 border-green rounded-md p-2 hover:bg-green hover:font-bold hover:text-orange"
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
