import { NavLink, useLoaderData } from "react-router-dom";
import { useState } from "react";

import Carousel from "../components/carousel/Carousel";

function HomePage() {
  const recipes = useLoaderData();

  const difficultyEmoji = (difficulty) => {
    switch (difficulty) {
      case 1:
        return "🧑🏻‍🍳";
      case 2:
        return "🧑🏻‍🍳🧑🏻‍🍳";
      case 3:
        return "🧑🏻‍🍳🧑🏻‍🍳🧑🏻‍🍳";
      default:
        return "❓";
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

  const handleFilter = (e) => {
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
    <div className="m-20">
      <div className="border-solid border-y-4 border-green m-10">
        <div className="m-10 flex flex-row justify-center text-xl gap-6 ">
          <button
            type="button"
            className="bg-green text-beige p-4 rounded-2xl border border-beige w-16"
            onClick={() => handleFilter("All")}
          >
            All
          </button>
          <button
            type="button"
            className="bg-green text-beige p-4 rounded-2xl border border-beige w-28"
            onClick={() => handleFilter("healthy")}
          >
            Healthy
          </button>
          <button
            type="button"
            className="bg-green text-beige p-4 rounded-2xl border border-beige w-28"
            onClick={() => handleFilter("light")}
          >
            Light
          </button>
          <button
            type="button"
            className="bg-green text-beige p-4 rounded-2xl border border-beige w-28"
            onClick={() => handleFilter("fat")}
          >
            Fat
          </button>
          <div>
            <input
              type="input"
              placeholder="rechercher par nom"
              className="bg-green text-beige p-4 rounded-2xl"
              value={searchText}
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="m-10 flex flex-row justify-center text-xl gap-6">
          <label className="bg-green text-beige p-2 rounded-2xl border border-beige">
            Difficulté:
            <select
              className="bg-green text-beige p-2 rounded-2xl border border-beige m-1"
              onChange={difficultyFiltered}
            >
              <option value="">Tous</option>
              <option value="1">🧑🏻‍🍳</option>
              <option value="2">🧑🏻‍🍳🧑🏻‍🍳</option>
              <option value="3">🧑🏻‍🍳🧑🏻‍🍳🧑🏻‍🍳</option>
            </select>
          </label>
          <label className="bg-green text-beige p-2 rounded-2xl border border-beige">
            Temps:
            <select
              className="bg-green text-beige p-2 rounded-2xl border border-beige m-1"
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
        <Carousel recipes={recipes} />
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
              className="rounded-2xl w-72 h-80 p-4 bg-green text-center"
            >
              <h1 className="text-beige text-2xl mb-1 uppercase">{r.title}</h1>
              <div className="flex flex-row justify-between">
                <div>{difficultyEmoji(r.difficulty)}</div>
                <p className="text-beige mb-2">
                  Temps : {r.preparation_time} min
                </p>
              </div>
              <img
                src={r.image}
                alt={r.image}
                className="rounded-2xl relative self-end"
              />
              <div className="flex flex-col items-center justify-center">
                <NavLink
                  to={`/recipe/${r.id}`}
                  className="border bg-green text-beige p-1.5 absolute"
                >
                  En savoir plus
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
