/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import axios from "axios";
import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useOutletContext();
  const [err, setErr] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth`, data)
        .then((res) => {
          setAuth(res.data);
          localStorage.setItem("accessVisible", true);
          navigate("/");
        })
        .catch((error) => {
          setErr(error.response.data.message);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      className="flex flex-col items-center text-xl gap-3 bg-orange text-beige p-6 rounded-xl m-2 w-fit border-2 border-green"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="mail">Votre e-mail</label>
      <input
        className="text-black pl-2 w-64 bg-beige rounded-md"
        type="email"
        name="mail"
        {...register("mail", { required: "Veuillez renseigner votre mail" })}
      />
      {errors.mail && (
        <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
          {errors.mail?.message}
        </p>
      )}
      <label htmlFor="password">Votre mot-de-passe</label>
      <input
        className="text-black pl-2 w-64 rounded-md bg-beige"
        type="password"
        name="password"
        {...register("password", {
          required: "Veuillez renseigner votre mot-de-passe",
        })}
      />
      {errors.password && (
        <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
          {errors.password?.message}
        </p>
      )}
      {err ? (
        <p
          role="alert"
          className="bg-red-700 text-beige text-md px-1 rounded-md"
        >
          {err}
        </p>
      ) : null}
      <button
        type="submit"
        className="bg-green text-beige text-2xl px-3 mt-5 rounded py-1 hover:text-3xl active:bg-beige active:text-green"
      >
        Me connecter
      </button>
    </form>
  );
}
