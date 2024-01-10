import axios from "axios";
import Papa from "papaparse";
import { useState } from "react";

export default function AdminPage() {
  const [usersInfo, setUsersInfo] = useState(null);

  const handleClick = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/`)
        .then((res) => setUsersInfo(Papa.unparse(res.data)));
    } catch (error) {
      console.error(error);
    }
  };
  console.info(usersInfo);

  return (
    <>
      <h1>Je suis une page d'administrateur</h1>
      <button type="button" onClick={handleClick}>
        Télécharger les informations des utilisateurs
      </button>
    </>
  );
}
