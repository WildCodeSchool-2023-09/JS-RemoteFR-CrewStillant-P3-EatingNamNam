/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/user`, data)
      .then((res) => console.info(res.data));
    localStorage.setItem("accessVisible", true);
    navigate("/login");
  };

  return (
    <section className="flex flex-row justify-center">
      <div className="bg-orange text-beige p-6 rounded-xl m-2 w-fit border-2">
        <h1 className="text-center my-5 text-3xl font-bold">
          Renseignez les champs suivants
        </h1>
        <form
          className="flex flex-col items-center gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="firstname" className="text-2xl mt-2">
              Prénom
            </label>
            <input
              className="bg-beige placeholder:text-slate-400 text-black rounded p-1 ps-3"
              name="firstname"
              type="text"
              placeholder="John"
              {...register("firstname", {
                required: "Ce champs est obligatoire",
                minLength: {
                  value: 2,
                  message: "Votre prénom doit contenir au minimum 2 caractères",
                },
                pattern: {
                  value: /[A-Za-z]+$/,
                  message: "Votre prénom doit contenir que des lettres",
                },
              })}
            />
            {errors.firstname && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.firstname?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="lastname" className="text-2xl">
              Nom
            </label>
            <input
              className="bg-beige placeholder:text-slate-400 text-black rounded p-1 ps-3"
              name="lastname"
              type="text"
              placeholder="Doe"
              {...register("lastname", {
                required: "Ce champs est obligatoire",
                minLength: {
                  value: 2,
                  message: "Votre nom doit contenir au minimum 2 caractères",
                },
                pattern: {
                  value: /[A-Za-z]+$/,
                  message: "Votre Nom doit contenir que des lettres",
                },
              })}
            />
            {errors.lastname && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.lastname?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="pseudo" className="text-2xl">
              Pseudo
            </label>
            <input
              className="bg-beige placeholder:text-slate-400 text-black rounded p-1 ps-3"
              name="pseudo"
              type="text"
              placeholder="JohnDoe99"
              {...register("pseudo", {
                required: "Ce champs est obligatoire",
                minLength: {
                  value: 4,
                  message: "Votre pseudo doit contenir au minimum 4 caractères",
                },
              })}
            />
            {errors.pseudo && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.pseudo?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="email" className="text-2xl">
              Email
            </label>
            <input
              className="bg-beige placeholder:text-slate-400 text-black rounded p-1 ps-3"
              name="email"
              type="email"
              placeholder="johndoe99@doe.fr"
              {...register("mail", {
                required: "Ce champs est obligatoire",
                pattern: {
                  value: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/,
                  message:
                    "Votre email n'a pas la bonne syntaxe, ex: johndoe@doe.fr",
                },
              })}
            />
            {errors.email && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="confirm-email" className="text-2xl">
              Confimer email
            </label>
            <input
              className="bg-beige placeholder:text-slate-400 text-black rounded p-1 ps-3"
              name="confirm-email"
              type="email"
              placeholder="johndoe99@doe.fr"
              {...register("confirmEmail", {
                required: "Vous devez confirmer votre email",
                validate: (value) =>
                  value === watch("mail") || "Emails non identiques",
              })}
            />
            {errors.confirmemail && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.confirmemail?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="password" className="text-2xl">
              Mot de passe
            </label>
            <input
              className="bg-beige placeholder:text-slate-400 text-black rounded p-1 ps-3"
              name="password"
              type="password"
              placeholder="**********"
              {...register("password", {
                required: "Ce champs est obligatoire",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message:
                    "Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, one number et un caractère spécial",
                },
              })}
            />
            {errors.password && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="confirm-password" className="text-2xl">
              Confirmer mot de passe
            </label>
            <input
              className="bg-beige placeholder:text-slate-400 text-black rounded p-1 ps-3"
              name="confirm-password"
              type="password"
              placeholder="**********"
              {...register("confirmPassword", {
                required: "Vous devez confirmer votre mot de passe",
                validate: (value) =>
                  value === watch("password") || "Mots de passe non identiques",
              })}
            />
            {errors.confirmPassword && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="birthdate" className="text-2xl">
              Date de naissance
            </label>
            <input
              className="bg-beige text-black rounded p-1 ps-3"
              name="birthdate"
              type="date"
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
            {errors.birthdate && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.birthdate?.message}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center gap-2">
            <label htmlFor="weight" className="text-2xl">
              Votre poids (en kg)
            </label>
            <input
              className="bg-beige placeholder:text-slate-400 text-black rounded p-1 ps-3"
              name="weight"
              type="number"
              min={0}
              placeholder="75"
              {...register("weight", {
                required: "Ce champs est obligatoire",
                valueAsNumber: "Un nombre est obligatoire",
                pattern: {
                  value: /\d+/,
                  message: "Seulement un nombre entier positif",
                },
              })}
            />
            {errors.weight && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.weight?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            <label htmlFor="week-time" className="text-2xl text-center">
              Temps passé en cuisine par semaine (en h)
            </label>
            <input
              className="bg-beige placeholder:text-slate-400 text-black rounded p-1 ps-3"
              name="week-time"
              type="number"
              min={0}
              placeholder="4"
              {...register("week_time_kitchen", {
                required: "Ce champs est obligatoire",
                valueAsNumber: "Un nombre est obligatoire",
                pattern: {
                  value: /\d+/,
                  message: "Seulement un nombre entier positif",
                },
              })}
            />
            {errors.week_time_kitchen && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.week_time_kitchen?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-green text-beige text-3xl px-3 mt-5 rounded py-1"
          >
            Valider
          </button>
        </form>
      </div>
    </section>
  );
}
