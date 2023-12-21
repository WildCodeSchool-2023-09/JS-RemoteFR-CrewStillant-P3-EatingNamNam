import { NavLink } from "react-router-dom";

import pictureYoutube from "../assets/logo_nav_footer/img-youtube.png";
import pictureTwitch from "../assets/logo_nav_footer/img-twitch.png";
import pictureinsta from "../assets/logo_nav_footer/img-insta.png";

function Footer() {
  return (
    <div className="bg-orange flex flex-row justify-between">
      <div className="text-beige m-4 flex gap-2">
        <NavLink className="hover:text-green text-l h-fit my-auto" to="/">
          Conditions générales
        </NavLink>
        <NavLink className="hover:text-green text-l h-fit my-auto" to="/">
          Mention légales
        </NavLink>
        <NavLink className="hover:text-green text-l h-fit my-auto" to="/">
          A propos
        </NavLink>
      </div>
      <div className="text-beige m-4 flex gap-2">
        <p className="text-l h-fit my-auto">Eating Nam Nam</p>
        <p className="text-l h-fit my-auto">Adresse</p>
        <NavLink className="hover:text-green text-l h-fit my-auto" to="/">
          Données personelles et sécurité
        </NavLink>
        <NavLink
          className="hover:text-green text-l h-fit my-auto"
          to="/contact"
        >
          Contact
        </NavLink>
      </div>
      <div className="flex inline-block">
        <NavLink className="m-2" to="/">
          <img className="h-12" src={pictureYoutube} alt="youtube" />
        </NavLink>
        <NavLink className="m-2" to="/">
          <img className="h-12" src={pictureinsta} alt="instagram" />
        </NavLink>
        <NavLink className="m-2" to="/">
          <img className="h-12" src={pictureTwitch} alt="twitch" />
        </NavLink>
      </div>
    </div>
  );
}

export default Footer;
