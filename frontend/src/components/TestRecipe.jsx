// import React, { useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// /* eslint-disable react/jsx-props-no-spreading */

// export default function TestRecipe() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const onSubmit = (data) => console.info(data);

//   const ingredients = axios
//     .get(`${import.meta.env.VITE_BACKEND_URL}/api/ingredient`)
//     .then((res) => res.json());
//   console.log(ingredients);

//   return (
//     <div className="flex flex-col gap-4 mb-3 bg-blue-400">
//       <input type="text" name="" />
//       <select name="" id="">
//         <option value="">Liste des ingrédients</option>
//         {/* {ingredients.map((i) => (
//           <option key={i.id} value={i.name}>
//             {i.name}
//           </option>
//         ))} */}
//       </select>
//     </div>
//   );
// }
