import { NavLink, useLoaderData } from "react-router-dom";

function HomePage() {
  const recipes = useLoaderData();

  return (
    <div className="m-20">
      <div>
        <ul className="flex flex-row justify-center flex-wrap gap-16">
          <div className="rounded-2xl w-72 h-80 p-4 bg-green text-center">
            <h1 className="text-beige text-xl">Crée ma recette</h1>
            <NavLink to="/new-recipe">
              <div className="flex flex-col items-center justify-center mt-16">
                <button
                  type="button"
                  className="rounded-full bg-beige p-10 text-green font-bold text-4xl"
                >
                  +
                </button>
              </div>
            </NavLink>
          </div>

          {recipes &&
            recipes.map((r) => (
              <li
                key={r.id}
                className="rounded-2xl w-72 h-80 p-4 bg-green text-center"
              >
                <h1 className="text-beige text-2xl mb-1 uppercase">
                  {r.title}
                </h1>
                <div className="flex flex-row justify-between">
                  <p className="text-beige mb-2">Difficulté:{r.difficulty}</p>
                  <p className="text-beige mb-2">
                    Temps:{r.preparation_time}min
                  </p>
                </div>
                <img
                  src={r.image}
                  alt={r.image}
                  className="rounded-2xl relative self-end"
                />
                <div className="flex flex-col items-center justify-center">
                  <NavLink to={`/recipe/${r.id}`}>
                    <button
                      type="button"
                      className="border bg-green text-beige p-1.5 absolute"
                    >
                      En savoir plus
                    </button>
                  </NavLink>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
