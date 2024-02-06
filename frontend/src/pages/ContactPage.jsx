/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import { toast } from "react-toastify";

function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact`,
        data
      );

      if (response.status === 201) {
        toast.success(response.data.message);
        reset();
        navigate("/");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-8 h-screen text-orange text-2xl">
      <h2 className="text-5xl text-orange font-bold text-center">
        Contactez-nous
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center mt-8 py-8 gap-4 bg-slate-200 border-4 border-green rounded-xl"
      >
        <div className="flex sm:flex-row flex-col gap-8">
          <div className="flex sm:flex-row flex-col gap-2">
            <label htmlFor="name" className="">
              Votre nom
            </label>
            <input
              className="bg-slate-100 text-beige rounded-md"
              type="text"
              name="name"
              {...register("name", {
                required: "Ce champ est obligatoire",
                minLength: { value: 3, message: "Minimum 3 caractères" },
              })}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div className="flex sm:flex-row flex-col gap-2">
            <label htmlFor="email" className="">
              Votre email
            </label>
            <input
              className="bg-slate-100 text-beige rounded-md"
              type="email"
              {...register("email", {
                pattern: {
                  value: /[\w.%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}/,
                  message:
                    "Merci d'entrer une adresse email valide ex:nom@exemple.com",
                },
                required: "Ce champ est obligatoire",
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
        </div>
        <div className="flex sm:flex-row flex-col items-start gap-2">
          <label htmlFor="message" className="block">
            Votre message
          </label>
          <textarea
            className="bg-slate-100 text-beige rounded-md sm:w-[36rem] h-48"
            {...register("message", {
              required: "Ce champ est obligatoire",
              minLength: { value: 7, message: "Minimum 7 caractères" },
            })}
          />
          {errors.message && (
            <span className="text-red-500">{errors.message.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-green px-3 py-2 text-beige rounded-md shadow"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default ContactPage;
