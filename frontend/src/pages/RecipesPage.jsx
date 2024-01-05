import { useLoaderData } from "react-router-dom";
import Recipes from "../components/Recipes";

function RecipesPage() {
  const recipes = useLoaderData();

  return (
    <div>
      <Recipes recipe={recipes} />
    </div>
  );
}

export default RecipesPage;
