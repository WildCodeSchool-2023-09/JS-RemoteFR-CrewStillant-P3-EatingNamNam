import { NavLink, useLoaderData } from "react-router-dom";

import timer from "../assets/timer/minuteur.png";
import difficult from "../assets/logo_difficulty/diff-chef.png";
import diffNone from "../assets/logo_difficulty/diff-chef-none.png";

import Carousel from "../components/carousel/Carousel";

function HomePage() {
  const recipes = useLoaderData();

  const difficultyEmoji = (difficulty) => {
    switch (difficulty) {
      case 1:
        return <img className="h-8 w-8" src={difficult} alt={difficult} />;
      case 2:
        return (
          (<img className="h-8 w-8" src={difficult} alt={difficult} />),
          (<img className="h-8 w-8" src={difficult} alt={difficult} />)
        );
      case 3:
        return (
          (<img className="h-8 w-8" src={difficult} alt="" />),
          (<img className="h-8 w-8" src={difficult} alt="" />),
          (<img className="h-8 w-8" src={difficult} alt="" />)
        );
      default:
        return <img className="h-8 w-8" src={diffNone} alt="" />;
    }
  };
  return (
    <div className="bg-beige">
      <div>
        <Carousel recipes={recipes} />
        <ul className="flex flex-row justify-center flex-wrap gap-10">
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
                className="rounded-2xl w-72 h-80 p-0 bg-green text-center"
              >
                <h1 className="text-beige text-2xl m-2 uppercase">{r.title}</h1>
                <div className="flex flex-row justify-around m-5">
                  <div>{difficultyEmoji(r.difficulty)}</div>
                  <img className="h-8 w-8 ml-32" src={timer} alt="" />
                  <p className="text-beige">: {r.preparation_time}min</p>
                </div>
                <img
                  src={r.image}
                  alt={r.image}
                  className="rounded-2xl mt-4 object-cover"
                />
                <div className="flex flex-col items-center justify-center">
                  <NavLink
                    to={`/recipe/${r.id}`}
                    className="rounded-xl mb-16 bg-green text-beige p-1.5 absolute"
                  >
                    En savoir plus
                  </NavLink>
                </div>
              </li>
            ))}
          {/* // object-cover */}
        </ul>
      </div>
    </div>
  );
}

export default HomePage;
