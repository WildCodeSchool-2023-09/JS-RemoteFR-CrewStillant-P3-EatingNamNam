import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

function CreateIngredient({ setIsCreatedIngredient }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.info(data);
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/ingredient`, data)
      .then((res) => setIsCreatedIngredient(res.data))
      .then(setIsCreatedIngredient(true));
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <p>
        Si votre ingrédient ne figure pas sur la liste, vous pouvez le créer
      </p>
      <label>
        Nom de l'ingrédient:
        <input
          type="text"
          name="name"
          placeholder="Entrer l'ingrédient"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register("name", {
            required: "Ce champ est obligatoire",
            minLength: { value: 3, message: "Minimum 3 caractères" },
          })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name?.message}</span>
        )}
      </label>

      <label>
        Calories:
        <input
          type="number"
          name="calories"
          placeholder="Entrer les calories"
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
          placeholder="Entrer les gras"
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
          placeholder="Entrer le sucre"
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
          placeholder="Entrer les protéines"
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

      <label>
        Ingrédient liquide ou solide :
        <select
          name="unit_id"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register("unit_id", {
            required: "Ce champ est obligatoire",
            valueAsNumber: "Un nombre est obligatoire",
          })}
        >
          <option value="">All</option>
          <option value="2">Liquide</option>
          <option value="1">Solide</option>
        </select>
        {errors.unit_id && (
          <span className="text-red-500">{errors.unit_id?.message}</span>
        )}
      </label>

      <button type="submit">Ajouter l'ingrédient</button>
    </form>
  );
}

export default CreateIngredient;

CreateIngredient.propTypes = {
  setIsCreatedIngredient: PropTypes.arrayOf.isRequired,
};
