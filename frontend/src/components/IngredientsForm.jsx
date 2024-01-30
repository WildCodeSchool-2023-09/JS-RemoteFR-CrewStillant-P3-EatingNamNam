import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import PropTypes from "prop-types";
import CreateIngredient from "./CreateIngredient";
import closeCross from "../assets/bouton-fermer.png";

/* eslint-disable react/jsx-props-no-spreading */

export default function IngredientsForm({
  ingredients,
  unit,
  selectedIngredients,
  setSelectedIngredients,
}) {
  const [ingredient, setIngredient] = useState({});
  // correspond à la valeur d'ingrédients filtré par la valeur de l'input
  const [updatedData, setUpdatedData] = useState(ingredients);
  const [formVisible, setFormVisible] = useState(false);
  // ce state sert à remplir les valeurs de l'ingrédient choisi dans le select/option
  const [isCreatedingredient, setIsCreatedIngredient] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (isCreatedingredient) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/ingredient`)
        .then((res) => setUpdatedData(res.data));
      setIsCreatedIngredient(false);
    }
  }, [isCreatedingredient]);

  const onSubmit = (data) => {
    setSelectedIngredients([...selectedIngredients, data]);
    reset();
    setFormVisible(false);
  };

  const handleInputIngredient = (event) => {
    const inputValue = event.target.value;
    setUpdatedData(
      ingredients.filter((u) => u.name.toLowerCase().includes(inputValue))
    );
  };

  const handleIngredient = (event) => {
    // reset({name}) permet de vider la valeur de register/name et de lui en réattribuer une quand le state re-render
    reset();
    const ingredientname = event.target.value;
    setFormVisible(true);
    setIngredient(ingredients.find((i) => i.name === ingredientname));
  };

  const handleDeleteIngredient = (element) => {
    const index = selectedIngredients.findIndex(
      (e) => e.ingredient === element.ingredient
    );
    setSelectedIngredients(selectedIngredients.toSpliced(index, 1));
  };

  const solid = unit[0].mesure_unit;
  const arraysolid = solid.split(" ");
  const liquid = unit[1].mesure_unit;
  const arrayliquid = liquid.split(" ");

  return (
    <div className="flex flex-col gap-8 text-beige rounded-2xl pt-8 mx-4 p-4 items-center sm:w-[95rem] h-content bg-orange">
      <div className="flex sm:flex-row flex-col items-center gap-8 sm:gap-4">
        {isVisible ? (
          <CreateIngredient
            setIsCreatedIngredient={setIsCreatedIngredient}
            setIsVisible={setIsVisible}
          />
        ) : (
          <>
            <label htmlFor="searchIngredient" className="text-3xl">
              Recherchez votre ingrédient
            </label>
            <input
              className="text-black px-2"
              type="text"
              name="searchIngredient"
              placeholder="Rechercher un ingredient"
              onChange={handleInputIngredient}
            />
            <select
              className="w-48 text-black"
              name=""
              onChange={handleIngredient}
            >
              <option className="text-black" value="">
                Liste des ingrédients
              </option>
              {updatedData.map((i) => (
                <option key={i.id} value={i.name} id={i.id}>
                  {i.name}
                </option>
              ))}
            </select>
            <p className="text-3xl">ou</p>
            <button
              type="button"
              onClick={() => setIsVisible(true)}
              className="text-3xl bg-green rounded-2xl px-3 py-1 hover:text-orange hover:font-semibold"
            >
              Créer un ingrédient
            </button>
          </>
        )}
      </div>
      {formVisible ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-2"
        >
          <div className="flex flex-col text-black p-5 gap-2">
            <input
              type="hidden"
              name="id"
              value={ingredient.id}
              {...register("id", {
                valueAsNumber: "Un nombre est obligatoire",
              })}
            />
            <input
              className="w-38 m-2 text-black "
              type="text"
              name="ingredient"
              value={ingredient.name}
              {...register("ingredient")}
            />
            <input
              className="w-20 m-2"
              type="number"
              name="quantity"
              min={0}
              {...register("quantity", {
                required: "Ce champ est obligatoire",
                valueAsNumber: "Un nombre est obligatoire",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Vous ne pouvez mettre que des chiffres",
                },
                min: {
                  value: 1,
                  message: "Vous devez au moins mettre une quantité de 1",
                },
              })}
            />
            {errors.quantity && (
              <span className="bg-red-600 text-white py-1 px-4" role="alert">
                {errors.quantity?.message}
              </span>
            )}
            <select
              className="w-52 m-2"
              name="mesure_unit"
              {...register("mesure_unit", {
                required: "Ce champ est obligatoire",
              })}
            >
              <option className="text-black" value="">
                unité de mesure
              </option>
              {ingredient.unit_id === 1
                ? arraysolid.map((a) => (
                    <option value={a} key={arraysolid.indexOf(a)}>
                      {a}
                    </option>
                  ))
                : arrayliquid.map((a) => (
                    <option value={a} key={arrayliquid.indexOf(a)}>
                      {a}
                    </option>
                  ))}
            </select>
            {errors.mesure_unit && (
              <span className="bg-red-600 text-white py-1 px-4" role="alert">
                {errors.mesure_unit?.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="bg-green rounded-3xl h-12 w-72 m-5 hover:text-orange hover:font-semibold"
          >
            Valider cet ingrédient 🥕
          </button>
        </form>
      ) : (
        ""
      )}
      <div className="text-center flex flex-col gap-6 sm:gap-4 items-center sm:px-16 py-4 text-3xl border-t-4 border-green">
        <h3>Vos ingrédients sélectionnés : </h3>
        <ul className="flex flex-col text-3xl gap-4">
          {selectedIngredients &&
            selectedIngredients.map((s) => (
              <li
                key={s.ingredient}
                className="flex sm:flex-row flex-col items-center justify-start sm:gap-2"
              >
                <p>{s.ingredient}</p>
                <span className="flex flex-row">
                  <p>{s.quantity}</p>
                  <p>{s.mesure_unit}</p>
                  <button
                    className="w-6 ml-4"
                    type="button"
                    title="Retirer l'ingrédient"
                    onClick={() => handleDeleteIngredient(s)}
                  >
                    <img src={closeCross} alt="supprimer" />
                  </button>
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

IngredientsForm.propTypes = {
  selectedIngredients: PropTypes.arrayOf.isRequired,
  setSelectedIngredients: PropTypes.func.isRequired,
  isCreatedingredient: PropTypes.func.isRequired,
  setIsCreatedIngredient: PropTypes.func.isRequired,
  unit: PropTypes.oneOfType([
    PropTypes.shape,
    () => null,
    PropTypes.instanceOf(Error),
  ]).isRequired,
  ingredients: PropTypes.oneOfType([
    PropTypes.shape,
    () => null,
    PropTypes.instanceOf(Error),
  ]).isRequired,
};
