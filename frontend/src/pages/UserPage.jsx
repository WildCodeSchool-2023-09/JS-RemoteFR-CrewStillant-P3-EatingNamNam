import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function UserPage() {
  const { auth } = useOutletContext();
  const decoded = auth && jwtDecode(auth.token);

  const navUser = [
    {
      id: 1,
      path: `/user/info/${decoded.sub}`,
      name: "Mon profil",
    },
    {
      id: 2,
      path: `/user/created/${decoded.sub}`,
      name: "Mes recettes créées",
    },
    {
      id: 3,
      path: `/user/favorites/${decoded.sub}`,
      name: "Mes recettes favorites",
    },
    {
      id: 4,
      path: `/user/comments/${decoded.sub}`,
      name: "Mes commentaires",
    },
  ];
  return (
    <div>
      <div className="flex flex-row flex-wrap rounded-md py-2 bg-orange mx-6 my-12 gap-2 w-fit">
        {navUser.map((n) => (
          <NavLink
            to={n.path}
            key={n.id}
            className="px-2 focus:text-green focus:font-bold"
          >
            {n.name}
          </NavLink>
        ))}
      </div>
      <Outlet context={auth} />
    </div>
  );
}
