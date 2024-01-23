import { NavLink, Outlet, useOutletContext } from "react-router-dom";

export default function UserPage() {
  const { auth } = useOutletContext();
  const navUser = [
    {
      id: 1,
      path: `/user/info/${auth.id}`,
      name: "Mon profil",
    },
    {
      id: 2,
      path: `/user/created/${auth.id}`,
      name: "Mes recettes créées",
    },
    {
      id: 3,
      path: `/user/favorites/${auth.id}`,
      name: "Mes recettes favorites",
    },
    {
      id: 4,
      path: `/user/comments/${auth.id}`,
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
