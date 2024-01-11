/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

export default function CommentForm({ recipeID, isValidated, setIsValidated }) {
  const { auth } = useOutletContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      recipe_id: recipeID,
      user_id: auth.id,
    },
  });

  const onSubmit = async (data) => {
    try {
      await axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/comment`, data)
        .then((res) => console.info(res.data))
        .then(setIsValidated(true));
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border-green border-4 rounded-2xl p-3 bg-slate-200">
      <h1 className="text-2xl mb-2">Nouveau commentaire :</h1>
      {isValidated ? (
        <p className="text-xl text-center">Commentaires posté !</p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-2"
        >
          <textarea
            name="comment"
            className="h-16 px-1 text-xl rounded-md w-full"
            {...register("content", {
              required: "Ce champs est obligatoire",
              minLength: {
                value: 20,
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
            className="text-xl border-2 bg-orange px-2 py-1 rounded-md text-beige active:bg-green hover:bg-opacity-85"
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
