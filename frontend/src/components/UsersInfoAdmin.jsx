import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import moment from "moment/min/moment-with-locales";
import destroy from "../assets/cancel.png";
import edit from "../assets/iconEdit.png";

export default function UsersInfoAdmin({ users }) {
  moment.locale("fr");

  const [updatedUsers, setUpdatedUsers] = useState(users);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleChangeRole = async (ID) => {
    const user = updatedUsers.find((u) => u.id === ID);
    let newRole = 0;
    if (user.role_id === 1) {
      newRole = 2;
    }
    if (user.role_id === 2) {
      newRole = 1;
    }
    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/user/role`, {
        id: user.id,
        role_id: newRole,
      });

      setIsUpdated(true);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteUser = async (id) => {
    // on ne supprime pas vraiment l'utilisateur mais on l'edit avec 'anonymous' dans tous ses champs

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/anonymous/${id}`
      );

      setIsUpdated(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isUpdated) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/user`)
        .then((res) => setUpdatedUsers(res.data))
        .finally(setIsUpdated(false));
    }
  }, [isUpdated]);

  return (
    <div>
      <table className="mt-4 w-fit table-auto text-left">
        <thead>
          <tr>
            <th colSpan={7} className="text-2xl border-orange border-b-2">
              Informations sur les utilisateurs
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-2 border-orange text-xl">
            <td>Prénom</td>
            <td>Nom</td>
            <td>Email</td>
            <td>Inscris le</td>
            <td>Nb Recettes</td>
            <td>Role</td>
            <td>Actions</td>
          </tr>
          {updatedUsers
            .filter((u) => u.firstname !== "anonymous")
            .map((u) => (
              <tr key={u.id} className="text-center">
                <td>{u.firstname}</td>
                <td>{u.lastname}</td>
                <td>{u.mail}</td>
                <td>{moment(u.registration_date).format("LL")}</td>
                <td>{u.total_recipe}</td>
                <td>{u.role}</td>
                <td className="flex flex-row">
                  <button
                    type="button"
                    onClick={() => handleChangeRole(u.id)}
                    title="Changer le rôle de l'utilisateur"
                  >
                    <img
                      src={edit}
                      alt="Changer le rôle de l'utilisateur"
                      width={30}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteUser(u.id)}
                    title="Supprimer l'utilisateur"
                  >
                    <img
                      src={destroy}
                      alt="Supprimer l'utilisateur"
                      width={30}
                    />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

UsersInfoAdmin.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape).isRequired,
};