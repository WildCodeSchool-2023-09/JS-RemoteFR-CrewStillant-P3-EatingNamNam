import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
/* eslint-disable react/jsx-props-no-spreading */

export default function IngredientsForm({
  ingredients,
  unit,
  selectedIngredients,
  setSelectedIngredients,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // correspond à la valeur d'ingrédients filtré par la valeur de l'input
  const [updatedData, setUpdatedData] = useState(ingredients);
  const [formVisible, setFormVisible] = useState(false);
  // ce state sert à remplir les valeurs de l'ingrédient choisi dans le select/option
  const [ingredient, setIngredient] = useState({});
  const onSubmit = (data) => {
    setFormVisible(false);
    setSelectedIngredients([...selectedIngredients, data]);
    reset();
  };
  const handleInputIngredient = (event) => {
    const inputValue = event.target.value;
    setUpdatedData(ingredients.filter((u) => u.name.includes(inputValue)));
  };

  const handleIngredient = (event) => {
    // reset({name}) permet de vider la valeur de register/name et de lui en réattribuer une quand le state re-render
    // reset({ name });
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
    <div className="flex flex-col border rounded-2xl items-center mb-3 p-3 text-black bg-orange">
      <input
        className="w-48"
        type="text"
        name=""
        onChange={handleInputIngredient}
      />
      <select className="w-48" name="" onChange={handleIngredient}>
        <option value="">Liste des ingrédients</option>
        {updatedData.map((i) => (
          <option key={i.id} value={i.name} id={i.id}>
            {i.name}
          </option>
        ))}
      </select>
      {formVisible ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="hidden"
            name="id"
            value={ingredient.id}
            {...register("id")}
          />
          <input
            type="text"
            name="ingredient"
            value={ingredient.name}
            {...register("ingredient")}
          />
          <input
            type="number"
            name="quantity"
            min={0}
            {...register("quantity", {
              required: "Ce champ est obligatoire",
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
            name="mesure_unit"
            {...register("mesure_unit", {
              required: "Ce champ est obligatoire",
            })}
          >
            <option value="">Choissisez voter unité de mesure</option>
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
          <button type="submit">J'envoie mon ingrédient 🥕</button>
        </form>
      ) : (
        ""
      )}
      <div className="flex flex-col gap-4 mb-">
        <ul>
          {selectedIngredients.map((s) => (
            <li key={s.ingredient}>
              {s.ingredient},{s.quantity}, {s.mesure_unit}{" "}
              <button type="button" onClick={() => handleDeleteIngredient(s)}>
                Supprimer cet ingrédient
              </button>
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
