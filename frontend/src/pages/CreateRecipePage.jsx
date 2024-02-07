// import RecipeCreation from "../components/RecipeCreation";
import React, { useState } from "react";
import axios from "axios";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";

import IngredientsForm from "../components/IngredientsForm";
import RecipeStepForm from "../components/RecipeStepForm";
import RecipeInformationForm from "../components/RecipeInformationForm";

function CreateRecipePage() {
  const { auth } = useOutletContext();

  const navigate = useNavigate();
  const { ingredients, unit } = useLoaderData();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [selectedInformations, setSelectedInformations] = useState();

  const handleForm = () => {
    const data = {
      info: selectedInformations,
      ingredients: selectedIngredients,
      steps: selectedSteps,
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/recipe`, data, {
        headers: { Authorization: `Bearer ${auth?.token}` },
      })
      .then((res) => {
        toast.success(res.data.message);
        navigate("/");
      });
  };

  return (
    <section className="sm:min-h-screen">
      <h1 className="text-green font-bold text-5xl text-center mt-10 p-6">
        Créez votre recette ici !
      </h1>
      {!auth && (
        <h2 className="text-center text-2xl mt-8">
          Inscrivez-vous pour accéder au contenu
        </h2>
      )}
      {auth?.token && (
        <div className="text-2xl flex flex-col gap-12 mt-10 text-black items-center">
          <RecipeInformationForm
            selectedInformations={selectedInformations}
            setSelectedInformations={setSelectedInformations}
          />
          {selectedInformations && (
            <IngredientsForm
              ingredients={ingredients.data}
              unit={unit.data}
              selectedIngredients={selectedIngredients}
              setSelectedIngredients={setSelectedIngredients}
            />
          )}
          {selectedIngredients[0] && (
            <RecipeStepForm
              selectedSteps={selectedSteps}
              setSelectedSteps={setSelectedSteps}
            />
          )}
          <div className="flex flex-row justify-center">
            {selectedSteps[0] && (
              <button
                className="rounded-2xl mb-3 p-3 bg-green text-beige hover:text-orange font-semibold"
                type="button"
                onClick={handleForm}
              >
                Validez votre recette ici ! 🥕🥕🥕
              </button>
            )}
          </div>
          <br />
        </div>
      )}
    </section>
  );
}

export default CreateRecipePage;
