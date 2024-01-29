import { NavLink, useLoaderData, useOutletContext } from "react-router-dom";
import { useState } from "react";

import Carousel from "../components/carousel/Carousel";
import timer from "../assets/timer/minuteur.png";
import difficult from "../assets/logo_difficulty/diff-chef.png";
import diffNone from "../assets/logo_difficulty/diff-chef-none.png";

import Access from "../components/Access";

function HomePage() {
  const { auth } = useOutletContext();
  const recipes = useLoaderData();
  const [accessVisible, setAccessVisible] = useState(
    localStorage.getItem("accessVisible")
  );

  const difficultyEmoji = (difficulty) => {
    switch (difficulty) {
      case 1:
        return (
          <>
            <img src={difficult} alt={difficult} width={32} />
            <img src={diffNone} alt="" width={32} />
            <img src={diffNone} alt="" width={32} />
          </>
        );
      case 2:
        return (
          <>
            <img src={difficult} alt={difficult} width={32} />
            <img src={difficult} alt={difficult} width={32} />
            <img src={diffNone} alt="" width={32} />
          </>
        );
      case 3:
        return (
          <>
            <img src={difficult} alt="" width={32} />
            <img src={difficult} alt="" width={32} />
            <img src={difficult} alt="" width={32} />
          </>
        );
      default:
        return <img src={diffNone} alt="" width={32} />;
    }
  };

  const checkTime = (time, cooking) => {
    const timePreparation = parseInt(time, 10);
    switch (cooking) {
      case "10-20":
        return timePreparation >= 10 && timePreparation <= 20;
      case "20-30":
        return timePreparation > 20 && timePreparation <= 30;
      case "35+":
        return timePreparation > 35;
      default:
        return false;
    }
  };

  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const filterRecipes = (text, type, difficulty, time) => {
    const updatedRecipes = recipes.filter(
      (r) =>
        (type === "All" || r.type === type) &&
        (difficulty === "" || r.difficulty.toString() === difficulty) &&
        (time === "" || checkTime(r.preparation_time, time))
    );
    setFilteredRecipes(updatedRecipes);
  };

  const handleSearch = (e) => {
    const text = e.target.value;
    setSearchText(text);
    const searchData = recipes.filter((d) =>
      d.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRecipes(searchData);
  };

  const handleAllFilters = (e) => {
    setSelectedType(e);
    filterRecipes(searchText, selectedType, selectedDifficulty, selectedTime);
  };

  const difficultyFiltered = (e) => {
    const difficulty = e.target.value;
    setSelectedDifficulty(difficulty);
    filterRecipes(searchText, selectedType, difficulty, selectedTime);
  };

  const handleTimeFilter = (e) => {
    const time = e.target.value;
    setSelectedTime(time);
    filterRecipes(searchText, selectedType, selectedDifficulty, time);
  };

  return (
    <div>
      <div>
        {accessVisible ? (
          ""
        ) : (
          <Access
            setAccessVisible={setAccessVisible}
            accessVisible={accessVisible}
          />
        )}
        {auth?.pseudo ? (
          <h1 className="text-center text-5xl mt-8 text-orange">
            Bienvenu {auth.pseudo} !
          </h1>
        ) : null}
        <Carousel recipes={recipes} />
        <div className="border-solid border-y-4 border-orange m-10">
          <div className="m-10 flex flex-col md:flex-row justify-center align-center text-xl gap-2 md:gap-6">
            <button
              type="button"
              className="bg-orange text-beige p-4 rounded-2xl border border-beige md:w-32"
              onClick={() => handleAllFilters("All")}
            >
              All
            </button>
            <button
              type="button"
              className="bg-orange text-beige p-4 rounded-2xl border border-beige md:w-32"
              onClick={() => handleAllFilters("healthy")}
            >
              Healthy
            </button>
            <button
              type="button"
              className="bg-orange text-beige p-4 rounded-2xl border border-beige  md:w-32"
              onClick={() => handleAllFilters("light")}
            >
              Light
            </button>
            <button
              type="button"
              className="bg-orange text-beige p-4 rounded-2xl border border-beige  md:w-32"
              onClick={() => handleAllFilters("fat")}
            >
              Fat
            </button>
            <input
              type="input"
              placeholder="rechercher par nom"
              className="bg-orange text-beige p-4 rounded-2xl"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
          <div className="m-10 flex flex-row justify-center text-xl gap-6">
            <label className="bg-orange text-beige p-2 rounded-2xl border border-beige w-36 md:w-52">
              Difficulté:
              <select
                className="bg-orange text-beige p-2 rounded-2xl border border-beige m-1 w-28 md:w-36"
                onChange={difficultyFiltered}
              >
                <option value="">Tous</option>
                <option value="1">facile</option>
                <option value="2">moyen</option>
                <option value="3">difficile</option>
              </select>
            </label>
            <label className="bg-orange text-beige p-2 rounded-2xl border border-beige w-36 md:w-52">
              Temps:
              <select
                className="bg-orange text-beige p-2 rounded-2xl border border-beige m-1  w-28  md:w-36"
                onChange={handleTimeFilter}
              >
                <option value="">Tous</option>
                <option value="10-20">10-20min</option>
                <option value="20-30">20-30min</option>
                <option value="35+">plus de 35min</option>
              </select>
            </label>
          </div>
        </div>
        <div>
          <div className={!auth?.pseudo ? "blur-sm" : null}>
            <ul className="flex flex-row justify-center flex-wrap gap-16">
              <div className="rounded-2xl w-72 h-80 p-4 bg-green text-center">
                <h1 className="text-beige text-2xl">Créer ma recette</h1>
                <NavLink to="/createrecipe">
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
              {filteredRecipes.map((r) => (
                <li
                  key={r.id}
                  className="rounded-2xl w-72 h-max-80 p-0 bg-green text-center"
                >
                  <h1 className="text-beige text-lg m-2 uppercase">
                    {r.title}
                  </h1>
                  <div className="flex flex-col justify-between m-2">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row">
                        {difficultyEmoji(r.difficulty)}
                      </div>
                      <div className="flex flex-row text-2xl">
                        <img src={timer} alt="timer" width={32} />
                        <p>{r.preparation_time}'</p>
                      </div>
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
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
