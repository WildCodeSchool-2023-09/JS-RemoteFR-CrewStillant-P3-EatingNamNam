import { useEffect, useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import axios from "axios";

export default function UserCreatedRecipe() {
  const { auth } = useOutletContext;
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
  });

  return (
    <section>
      {!createdRecipe ? (
        <h1>Vous n'avez pas posté de recette pour le moment !</h1>
      ) : (
        <>
          <h1>Mes recettes créées</h1>

          {createdRecipe &&
            createdRecipe.map((r) => (
              <NavLink to={`/recipe/${r.recipe_id}`} key={r.id}>
                {r.title}
              </NavLink>
            ))}
        </>
      )}
    </section>
  );
}
