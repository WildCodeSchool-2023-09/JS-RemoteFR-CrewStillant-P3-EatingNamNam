import { useState } from "react";
import PropTypes from "prop-types";
import RegistrationForm from "./RegistrationForm";
import Login from "./Login";

export default function Access({ setAccessVisible }) {
  const [isVisible, setIsVisible] = useState(false);
  const [option, setOption] = useState(false);
  const handleClick = () => {
    setAccessVisible(true);
    localStorage.setItem("accessVisible", true);
  };

  return (
    <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-green px-6 py-16 sm:px-3.5 sm:before:flex-1">
      {!isVisible ? (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-center leading-6 text-gray-900 text-2xl">
            <strong className="font-semibold">Eating nam nam 2024</strong>
            <svg
              viewBox="0 0 2 2"
              className="mx-2 inline h-0.5 w-0.5 fill-current"
              aria-hidden="true"
            >
              <circle cx={1} cy={1} r={1} />
            </svg>
            Rejoigner nous pour plus de recettes de partage et de bonne humeur.
          </p>

          <button
            type="button"
            className="flex-auto rounded-full bg-gray-900 px-3.5 py-1.5 text-center font-semibold text-white shadow-sm"
            onClick={() => {
              setIsVisible(true);
              setOption(true);
            }}
          >
            Se connecter
          </button>
          <button
            type="button"
            className="flex-auto rounded-full bg-gray-900 px-3.5 py-1.5 text-center font-semibold text-white shadow-sm"
            onClick={() => {
              setIsVisible(true);
            }}
          >
            S'inscrire
          </button>
          <div className="flex flex-auto justify-end">
            <button type="button" onClick={handleClick}>
              <span className="flex rounded-full bg-lime-700 px-3.5 py-1.5 text-center font-semibold text-white shadow-sm ">
                Ne plus afficher ce message
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          {option ? <Login /> : <RegistrationForm setOption={setOption} />}
        </div>
      )}
    </div>
  );
}
Access.propTypes = {
  setAccessVisible: PropTypes.func.isRequired,
};
