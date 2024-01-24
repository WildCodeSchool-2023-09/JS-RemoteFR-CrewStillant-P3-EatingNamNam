import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Recipes from "../components/Recipes";
import CommentForm from "../components/CommentForm";

function RecipesPage() {
  const { recipe, notation } = useLoaderData();
  // States pour générer un nouvel affichage de la recette avec le commentaire juste posté

  const [isValidated, setIsValidated] = useState(false);
  const [updatedData, setUpdatedData] = useState(recipe);

  useEffect(() => {
    if (isValidated) {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/recipe/${recipe.infos.id}`
        )
        .then((res) => setUpdatedData(res.data))
        .then(setIsValidated(false));
    }
  }, [isValidated]);

  return (
    <div>
      <Recipes recipe={updatedData} notation={notation} />
      <CommentForm
        recipeID={updatedData.infos.id}
        isValidated={isValidated}
        setIsValidated={setIsValidated}
      />
    </div>
  );
}

export default RecipesPage;
