import { useEffect, useState } from "react";
import { useOutletContext, NavLink } from "react-router-dom";
import axios from "axios";

export default function UserComments() {
  const { auth } = useOutletContext();
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
    <section className="flex flex-col items-start text-2xl p-2 gap-4 mb-6">
      {!commentRecipe ? (
        <h1>Vous n'avez commenté aucune recette pour le moment !</h1>
      ) : (
        <>
          <h1 className="border-b-4 border-green px-4">
            Mes commentaires postés
          </h1>

          {commentRecipe &&
            commentRecipe.map((r) => (
              <div
                className="flex flex-col gap-2 pb-4 border-b-2 border-green text-xl"
                key={r.id}
              >
                <NavLink to={`/recipe/${r.recipe_id}`}>{r.title}</NavLink>
                <p>{r.comment}</p>
              </div>
            ))}
        </>
      )}
    </section>
  );
}
