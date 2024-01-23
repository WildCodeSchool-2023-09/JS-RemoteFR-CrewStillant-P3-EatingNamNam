import { saveAs } from "file-saver";
import { useLoaderData } from "react-router-dom";
import UsersInfoAdmin from "../components/UsersInfoAdmin";

export default function AdminPage() {
  const users = useLoaderData();

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
    <div className="m-2 flex flex-col items-center p-2">
      <h1 className="text-3xl text-green border-b-2 border-orange p-2 m-1 text-center">
        Bienvenue sur votre page administrateur
      </h1>

      <UsersInfoAdmin users={users} />

      <button
        type="button"
        onClick={handleClick}
        className="rounded-md text-xl border-2 mt-4 border-orange px-2 hover:text-beige hover:bg-orange active:bg-green"
      >
        Télécharger les informations des utilisateurs
      </button>
    </div>
  );
}
