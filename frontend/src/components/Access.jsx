import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function Access({ setAccessVisible }) {
  const navigate = useNavigate();
  const handleClick = () => {
    setAccessVisible(true);
    localStorage.setItem("accessVisible", true);
  };

  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-green px-6 py-16 sm:px-3.5 sm:before:flex-1">
      {" "}
      <div className="absolute left-0 top-0 justify-items-start ">
        <button type="button" onClick={handleClick}>
          <span className="flex rounded-full bg-lime-550 px-3.5 py-1.5 text-center font-semibold text-xs shadow-sm text-lime-600 ">
            X
          </span>
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {" "}
        <p className="text-center leading-6 text-gray-900 text-2xl">
          <strong className="font-semibold">Eating nam nam 2024</strong>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            aria-hidden="true"
          >
            <circle cx={1} cy={1} r={1} />
          </svg>
          Rejoignez nous pour plus de recettes, de partage et de bonne humeur.
        </p>
        <button
          type="button"
          className="flex-auto rounded-full bg-gray-900 px-3.5 py-1.5 text-center font-semibold text-white shadow-sm"
          onClick={() => {
            navigate("/Login");
          }}
        >
          Se connecter
        </button>
        <button
          type="button"
          className="flex-auto rounded-full bg-gray-900 px-3.5 py-1.5 text-center font-semibold text-white shadow-sm"
          onClick={() => {
            navigate("/Registration");
          }}
        >
          S'inscrire
        </button>
      </div>
    </div>
  );
}
Access.propTypes = {
  setAccessVisible: PropTypes.func.isRequired,
};
