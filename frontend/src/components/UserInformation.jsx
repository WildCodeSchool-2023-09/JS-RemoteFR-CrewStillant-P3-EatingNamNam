/* eslint-disable react/jsx-props-no-spreading */
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import moment from "moment";
// import momentFR from "moment/locale/fr";
import user from "../services/userInfo";
import userImg from "../assets/defaultimg.png";
import edit from "../assets/iconEdit.png";
import validate from "../assets/validate.png";
import cancel from "../assets/cancel.png";

export default function UserInformation() {
  const { data } = useLoaderData();
  const [updatedData, setUpdatedData] = useState(data);
  const [isUpdated, setIsUpdated] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const visibleArray = [
    { id: 1, visible: false },
    { id: 2, visible: false },
    { id: 3, visible: false },
    { id: 4, visible: false },
    { id: 5, visible: false },
    { id: 6, visible: false },
    { id: 7, visible: false },
    { id: 8, visible: false },
  ];
  const [visible, setVisible] = useState(visibleArray);

  const handleFormVisible = (e) => {
    const arrayId = parseInt(e.target.id, 10);
    const index = arrayId - 1;
    setVisible(
      visibleArray.toSpliced(index, 1, { id: arrayId, visible: true })
    );
  };

  const handleCancelForm = (e) => {
    const arrayId = parseInt(e.target.id, 10);
    const index = arrayId - 1;
    setVisible(
      visibleArray.toSpliced(index, 1, { id: arrayId, visible: false })
    );
  };

  const onSubmit = (datas) => {
    const newData = {
      firstname: updatedData.firstname,
      lastname: updatedData.lastname,
      birthdate: updatedData.birthdate,
      mail: updatedData.mail,
      pseudo: updatedData.pseudo,
      week_time_kitchen: updatedData.week_time_kitchen,
      weight: updatedData.weight,
      password: updatedData.password,
      confirmPassword: "",
    };
    const key = Object.keys(datas);
    let newValue = "";
    if (key[0] === "weight" || key[0] === "week_time_kitchen") {
      newValue = parseInt(Object.values(data), 10);
    } else if (key[0] === "password") {
      Object.defineProperty(newData, key[1], {
        value: Object.values(datas)[1],
      });
      newValue = Object.values(datas);
    } else {
      newValue = Object.values(datas);
    }
    Object.defineProperty(newData, key[0], { value: newValue[0] });
    const arrayId = user.find((e) => e.type === key[0]).id;
    const index = arrayId - 1;
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/api/user/${data.id}`, newData)
      .then(() => setIsUpdated(true));
    setVisible(
      visibleArray.toSpliced(index, 1, { id: arrayId, visible: false })
    );
  };

  useEffect(() => {
    if (isUpdated) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/1`)
        .then((res) => {
          setUpdatedData(res.data);
          setIsUpdated(false);
        });
    }
  }, [isUpdated]);

  return (
    <div className="flex flex-col bg-orange rounded-2xl m-4 p-4 text-beige w-fit">
      <div className="flex flex-row items-end gap-2 mb-4">
        <img src={userImg} alt="avatar de l'utilisateur" className="w-fit" />
        <button type="button">
          <img src={edit} alt="crayon" className="w-6" />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {user.map((e) =>
          visible[e.id - 1].visible ? (
            <form onSubmit={handleSubmit(onSubmit)} key={e.id}>
              <div className="flex flex-row items-center gap-2 w-fit text-black">
                <input
                  className="rounded-md pl-2"
                  type={e.inputType}
                  placeholder={e.type}
                  name={e.type}
                  required
                  {...register(`${e.type}`, {
                    required: "Ce champs est obligatoire",
                    minLength: {
                      value: e.minLength.value,
                      message: e.minLength.message,
                    },
                    pattern: {
                      value: e.pattern.value,
                      message: e.pattern.message,
                    },
                  })}
                />
                <button type="submit" id={`${visible[e.id - 1].id}`}>
                  <img src={validate} alt="bouton valider" className="w-6" />
                </button>
                <button type="button" onClick={handleCancelForm}>
                  <img src={cancel} alt="bouton annuler" className="w-6" />
                </button>
              </div>
              {errors.e.type && (
                <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                  {errors.e.type?.message}
                </p>
              )}
            </form>
          ) : (
            <div className="flex flex-row gap-2" key={e.id}>
              <p className="text-2xl my-2">
                {e.fr} : {e.value}
              </p>
              <button type="button" onClick={handleFormVisible}>
                <img
                  src={edit}
                  alt="crayon"
                  className="w-6"
                  id={`${visible[e.id - 1].id}`}
                />
              </button>
            </div>
          )
        )}
      </div>
      {visible[7].visible ? (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-row gap-4 items-end mt-2 text-black"
          >
            <div className="flex flex-col gap-2">
              <input
                className="rounded-md pl-2"
                type="password"
                placeholder="Nouveau mot de passe:"
                name="password"
                required
                {...register("password", {
                  required: "Ce champs est obligatoire",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                    message:
                      "Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un nombre et un caractère spécial",
                  },
                })}
              />
              {errors.password && (
                <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                  {errors.password?.message}
                </p>
              )}
              <input
                className="rounded-md pl-2"
                type="password"
                placeholder="Confirmer mot de passe:"
                name="confirmPassword"
                {...register("confirmPassword", {
                  required: "Vous devez confirmer votre mot de passe",
                  validate: (value) =>
                    value === watch("password") ||
                    "Mots de passe non identiques",
                })}
              />
              {errors.confirmpassword && (
                <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                  {errors.confirmpassword?.message}
                </p>
              )}
            </div>
            <button type="submit" id="8">
              <img src={validate} alt="bouton valider" className="w-6" />
            </button>
            <button type="button" onClick={handleCancelForm}>
              <img src={cancel} alt="bouton annuler" className="w-6" />
            </button>
          </form>
          <p>
            Le mot de passe doit contenir au moins 8 caractères dont une
            majuscule, une minuscule, une chiffre et un caractère spécial
          </p>
        </>
      ) : (
        <div className="flex flex-row gap-2">
          <p className="text-2xl my-2">Modifier mot de passe</p>
          <button type="button" onClick={handleFormVisible}>
            <img src={edit} alt="crayon" className="w-6" id="8" />
          </button>
        </div>
      )}

      <p className="text-2xl my-2">
        Date de création du compte :{" "}
        {moment(updatedData.registration_date).format("LLLL")}
      </p>
    </div>
  );
}

// const keys = Object.keys(newData);
// const values = Object.values(newData);
// const test = keys.map((e, index) => ({
//   id: index + 1,
//   type: e,
//   value: values[index],
// }));

//  for(let i=0; i<keys.length; i++) {
//   const newObject = {keys[i]: values[i]}
//    user.push(newObject);
//  }

// for (const [key, value] of Object.entries(newData)) {
//   console.log(`${key} : ${value}`);
//   user.push({ key: value });
// }

// moment.updateLocale("fr", momentFR);
// console.log(moment.locale());
// const date = moment(updatedData.registration_date)
//   .locale("fr")
//   .format("LLLL");
// console.log(momentFR);
