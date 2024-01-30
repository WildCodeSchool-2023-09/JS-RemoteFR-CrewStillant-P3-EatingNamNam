import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";

function CreateIngredient({ setIsCreatedIngredient, setIsVisible }) {
  const { auth } = useOutletContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/ingredient`, data, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => console.info(res.data))
      .then(setIsCreatedIngredient(true));
    reset();
    setIsVisible(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-5 w-full"
    >
      <p className="p-5 text-3xl ">
        Pour créer un nouvel ingrédient, veuillez remplir les champs suivants :
      </p>
      <div className="flex flex-col text-2xl items-end px-12 border-t-4 border-green">
        <br />
        <div className="flex flex-row gap-8">
          <label htmlFor="name">Nom de l'ingrédient : </label>
          <input
            className="h-10 w-48 text-black"
            type="text"
            name="name"
            placeholder="ex:Banane"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register("name", {
              required: "Ce champ est obligatoire",
              minLength: { value: 3, message: "Minimum 3 caractères" },
            })}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name?.message}</span>
          )}
        </div>
        <br />
        <div className="flex flex-row gap-8">
          <label htmlFor="calories">Calories (pour 100g) : </label>
          <input
            className="h-10 w-48 text-black"
            type="number"
            name="calories"
            placeholder="ex : 250"
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
        </div>
        <br />
        <div className="flex flex-row gap-8">
          <label htmlFor="fat">Lipides (pour 100g) : </label>
          <input
            className="h-10 w-48 text-black"
            type="number"
            name="fat"
            placeholder="ex : 45"
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
        </div>
        <br />
        <div className="flex flex-row gap-8">
          <label htmlFor="sugar">Glucides (pour 100g) : </label>
          <input
            className="h-10 w-48 text-black"
            type="number"
            name="sugar"
            placeholder="ex : 45"
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
        </div>
        <br />
        <div className="flex flex-row gap-8">
          <label htmlFor="protein">Protéines (pour 100g) : </label>
          <input
            className="h-10 w-48 text-black"
            type="number"
            name="protein"
            placeholder="ex : 25"
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
        </div>
        <br />
        <div className="flex flex-row gap-8">
          <label htmlFor="unit_id">Liquide ou solide : </label>
          <select
            className="h-10 w-48 text-black"
            name="unit_id"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register("unit_id", {
              required: "Ce champ est obligatoire",
              valueAsNumber: "Un nombre est obligatoire",
            })}
          >
            <option value="">---</option>
            <option value="2">Liquide</option>
            <option value="1">Solide</option>
          </select>
          {errors.unit_id && (
            <span className="text-red-500">{errors.unit_id?.message}</span>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-5 px-24 p-8 border-b-4 border-green">
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="bg-green rounded-3xl h-12 w-32 hover:text-orange font-semibold"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="bg-green rounded-3xl h-12 w-52 hover:text-orange font-semibold"
        >
          Créer l'ingrédient
        </button>
      </div>
    </form>
  );
}

export default CreateIngredient;

CreateIngredient.propTypes = {
  setIsCreatedIngredient: PropTypes.func.isRequired,
  setIsVisible: PropTypes.func.isRequired,
};
