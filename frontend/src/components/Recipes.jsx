import React from "react";
import PropTypes from "prop-types";

function Recipes({ recipe }) {
  return (
    <div>
      <div>
        <img src={recipe.image} alt={recipe.image} />
        <p>Préparation: {recipe.preparation_time}</p>
        <p>Cuisson: {recipe.cooking_time}</p>
        <p>Difficulté: {recipe.difficulty}</p>
      </div>
    </div>
  );
}

Recipes.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string.isRequired,
    cooking_time: PropTypes.number.isRequired,
    preparation_time: PropTypes.number.isRequired,
    difficulty: PropTypes.number.isRequired,
  }).isRequired,
};

export default Recipes;
