import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

import { toast } from "react-toastify";

function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact`,
        data
      );

      if (response.status === 201) {
        toast.success(response.data.message);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="p-4 m-20">
      <h2 className="text-5xl text-orange font-bold mb-10 text-center">
        Contactez-nous
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex mb-5">
          <div className="w-1/2 mr-4">
            <label htmlFor="name" className="block text-2xl text-orange">
              Votre nom:
            </label>
            <input
              className="w-full h-10 bg-orange text-beige"
              type="text"
              name="name"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("name", {
                required: "Ce champ est obligatoire",
                minLength: { value: 3, message: "Minimum 3 caractères" },
              })}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div className="w-1/2">
            <label htmlFor="email" className="block text-2xl text-orange">
              Votre adresse email:
            </label>
            <input
              className="w-full h-10 bg-orange text-beige"
              type="email"
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("email", {
                pattern: {
                  value: /[\w.%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}/,
                  message:
                    "Merci d'entrer une adresse email valide comme nom@exemple.com",
                },
                required: "Ce champ est obligatoire",
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-2xl text-orange">
            Message:
          </label>
          <textarea
            className="w-full h-40 bg-orange text-beige"
            // eslint-disable-next-line react/jsx-props-no-spreading
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
          className="bg-green py-3 px-3 text-2xl text-beige"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default ContactPage;
