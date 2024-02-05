import { NavLink, useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import logo from "../assets/logo_nav_footer/logo1.png";

function Navbar({ auth, setAuth }) {
  const navigate = useNavigate();

  const logout = () => {
    setAuth();
    navigate("/");
  };

  return (
    <nav className="bg-orange p-2 flex flex-row sm:text-xl items-center w-full gap-4">
      <NavLink to="/">
        <img className="w-24 rounded-full" src={logo} alt="logo" />
      </NavLink>
      <div className="text-beige flex flex-row justify-between sm:justify-end sm:gap-4 sm:pr-6 w-full">
        {!auth?.token ? (
          <>
            <NavLink
              className="hover:text-green hover:border-b-2 hover:border-green"
              to="/login"
            >
              Connexion
            </NavLink>
            <NavLink
              className="hover:text-green hover:border-b-2 hover:border-green"
              to="/registration"
            >
              Inscription
            </NavLink>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center sm:flex-row sm:gap-4 gap-2">
              <NavLink
                className="hover:text-green hover:border-b-2 hover:border-green"
                to="/user/created"
              >
                Mes recettes
              </NavLink>
              <NavLink
                className="hover:text-green hover:border-b-2 hover:border-green"
                to="/user/info"
              >
                Mon compte
              </NavLink>
            </div>
            <div className="flex flex-col items-center sm:flex-row sm:gap-4 gap-2">
              {auth.role === "admin" && (
                <NavLink
                  className="hover:text-green hover:border-b-2 hover:border-green"
                  to="/admin"
                >
                  Administration du site
                </NavLink>
              )}
              <button
                type="button"
                className="hover:text-green hover:border-b-2 hover:border-green"
                onClick={logout}
              >
                Se déconnecter
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

Navbar.propTypes = {
  auth: PropTypes.shape().isRequired,
  setAuth: PropTypes.func.isRequired,
};
