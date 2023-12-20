import { NavLink } from "react-router-dom";

import logo from "../assets/logo_et_icones/logo1.png";

function Navbar() {
  return (
    <div className="bg-orangep flex flex-row justify-between">
      <NavLink className="m-2" to="/">
        <img className="h-32 rounded-full" src={logo} alt="logo" />
      </NavLink>
      <div className="text-beigep m-4 flex gap-2">
        <NavLink
          className="hover:text-greenp text-xl h-fit my-auto"
          to="/recettes"
        >
          Mes recettes
        </NavLink>
        <NavLink
          className="hover:text-greenp text-xl h-fit my-auto"
          to="/compte"
        >
          Mon compte
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
