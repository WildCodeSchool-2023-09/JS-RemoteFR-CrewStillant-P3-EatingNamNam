import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-sea-green.min.css";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

function Carousel({ recipes }) {
  const navigate = useNavigate();
  // create new array for Store the first 5 pieces of data (methode slice?)
  const card = recipes.slice(0, 5);
  return (
    <div>
      <Splide
        options={{
          type: "loop",
          focus: "center",
          rewind: true,
          perMove: 1,
          perPage: 5,
          gap: 10,
          breakpoints: {
            640: {
              perPage: 1,
            },
          },
        }}
        aria-label="React Splide Example"
      >
        {card.map((c) => (
          <SplideSlide
            className="rounded-3xl text-green text-center"
            key={c.id}
          >
            <button type="button" onClick={() => navigate(`/recipe/${c.id}`)}>
              <img
                className="h-32 rounded-3xl flex items-center"
                src={c.image}
                alt={c.title}
              />
              {c.title}
            </button>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
}

Carousel.propTypes = {
  recipes: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default Carousel;
