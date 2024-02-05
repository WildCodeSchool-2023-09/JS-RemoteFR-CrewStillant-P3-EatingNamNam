import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo_nav_footer/logo1.png";

function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="w-full mt-8 bg-orange p-4 flex flex-row justify-around text-lg">
      <div className="text-beige flex flex-col justify-around">
        <NavLink className="hover:text-green" to="/Conditions">
          Conditions générales
        </NavLink>
        <NavLink className="hover:text-green" to="/contact">
          Contact
        </NavLink>
      </div>
      <div className="flex flex-row gap-8">
        <button type="button" onClick={() => navigate("/")}>
          <img src={logo} alt="logo" className="rounded-full w-16" />
        </button>
        <div className="text-beige flex flex-col">
          <p>Eating Nam Nam</p>
          <p>12, rue des bananiers</p>
          <p>30000 Nîmes</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
