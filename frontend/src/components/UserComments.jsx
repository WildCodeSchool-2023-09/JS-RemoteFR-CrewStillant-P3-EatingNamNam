import { useEffect, useState } from "react";
import { useOutletContext, NavLink } from "react-router-dom";
import axios from "axios";

export default function UserComments() {
  const { auth } = useOutletContext;
  const [commentRecipe, setCommentRecipe] = useState();

  useEffect(() => {
    try {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/comment`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => setCommentRecipe(res.data));
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <section>
      {!commentRecipe ? (
        <h1>Vous n'avez commenté aucune recette pour le moment !</h1>
      ) : (
        <>
          <h1>Mes commentaires postés</h1>

          {commentRecipe &&
            commentRecipe.map((r) => (
              <>
                <NavLink to={`/recipe/${r.recipe_id}`} key={r.id}>
                  {r.title}
                </NavLink>
                <p>{r.comment}</p>
              </>
            ))}
        </>
      )}
    </section>
  );
}
