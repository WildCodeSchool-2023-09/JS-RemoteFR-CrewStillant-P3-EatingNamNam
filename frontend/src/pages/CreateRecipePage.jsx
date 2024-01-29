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
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      .then((res) => {
        toast.success(res.data.message);
        navigate(`/recipe/${res.data.id}`);
      });
  };

  return (
    <div className="text-2xl text-black">
      <h1 className="text-green font-bold text-3xl text-center p-2">
        Créez votre recette ici !
      </h1>
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
            className="rounded-2xl mb-3 p-3 bg-orange"
            type="button"
            onClick={handleForm}
          >
            Validez votre recette ici ! 🥕🥕🥕
          </button>
        )}
      </div>
    </div>
  );
}

export default CreateRecipePage;
