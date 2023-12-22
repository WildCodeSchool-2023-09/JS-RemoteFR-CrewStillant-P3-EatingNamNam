import { useLoaderData } from "react-router-dom";
import Recipes from "../components/Recipes";

function RecipesPage() {
  const { recipe } = useLoaderData();

  return (
    <div>
      <Recipes recipe={recipe} />
    </div>
  );
}

export default RecipesPage;
