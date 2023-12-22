import React from "react";
import PropTypes from "prop-types";

function Recipes({ recipe }) {
  return (
    <div>
      <div>
        <img src={recipe.image} alt={recipe.image} />
        <p>Cooking Time: {recipe.cooking_time}</p>
        <p>Preparation Time: {recipe.preparation_time}</p>
        <p>Difficulty: {recipe.difficulty}</p>
        <p>ID: {recipe.id}</p>
      </div>
      <div>
        <p>Quantity: {recipe.quantity}</p>
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
    quantity: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default Recipes;
