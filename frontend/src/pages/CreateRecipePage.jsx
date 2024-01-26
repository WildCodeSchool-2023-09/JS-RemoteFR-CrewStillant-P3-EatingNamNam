// import RecipeCreation from "../components/RecipeCreation";
import React, { useState } from "react";
import axios from "axios";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import IngredientsForm from "../components/IngredientsForm";
import RecipeStepForm from "../components/RecipeStepForm";
import RecipeInformationForm from "../components/RecipeInformationForm";
import CreateIngredient from "../components/CreateIngredient";

function CreateRecipePage() {
  const navigate = useNavigate();

  const { auth } = useOutletContext();

  const { ingredients, unit } = useLoaderData();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [selectedInformations, setSelectedInformations] = useState([]);
  const [isCreatedingredient, setIsCreatedIngredient] = useState(false);

  const handleForm = () => {
    const data = {
      info: selectedInformations,
      ingredients: selectedIngredients,
      steps: selectedSteps,
      user_id: auth.userVerified.id,
    };
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/recipe`, data)
      .then((res) => navigate(`/recipe/${res.data.id}`));
  };
  return (
    <div className="">
      <h1 className="text-red-500">CreateRecipePage</h1>
      <RecipeInformationForm
        selectedInformations={selectedInformations}
        setSelectedInformations={setSelectedInformations}
      />
      <IngredientsForm
        ingredients={ingredients.data}
        unit={unit.data}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
        isCreatedingredient={isCreatedingredient}
        setIsCreatedIngredient={setIsCreatedIngredient}
      />
      <CreateIngredient
        isCreatedingredient={isCreatedingredient}
        setIsCreatedIngredient={setIsCreatedIngredient}
      />
      <RecipeStepForm
        selectedSteps={selectedSteps}
        setSelectedSteps={setSelectedSteps}
      />
      <div>
        {selectedInformations === "" ||
        selectedIngredients === "" ||
        selectedSteps === "" ? (
          <p className="border rounded-2xl justify-evenly mb-3 p-3 text-black bg-orange">
            Pensez à bien remplir toutes les informations pour valider votre
            recette 🥕🥕🥕
          </p>
        ) : (
          <button
            className="border rounded-2xl justify-evenly mb-3 p-3 text-black bg-orange"
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
