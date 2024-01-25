/* eslint-disable react/jsx-props-no-spreading */
import { useLoaderData, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import moment from "moment/min/moment-with-locales";
import userImg from "../assets/defaultimg.png";
import edit from "../assets/iconEdit.png";
import cancel from "../assets/cancel.png";

export default function UserInformation() {
  const { auth } = useOutletContext();
  const decoded = auth && jwtDecode(auth.token);
  const { data } = useLoaderData();
  const [updatedData, setUpdatedData] = useState(data);
  const [isUpdated, setIsUpdated] = useState(false);
  const [inputsValidated, setInputsValidated] = useState(false);
  moment.locale("fr");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: updatedData.firstname,
      lastname: updatedData.lastname,
      birthdate: moment(updatedData.birthdate).format("YYYY-MM-DD"),
      mail: updatedData.mail,
      pseudo: updatedData.pseudo,
      week_time_kitchen: updatedData.week_time_kitchen,
      weight: updatedData.weight,
      password: "",
      confirmPassword: "",
    },
  });

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

  const handleFormVisible = (id) => {
    const arrayId = parseInt(id, 10);
    const index = arrayId - 1;
    setVisible(visible.toSpliced(index, 1, { id: arrayId, visible: true }));
  };

  const handleCancelForm = (id) => {
    const arrayId = parseInt(id, 10);
    const index = arrayId - 1;
    setVisible(visible.toSpliced(index, 1, { id: arrayId, visible: false }));
  };

  const onSubmit = async (newData) => {
    setVisible(visibleArray);
    try {
      await axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/api/user/`, newData)
        .then((res) => console.info(res.data))
        .then(setIsUpdated(true))
        .then(setInputsValidated(false));
    } catch (error) {
      console.error(error);
    }
    reset();
  };

  useEffect(() => {
    if (isUpdated) {
      try {
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/${decoded.sub}`)
          .then((res) => {
            setUpdatedData(res.data);
            setIsUpdated(false);
          });
      } catch (error) {
        console.error(error);
      }
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
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {visible.find((v) => v.id === 1 && v.visible) ? (
          <div className="pseudo">
            <div className="flex flex-row items-center gap-2 w-fit text-black">
              <input
                className="rounded-md pl-2"
                type="text"
                name="pseudo"
                required
                {...register("pseudo", {
                  required: "Ce champs est obligatoire",
                  minLength: {
                    value: 4,
                    message:
                      "Votre pseudo doit contenir au minimum 4 caractères",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => {
                  handleCancelForm(1);
                  resetField("pseudo");
                }}
              >
                <img src={cancel} alt="bouton annuler" className="w-6" />
              </button>
            </div>
            {errors.pseudo && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.pseudo?.message}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <p className="text-2xl my-2">Pseudo : {updatedData.pseudo}</p>
            <button type="button" onClick={() => handleFormVisible(1)}>
              <img src={edit} alt="crayon" className="w-6" />
            </button>
          </div>
        )}
        {visible.find((v) => v.id === 2 && v.visible) ? (
          <div className="firstname">
            <div className="flex flex-row items-center gap-2 w-fit text-black">
              <input
                className="rounded-md pl-2"
                type="text"
                name="firstname"
                required
                {...register("firstname", {
                  required: "Ce champs est obligatoire",
                  minLength: {
                    value: 2,
                    message:
                      "Votre prénom doit contenir au minimum 2 caractères",
                  },
                  pattern: {
                    value: /[A-Za-z]+$/,
                    message: "Votre prénom ne doit contenir que des lettres",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => {
                  handleCancelForm(2);
                  resetField("firstname");
                }}
              >
                <img src={cancel} alt="bouton annuler" className="w-6" />
              </button>
            </div>
            {errors.e?.type && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.e.type?.message}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <p className="text-2xl my-2">Prénom : {updatedData.firstname}</p>
            <button type="button" onClick={() => handleFormVisible(2)}>
              <img src={edit} alt="crayon" className="w-6" />
            </button>
          </div>
        )}
        {visible.find((v) => v.id === 3 && v.visible) ? (
          <div className="">
            <div className="flex flex-row items-center gap-2 w-fit text-black">
              <input
                className="rounded-md pl-2"
                type="text"
                name="lastname"
                required
                {...register("lastname", {
                  required: "Ce champs est obligatoire",
                  minLength: {
                    value: 2,
                    message: "Votre nom doit contenir au minimum 2 caractères",
                  },
                  pattern: {
                    value: /[A-Za-z]+$/,
                    message: "Votre nom ne doit contenir que des lettres",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => {
                  handleCancelForm(3);
                  resetField("lastname");
                }}
              >
                <img src={cancel} alt="bouton annuler" className="w-6" />
              </button>
            </div>
            {errors.lastname && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.lastname?.message}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <p className="text-2xl my-2">Nom : {updatedData.lastname}</p>
            <button type="button" onClick={() => handleFormVisible(3)}>
              <img src={edit} alt="crayon" className="w-6" />
            </button>
          </div>
        )}
        {visible.find((v) => v.id === 4 && v.visible) ? (
          <div className="email">
            <div className="flex flex-row items-center gap-2 w-fit text-black">
              <input
                className="rounded-md pl-2"
                type="mail"
                name="email"
                required
                {...register("mail", {
                  required: "Ce champs est obligatoire",
                  pattern: {
                    value: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/,
                    message:
                      "Votre email n'a pas la bonne syntaxe, ex: johndoe@doe.fr",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => {
                  handleCancelForm(4);
                  resetField("mail");
                }}
              >
                <img src={cancel} alt="bouton annuler" className="w-6" />
              </button>
            </div>
            {errors.mail && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.mail?.message}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <p className="text-2xl my-2">E-mail : {updatedData.mail}</p>
            <button type="button" onClick={() => handleFormVisible(4)}>
              <img src={edit} alt="crayon" className="w-6" />
            </button>
          </div>
        )}
        {visible.find((v) => v.id === 5 && v.visible) ? (
          <div className="birthdate">
            <div className="flex flex-row items-center gap-2 w-fit text-black">
              <input
                className="rounded-md pl-2"
                type="date"
                name="birthdate"
                required
                {...register("birthdate", {
                  required: "Ce champs est obligatoire",
                  pattern: {
                    value:
                      /^(19[0-9]{2}|2[0-9]{3})-(0[1-9]|1[012])-([123]0|[012][1-9]|31)$/,
                    message:
                      "Vous devez renseigner une date dans le bon format, ex: AAAA/MM/JJ",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => {
                  handleCancelForm(5);
                  resetField("birthdate");
                }}
              >
                <img src={cancel} alt="bouton annuler" className="w-6" />
              </button>
            </div>
            {errors.birthdate && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.birthdate?.message}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <p className="text-2xl my-2">
              Date de naissance : {moment(updatedData.birthdate).format("L")}
            </p>
            <button type="button" onClick={() => handleFormVisible(5)}>
              <img src={edit} alt="crayon" className="w-6" />
            </button>
          </div>
        )}
        {visible.find((v) => v.id === 6 && v.visible) ? (
          <div className="weight">
            <div className="flex flex-row items-center gap-2 w-fit text-black">
              <input
                className="rounded-md pl-2"
                type="number"
                name="weight"
                required
                {...register("weight", {
                  required: "Ce champs est obligatoire",
                  pattern: {
                    value: /\d+/,
                    message: "Seulement un nombre entier positif",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => {
                  handleCancelForm(6);
                  resetField("weight");
                }}
              >
                <img src={cancel} alt="bouton annuler" className="w-6" />
              </button>
            </div>
            {errors.weight && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.weight?.message}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <p className="text-2xl my-2">Poids : {updatedData.weight} kg</p>
            <button type="button" onClick={() => handleFormVisible(6)}>
              <img src={edit} alt="crayon" className="w-6" />
            </button>
          </div>
        )}
        {visible.find((v) => v.id === 7 && v.visible) ? (
          <div className="week-time-kitchen">
            <div className="flex flex-row items-center gap-2 w-fit text-black">
              <input
                className="rounded-md pl-2"
                type="number"
                name="week-time-kitchen"
                required
                {...register("week_time_kitchen", {
                  required: "Ce champs est obligatoire",
                  pattern: {
                    value: /\d+/,
                    message: "Seulement un nombre entier positif",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => {
                  handleCancelForm(7);
                  resetField("week_time_kitchen");
                }}
              >
                <img src={cancel} alt="bouton annuler" className="w-6" />
              </button>
            </div>
            {errors.week_time_kitchen && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.week_time_kitchen?.message}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <p className="text-2xl my-2">
              Temps passé en cuisine (h/s) : {updatedData.week_time_kitchen}
            </p>
            <button type="button" onClick={() => handleFormVisible(7)}>
              <img src={edit} alt="crayon" className="w-6" />
            </button>
          </div>
        )}
        {visible.find((v) => v.id === 8 && v.visible) ? (
          <>
            <div className="flex flex-row gap-4 items-end mt-2 text-black">
              <div className="flex flex-col gap-2">
                <input
                  className="rounded-md pl-2"
                  type="password"
                  placeholder="Nouveau mot de passe:"
                  name="new-password"
                  required
                  {...register("newPassword", {
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
                  <p
                    role="alert"
                    className="bg-red-600 text-beige text-sm p-0.5"
                  >
                    {errors.password?.message}
                  </p>
                )}
                <input
                  className="rounded-md pl-2"
                  type="password"
                  placeholder="Confirmer mot de passe:"
                  name="confirm-password"
                  {...register("confirmPassword", {
                    required: "Vous devez confirmer votre mot de passe",
                    validate: (value) =>
                      value === watch("password") ||
                      "Mots de passe non identiques",
                  })}
                />
                {errors.confirmpassword && (
                  <p
                    role="alert"
                    className="bg-red-600 text-beige text-sm p-0.5"
                  >
                    {errors.confirmpassword?.message}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  handleCancelForm(8);
                  resetField("newPassword");
                  resetField("confirmPassword");
                }}
              >
                <img src={cancel} alt="bouton annuler" className="w-6" />
              </button>
            </div>
            <p>
              Le mot de passe doit contenir au moins 8 caractères dont une
              majuscule, une minuscule, une chiffre et un caractère spécial
            </p>
          </>
        ) : (
          <div className="flex flex-row gap-2">
            <p className="text-2xl my-2">Modifier mot de passe</p>
            <button type="button" onClick={() => handleFormVisible(8)}>
              <img src={edit} alt="crayon" className="w-6" id="8" />
            </button>
          </div>
        )}

        <p className="text-2xl my-2">
          Date de création du compte :{" "}
          {moment(updatedData.registration_date).format("LLLL")}
        </p>
        <div className="flex flex-col items-center gap-2">
          {inputsValidated ? (
            <>
              <p>
                Entrer votre mot de passe actuel pour valider les changements
              </p>
              <input
                className="text-black"
                type="password"
                name="validate-password"
                {...register("password", {
                  required: "Ce champs est obligatoire",
                })}
              />
              <button
                type="submit"
                className="border-green border-2 rounded-md w-fit p-1"
              >
                Valider les changements
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setInputsValidated(true);
              }}
              className="border-green border-2 rounded-md w-fit p-1"
            >
              Valider la saisie
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
