import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import ReactDOM from "react-dom/client";

import App from "./App";
import Contact from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import CreateRecipePage from "./pages/CreateRecipePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: async () => {
          const recipes = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/recipe`
          ).then((res) => res.json());
          return recipes;
        },
      },
      {
        path: "/createrecipe",
        element: <CreateRecipePage />,
        loader: async () => {
          const ingredients = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/ingredient`
          );
          const unit = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/unit`
          );
          return { ingredients, unit };
        },
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "*",
        element: <div>Not Found</div>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
