/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import axios from "axios";

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user`, data);
  };

  return (
    <div className="bg-orange text-beige p-6 rounded-lg m-2 w-auto">
      <h1 className="text-center mb-3 text-xl font-bold">
        Renseignez les champs suivants
      </h1>
      <form
        className="flex flex-col items-center gap-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="firstname">Prénom</label>
        <input
          className="bg-green placeholder:text-beige text-beige rounded"
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
        <label htmlFor="lastname">Nom</label>
        <input
          className="bg-green text-beige placeholder:text-beige rounded"
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
        <label htmlFor="pseudo">Pseudo</label>
        <input
          className="bg-green placeholder:text-beige text-beige rounded"
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
        <label htmlFor="email">Email</label>
        <input
          className="bg-green placeholder:text-beige text-beige rounded"
          name="email"
          type="email"
          placeholder="johndoe99@doe.fr"
          {...register("email", {
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
        <label htmlFor="confirm-email">Confimer email</label>
        <input
          className="bg-green placeholder:text-beige text-beige rounded"
          name="confirm-email"
          type="email"
          placeholder="johndoe99@doe.fr"
          {...register("confirmemail", {
            required: "Vous devez confirmer votre email",
            validate: (value) =>
              value === watch("email") || "Emails non identiques",
          })}
        />
        {errors.confirmemail && (
          <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
            {errors.confirmemail?.message}
          </p>
        )}
        <label htmlFor="password">Mot de passe</label>
        <input
          className="bg-green placeholder:text-beige text-beige rounded"
          name="password"
          type="password"
          placeholder="**********"
          {...register("password", {
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
        <label htmlFor="confirm-password">Confirmer mot de passe</label>
        <input
          className="bg-green placeholder:text-beige text-beige rounded"
          name="confirm-password"
          type="password"
          placeholder="**********"
          {...register("confirmpassword", {
            required: "Vous devez confirmer votre mot de passe",
            validate: (value) =>
              value === watch("password") || "Mots de passe non identiques",
          })}
        />
        {errors.confirmpassword && (
          <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
            {errors.confirmpassword?.message}
          </p>
        )}
        <label htmlFor="birthdate">Date de naissance</label>
        <input
          className="bg-green text-beige rounded"
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
        <label htmlFor="gender">Votre sexe</label>
        <select
          className="bg-green text-beige rounded"
          name="gender"
          {...register("gender", {
            required: "Ce champs est obligatoire",
          })}
        >
          <option value="">--</option>
          <option value="male">Homme</option>
          <option value="female">Femme</option>
        </select>
        {errors.gender && (
          <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
            {errors.gender?.message}
          </p>
        )}
        <label htmlFor="weight">Votre poids (en kg)</label>
        <input
          className="bg-green placeholder:text-beige text-beige rounded"
          name="weight"
          type="number"
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
        <label htmlFor="week-time">
          Temps passé en cuisine par semaine (en h)
        </label>
        <input
          className="bg-green placeholder:text-beige text-beige rounded"
          name="week-time"
          type="number"
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
        <button
          type="submit"
          className="bg-green text-beige px-2 mt-5 rounded text-lg"
          {...register("registration_date", { value: Date.now() })}
        >
          Valider
        </button>
      </form>
    </div>
  );
}
