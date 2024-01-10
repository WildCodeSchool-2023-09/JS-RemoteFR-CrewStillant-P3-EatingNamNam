import { useLoaderData } from "react-router-dom";
import Recipes from "../components/Recipes";
import CommentForm from "../components/CommentForm";

function RecipesPage() {
  const recipes = useLoaderData();
  return (
    <div>
      <Recipes recipe={recipes} />
      <CommentForm recipeID={recipes.id} />
    </div>
  );
}

export default RecipesPage;
