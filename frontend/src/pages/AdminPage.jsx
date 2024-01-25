import { saveAs } from "file-saver";
import { useLoaderData } from "react-router-dom";
import EditIngredient from "../components/EditIngredient";

export default function AdminPage() {
  const { unit } = useLoaderData();

  const handleClick = async () => {
    try {
      const csv = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/dl`
      ).then((res) => res.blob());

      saveAs(csv, "users_informations.csv");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="m-2">
      <h1 className="text-3xl text-green border-2 border-orange p-2 rounded-md m-1 text-center">
        Bienvenue sur votre page administrateur
      </h1>
      <EditIngredient unit={unit.data} />

      <button
        type="button"
        onClick={handleClick}
        className="rounded-md  px-2 hover:text-beige hover:bg-orange active:bg-green"
      >
        Télécharger les informations des utilisateurs
      </button>
    </div>
  );
}
