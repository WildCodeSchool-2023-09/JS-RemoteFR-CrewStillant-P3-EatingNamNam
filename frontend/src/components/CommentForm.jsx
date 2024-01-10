/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from "react-hook-form";
// import axios from "axios";
import PropTypes from "prop-types";

export default function CommentForm({ recipeID }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: recipeID,
    },
  });

  const onSubmit = async (data) => {
    try {
      console.info(data);
      // await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user`, data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-black">
      <h1>Nouveau commentaire :</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" name="comment" {...register("content")} />
        {errors.content && (
          <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
            {errors.content?.message}
          </p>
        )}
        <button type="submit">Envoyer mon commentaire</button>
      </form>
    </div>
  );
}

CommentForm.propTypes = {
  recipeID: PropTypes.number.isRequired,
};
