import PropTypes from "prop-types";
import moment from "moment/min/moment-with-locales";

export default function UsersInfoAdmin({ users }) {
  moment.locale("fr");

  return (
    <div>
      <table className="mt-4 w-fit table-auto text-left">
        <thead>
          <tr>
            <th colSpan={9} className="text-2xl border-orange border-b-2">
              Informations sur les utilisateurs
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b-2 border-orange text-xl">
            <td>Prénom</td>
            <td>Nom</td>
            <td>Pseudo</td>
            <td>Email</td>
            <td>Inscris le</td>
            <td>Temps en cuisine (h/s)</td>
            <td>Poids (kg)</td>
            <td>Role</td>
            <td>Supprimer</td>
          </tr>
          {users.map((u) => (
            <tr key={u.id} className="text-center">
              <td>{u.firstname}</td>
              <td>{u.lastname}</td>
              <td>{u.pseudo}</td>
              <td>{u.mail}</td>
              <td>{moment(u.registration_date).format("LL")}</td>
              <td>{u.week_time_kitchen}</td>
              <td>{u.weight}</td>
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
