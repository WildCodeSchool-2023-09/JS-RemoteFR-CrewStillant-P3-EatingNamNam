import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
/* eslint-disable react/jsx-props-no-spreading */

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
    <div className="flex flex-col border rounded-2xl items-center mb-3 p-3 text-black bg-orange">
      <div className="flex flex-col gap-4 mb-3">
        <ul>
          {selectedSteps.map((s, index) => (
            <li className="bg-green w-64" key={selectedSteps.indexOf(s)}>
              {" "}
              Etape {index + 1} : {s.step}
              <button type="button" onClick={() => handleDeleteStep(s)}>
                Supprimer cette étape
              </button>
            </li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="step">
          Pensez à détailler votre recette par étape :{" "}
        </label>
        <textarea
          className=" bg-red-700"
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
        <button type="submit">J'envoie mon étape de recette 🥕🥕🥕</button>
      </form>
    </div>
  );
}

RecipeStepForm.propTypes = {
  selectedSteps: PropTypes.arrayOf.isRequired,
  setSelectedSteps: PropTypes.func.isRequired,
};
