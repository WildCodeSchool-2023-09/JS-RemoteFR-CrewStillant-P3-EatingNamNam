import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import moment from "moment";
import userImg from "../assets/defaultimg.png";
import edit from "../assets/iconEdit.png";

export default function UserInformation() {
  const { data } = useLoaderData();

  const visibleArray = [
    { id: 1, visible: false },
    { id: 2, visible: false },
    { id: 3, visible: false },
    { id: 4, visible: false },
    { id: 5, visible: false },
    { id: 6, visible: false },
    { id: 7, visible: false },
  ];
  const [visible, setVisible] = useState(visibleArray);
  const handleForm = (e) => {
    const arrayId = parseInt(e.target.id, 10);
    setVisible(
      visibleArray.toSpliced(arrayId - 1, 1, { id: arrayId, visible: true })
    );
  };
  const handleFormSubmit = (e) => {
    const infoType = e.target[0].name;
    const infoData = e.target[0].value;
    const newData = {
      firstname: data.firstname,
      lastname: data.lastname,
      birthdate: data.birthdate,
      mail: data.mail,
      pseudo: data.pseudo,
      week_time_kitchen: data.week_time_kitchen,
      weight: data.weight,
      password: data.password,
    };
    Object.defineProperty(newData, infoType, { value: infoData });
    axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/${data.id}`,
      newData
    );
  };

  return (
    <div className="flex flex-col bg-orange rounded-2xl m-4 p-4 text-beige w-fit">
      <div className="flex flex-row items-end gap-2">
        <img src={userImg} alt="avatar de l'utilisateur" className="w-fit" />
        <button type="button">
          <img src={edit} alt="crayon" className="w-6" />
        </button>
      </div>
      <div className="flex flex-row gap-2">
        {visible[0].visible ? (
          <form onSubmit={handleFormSubmit}>
            <input type="text" placeholder="Pseudo :" name="pseudo" />
            <button type="submit">Valider</button>
          </form>
        ) : (
          <>
            <p className="text-2xl my-2">Pseudo : {data.pseudo}</p>
            <button type="button" onClick={handleForm}>
              <img src={edit} alt="crayon" className="w-6" id={visible[0].id} />
            </button>
          </>
        )}
      </div>
      <div className="flex sm:flex-row flex-col md:gap-8 text-xl">
        <div className="flex flex-row gap-2">
          {visible[1].visible ? (
            <form onSubmit={handleFormSubmit}>
              <input type="text" placeholder="Nom :" name="lastname" />
              <button type="submit">Valider</button>
            </form>
          ) : (
            <>
              <p>Mon nom : {data.lastname}</p>
              <button type="button" onClick={handleForm}>
                <img src={edit} alt="crayon" className="w-6" id="2" />
              </button>
            </>
          )}
        </div>
        <div className="flex flex-row gap-2">
          {visible[2].visible ? (
            <form onSubmit={handleFormSubmit}>
              <input type="text" placeholder="Prénom :" name="firstname" />
              <button type="submit">Valider</button>
            </form>
          ) : (
            <>
              <p>Mon prénom : {data.firstname}</p>
              <button type="button" onClick={handleForm}>
                <img src={edit} alt="crayon" className="w-6" id="3" />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-row gap-2">
        {visible[3].visible ? (
          <form onSubmit={handleFormSubmit}>
            <input type="email" placeholder="Email :" name="mail" />
            <button type="submit">Valider</button>
          </form>
        ) : (
          <>
            <p className="text-xl my-2">Mon email : {data.mail}</p>
            <button type="button" onClick={handleForm}>
              <img src={edit} alt="crayon" className="w-6" id="4" />
            </button>
          </>
        )}
      </div>
      <div className="flex sm:flex-row flex-col md:gap-8 text-xl">
        <div className="flex flex-row gap-2">
          {visible[4].visible ? (
            <form onSubmit={handleFormSubmit}>
              <input type="date" name="birthdate" />
              <button type="submit">Valider</button>
            </form>
          ) : (
            <>
              <p>
                Ma date de naissance :{" "}
                {moment(data.birthdate).format("DD/MM/YYYY")}
              </p>
              <button type="button" onClick={handleForm}>
                <img src={edit} alt="crayon" className="w-6" id="5" />
              </button>
            </>
          )}
        </div>
        <div className="flex flex-row gap-2">
          {visible[5].visible ? (
            <form onSubmit={handleFormSubmit}>
              <input type="number" placeholder="Poids (en kg):" name="weight" />
              <button type="submit">Valider</button>
            </form>
          ) : (
            <>
              <p>Mon poids : {data.weight} kg</p>
              <button type="button" onClick={handleForm}>
                <img src={edit} alt="crayon" className="w-6" id="6" />
              </button>
            </>
          )}
        </div>
        <div className="flex flex-row gap-2">
          {visible[6].visible ? (
            <form onSubmit={handleFormSubmit}>
              <input
                type="number"
                placeholder="Temps passé en cuisine (h/s) :"
                name="week_time_kitchen"
              />
              <button type="submit">Valider</button>
            </form>
          ) : (
            <>
              <p>
                Mon temps passé en cuisine : {data.week_time_kitchen} h/semaine
              </p>
              <button type="button" onClick={handleForm}>
                <img src={edit} alt="crayon" className="w-6" id="7" />
              </button>
            </>
          )}
        </div>
      </div>
      <p className="text-xl my-2">
        Date de création du compte :{" "}
        {moment(data.registration_date).format("dddd Do MMMM YYYY, h:mm")}
      </p>
    </div>
  );
}
