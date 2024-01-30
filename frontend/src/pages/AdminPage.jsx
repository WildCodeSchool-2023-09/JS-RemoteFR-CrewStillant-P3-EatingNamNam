import { saveAs } from "file-saver";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import EditIngredient from "../components/EditIngredient";
import UsersInfoAdmin from "../components/UsersInfoAdmin";

export default function AdminPage() {
  const { unit, users } = useLoaderData();
  const { auth } = useOutletContext();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      const csv = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/dl`,
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      ).then((res) => res.blob());

      saveAs(csv, "users_informations.csv");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (auth.role !== "admin") {
      navigate("/");
    }
  }, []);

  return (
    <div className="m-2 flex flex-col items-center p-2">
      <h1 className="text-3xl text-green border-b-2 border-orange p-2 m-1 text-center">
        Bienvenue sur votre page administrateur
      </h1>

      <UsersInfoAdmin users={users} />
      <EditIngredient unit={unit.data} />

      <button
        type="button"
        onClick={handleClick}
        className="rounded-md text-xl border-2 mt-4 border-orange px-2 hover:text-beige hover:bg-orange active:bg-green"
      >
        Télécharger toutes les informations des utilisateurs
      </button>
    </div>
  );
}
