import { useEffect, useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import axios from "axios";

export default function UserCreatedRecipe() {
  const { auth } = useOutletContext();
  const [createdRecipe, setCreatedRecipe] = useState();
  useEffect(() => {
    try {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/recipe`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => setCreatedRecipe(res.data));
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <section className="flex flex-col items-start text-2xl p-2 gap-4 mb-6">
      {!createdRecipe ? (
        <h1>Vous n'avez pas posté de recette pour le moment !</h1>
      ) : (
        <>
          <h1 className="border-b-4 border-green px-4">Mes recettes créées</h1>
          <div className="flex flex-col gap-2">
            {createdRecipe &&
              createdRecipe.map((r) => (
                <NavLink
                  to={`/recipe/${r.recipe_id}`}
                  key={r.id}
                  className="text-xl"
                >
                  {r.title}
                </NavLink>
              ))}
          </div>
        </>
      )}
    </section>
  );
}
