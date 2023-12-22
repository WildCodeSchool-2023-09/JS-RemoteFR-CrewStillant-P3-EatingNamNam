import { NavLink } from "react-router-dom";

import logo from "../assets/logo_nav_footer/logo1.png";

function Navbar() {
  return (
    <div className="bg-orange flex flex-row justify-between">
      <NavLink className="m-2" to="/">
        <img className="h-32 rounded-full" src={logo} alt="logo" />
      </NavLink>
      <div className="text-beige m-4 flex gap-3">
        <NavLink className="hover:text-green text-xl h-fit my-auto" to="/">
          Mes recettes
        </NavLink>
        <NavLink className="hover:text-green text-xl h-fit my-auto" to="/">
          Mon compte
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
