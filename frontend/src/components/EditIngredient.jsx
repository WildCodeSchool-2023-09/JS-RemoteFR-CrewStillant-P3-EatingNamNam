import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import PropTypes from "prop-types";

function EditIngredient({ unit }) {
  // ce state sert à filtrer les ingrédients quand on tape son nom dans l'input
  const [editIngredient, setEditIngredient] = useState([]);
  // ce state sert à afficher un ingrédient quand on le selectionne dans l'option
  const [selectedIngredient, setSelectedIngredient] = useState({});
  // ce state permet de controller le useEffect et le re-render
  const [isNotDeleted, setIsNotDeleted] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleDeleteIngredient = async () => {
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/ingredient/${
        selectedIngredient.id
      }`
    );
    setIsNotDeleted(true);
    // afin de vider le champ de selection
    setSelectedIngredient({});
    reset();
  };

  const handleCancelIngredient = () => {
    setSelectedIngredient({});
    reset();
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/ingredient`)
      .then((res) => setEditIngredient(res.data));
    setIsNotDeleted(false);
  }, [isNotDeleted]);

  // fonction pour filtrer les options ingredients
  const handleIngredientChange = (e) => {
    reset();
    const inputIngredientName = e.target.value;
    setEditIngredient(
      editIngredient.filter((d) => d.name.includes(inputIngredientName))
    );
  };

  const solid = unit[0].mesure_unit;
  const arraysolid = solid.split(" ");
  const liquid = unit[1].mesure_unit;
  const arrayliquid = liquid.split(" ");

  // fonction pour selectionner un ingredient et le modifier ensuite
  const handleEditIngredient = (e) => {
    const selectedIngredientName = e.target.value;
    setSelectedIngredient(
      editIngredient.find((i) => i.name === selectedIngredientName)
    );
  };

  const onSubmit = () => {};

  return (
    <div>
      <h1>Modifier les ingredients</h1>
      <input
        type="text"
        placeholder="modifier l'ingredient"
        onChange={handleIngredientChange}
      />
      <select className="w-48" name="" onChange={handleEditIngredient}>
        <option value="">Liste des ingrédients</option>
        {editIngredient.map((i) => (
          <option key={i.id} value={i.name} id={i.id}>
            {i.name}
          </option>
        ))}
      </select>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="hidden"
            name="id"
            value={selectedIngredient.id}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register("id", { valueAsNumber: "Un nombre est obligatoire" })}
          />
          <input
            type="text"
            name="ingredient"
            value={selectedIngredient.name}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register("ingredient")}
          />
          <input
            type="number"
            name="quantity"
            min={0}
            // eslint-disable-next-line react/jsx-props-no-spreading
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
            name="mesure_unit"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register("mesure_unit", {
              required: "Ce champ est obligatoire",
            })}
          >
            <option value="">Choissisez voter unité de mesure</option>
            {selectedIngredient.unit_id === 1
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
          <label>
            Calories:
            <input
              type="number"
              name="calories"
              placeholder={selectedIngredient.calories}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("calories", {
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
            {errors.calories && (
              <span className="text-red-500">{errors.calories?.message}</span>
            )}
          </label>

          <label>
            Fat:
            <input
              type="number"
              name="fat"
              placeholder={selectedIngredient.fat}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("fat", {
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
            {errors.fat && (
              <span className="text-red-500">{errors.fat?.message}</span>
            )}
          </label>

          <label>
            Sucre:
            <input
              type="number"
              name="sugar"
              placeholder={selectedIngredient.sugar}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("sugar", {
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
            {errors.sugar && (
              <span className="text-red-500">{errors.sugar?.message}</span>
            )}
          </label>

          <label>
            Protein:
            <input
              type="number"
              name="protein"
              placeholder={selectedIngredient.protein}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("protein", {
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
            {errors.protein && (
              <span className="text-red-500">{errors.protein?.message}</span>
            )}
          </label>
          <button type="submit">Je modifie mon ingrédient 🥕</button>
          <button type="button" onClick={handleDeleteIngredient}>
            Je supprime mon ingrédient 🥕
          </button>
          <button type="button" onClick={handleCancelIngredient}>
            J'annule mon ingrédient 🥕
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditIngredient;

EditIngredient.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  unit: PropTypes.oneOfType([
    PropTypes.shape,
    () => null,
    PropTypes.instanceOf(Error),
  ]).isRequired,
};
