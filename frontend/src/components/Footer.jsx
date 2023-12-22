import { NavLink } from "react-router-dom";

import pictureYoutube from "../assets/logo_nav_footer/img-youtube.png";
import pictureTwitch from "../assets/logo_nav_footer/img-twitch.png";
import pictureinsta from "../assets/logo_nav_footer/img-insta.png";

function Footer() {
  return (
    <div>
      <div className="bg-orange grid grid-cols-2 gap-7">
        <div className="text-beige ml-2 grid grid-rows-3 p-2">
          <NavLink className="hover:text-green text-l h-fit my-auto" to="/">
            Conditions générales
          </NavLink>
          <NavLink className="hover:text-green text-l h-fit my-auto" to="/">
            Mention légales
          </NavLink>
          <NavLink className="hover:text-green text-l h-fit my-auto" to="/">
            Données personnelles et sécurité
          </NavLink>
        </div>
        <div className="text-beige grid grid-rows-4 m-4">
          <p className="text-l h-fit my-auto">Eating Nam Nam</p>
          <p className="text-l h-fit my-auto">Adresse</p>
          <NavLink className="hover:text-green text-l h-fit my-auto" to="/">
            A propos
          </NavLink>
          <NavLink
            className="hover:text-green text-l h-fit my-auto"
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
      <div className="bg-orange flex flex-row justify-center p-2">
        <NavLink to="/">
          <img className="h-10" src={pictureYoutube} alt="youtube" />
        </NavLink>
        <NavLink to="/">
          <img className="h-10" src={pictureinsta} alt="instagram" />
        </NavLink>
        <NavLink to="/">
          <img className="h-10" src={pictureTwitch} alt="twitch" />
        </NavLink>
      </div>
    </div>
  );
}

export default Footer;
