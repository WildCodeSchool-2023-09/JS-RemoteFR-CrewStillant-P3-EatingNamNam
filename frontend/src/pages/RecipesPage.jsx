import { useLoaderData } from "react-router-dom";
import Recipes from "../components/Recipes";

function RecipesPage() {
  const { data } = useLoaderData();

  return (
    <div>
      <Recipes recipeId={data} />
    </div>
  );
}

export default RecipesPage;
