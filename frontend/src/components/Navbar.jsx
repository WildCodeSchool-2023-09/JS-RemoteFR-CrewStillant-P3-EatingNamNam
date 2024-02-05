import { NavLink } from "react-router-dom";

import PropTypes from "prop-types";

import logo from "../assets/logo_nav_footer/logo1.png";

function Navbar({ auth }) {
  return (
    <nav className="bg-orange flex flex-row justify-between w-full">
      <NavLink className="m-2" to="/">
        <img className="h-28 rounded-full" src={logo} alt="logo" />
      </NavLink>
      <div className="text-beige m-4 flex gap-3">
        {!auth?.token ? (
          <>
            <NavLink
              className="hover:text-green text-xl h-fit my-auto"
              to="/login"
            >
              Connexion
            </NavLink>
            <NavLink
              className="hover:text-green text-xl h-fit my-auto"
              to="/registration"
            >
              Inscription
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              className="hover:text-green text-xl h-fit my-auto"
              to="/user/created"
            >
              Mes recettes
            </NavLink>
            <NavLink
              className="hover:text-green text-xl h-fit my-auto"
              to="/user/info"
            >
              Mon compte
            </NavLink>
            {auth.role === "admin" ? (
              <NavLink
                className="hover:text-green text-xl h-fit my-auto"
                to="/admin"
              >
                Administration du site
              </NavLink>
            ) : null}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

Navbar.propTypes = {
  auth: PropTypes.shape().isRequired,
};
