/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { useState } from "react";

export default function CommentForm({ recipeID, setIsValidated }) {
  const { auth } = useOutletContext();
  const [isCreated, setIsCreated] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      recipe_id: recipeID,
      user_id: auth.userVerified.id,
    },
  });
  const onSubmit = async (data) => {
    try {
      await axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/comment`, data, {
          headers: { Authorization: `Bearer ${auth.token}` },
        })
        .then((res) => console.info(res.data));
      setIsValidated(true);
      setIsCreated(true);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  if (isCreated) {
    setTimeout(() => setIsCreated(false), 3000);
  }

  return (
    <div className="border-green border-2 m-5 rounded-2xl p-3 bg-slate-200">
      <h1 className="text-lg text-beige rounded-xl p-2 bg-orange w-fit mb-2">
        Nouveau commentaire :
      </h1>
      {isCreated ? (
        <p className="text-xl text-center">Commentaires posté !</p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-2"
        >
          <textarea
            name="comment"
            className="h-16 px-1 text-xl rounded-2xl w-full bg-slate-200"
            {...register("content", {
              required: "Ce champs est obligatoire",
              minLength: {
                value: 10,
                message: "Votre commentaire est trop court...",
              },
              maxLength: {
                value: 1000,
                message:
                  "Votre commentaire est trop long, veuillez le réduire.",
              },
            })}
          />
          {errors.content && (
            <p
              role="alert"
              className="bg-red-600 text-beige text-sm p-0.5 w-fit"
            >
              {errors.content?.message}
            </p>
          )}

          <button
            className="text-lg border-2 bg-orange px-2 py-1 rounded-xl text-beige active:bg-green hover:bg-opacity-85"
            type="submit"
          >
            Envoyer mon commentaire
          </button>
        </form>
      )}
    </div>
  );
}

CommentForm.propTypes = {
  recipeID: PropTypes.number.isRequired,
  isValidated: PropTypes.bool.isRequired,
  setIsValidated: PropTypes.func.isRequired,
};
