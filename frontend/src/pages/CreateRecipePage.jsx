// import RecipeCreation from "../components/RecipeCreation";
import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import IngredientsForm from "../components/IngredientsForm";
import RecipeStepForm from "../components/RecipeStepForm";
import RecipeInformationForm from "../components/RecipeInformationForm";

function CreateRecipePage() {
  const { ingredients, unit } = useLoaderData();
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [selectedInformations, setSelectedInformations] = useState([]);
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
      />
      <RecipeStepForm
        selectedSteps={selectedSteps}
        setSelectedSteps={setSelectedSteps}
      />
    </div>
  );
}

export default CreateRecipePage;
