/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import closeCross from "../assets/bouton-fermer.png";

export default function RecipeStepForm({ selectedSteps, setSelectedSteps }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setSelectedSteps([...selectedSteps, data]);
    reset();
  };

  const handleDeleteStep = (element) => {
    const index = selectedSteps.findIndex((e) => e === element);
    setSelectedSteps(selectedSteps.toSpliced(index, 1));
  };
  return (
    <div className="border-green text-center mx-4 sm:w-[95rem] h-fit flex flex-col items-center gap-4 border-4 rounded-2xl p-4 bg-slate-200">
      <h2 className="text-green text-4xl font-semibold p-8">
        Détaillez les étapes de réalisation de votre recette
      </h2>
      <ul className="flex flex-col gap-8">
        {selectedSteps.map((s, index) => (
          <li
            className="flex flex-col gap-4 items-start px-4"
            key={selectedSteps.indexOf(s)}
          >
            <span className="flex flex-row gap-4">
              <p className="underline underline-offset-4">
                Etape {index + 1} :
              </p>
              <button
                className="w-6"
                type="button"
                onClick={() => handleDeleteStep(s)}
              >
                <img src={closeCross} alt="Retirer l'étape" />
              </button>
            </span>
            <p className="text-balance pl-4">{s.step}</p>
          </li>
        ))}
      </ul>
      <form
        className="flex flex-col items-center gap-2 pt-8 sm:w-[50rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          className="w-80 sm:w-full"
          placeholder="Etape :"
          name="step"
          {...register("step", {
            required: "ce champ est obligatoire",
            minLength: {
              value: 10,
              message:
                "Votre étape est trop courte, un peu plus de détails serait mieux",
            },
            maxLenght: {
              value: 1000,
              message:
                "Vous avez tapé trop de caractères, pensez à créer une nouvelle étape ;)",
            },
          })}
        />
        {errors.step && (
          <span className="bg-red-600 text-white py-1 px-4" role="alert">
            {errors.step?.message}
          </span>
        )}
        <br />
        <button
          className="bg-green text-beige rounded-2xl px-4 p-2 hover:bg-green hover:text-orange"
          type="submit"
        >
          Valider cette étape
        </button>
      </form>
      <br />
    </div>
  );
}

RecipeStepForm.propTypes = {
  selectedSteps: PropTypes.arrayOf.isRequired,
  setSelectedSteps: PropTypes.func.isRequired,
};
