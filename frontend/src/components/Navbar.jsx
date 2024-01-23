import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import logo from "../assets/logo_nav_footer/logo1.png";

function Navbar({ auth }) {
  return (
    <div className="bg-orange flex flex-row justify-between">
      <NavLink className="m-2" to="/">
        <img className="h-28 rounded-full" src={logo} alt="logo" />
      </NavLink>
      {auth.token && (
        <div className="text-beige m-4 flex gap-3">
          <NavLink
            className="hover:text-green text-xl h-fit my-auto"
            to={`/user/created/${auth.id}`}
          >
            Mes recettes
          </NavLink>
          <NavLink
            className="hover:text-green text-xl h-fit my-auto"
            to={`/user/info/${auth.id}`}
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
        </div>
      )}
    </div>
  );
}

export default Navbar;

Navbar.propTypes = {
  auth: PropTypes.shape().isRequired,
};
