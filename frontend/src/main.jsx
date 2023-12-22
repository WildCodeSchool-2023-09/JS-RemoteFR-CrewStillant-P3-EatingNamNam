import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import App from "./App";
import Contact from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import RecipesPage from "./pages/RecipesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: async () => {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/recipe`
          );
          const recipes = await response.json();
          return recipes;
        },
      },
      {
        path: "/recipe/:id",
        element: <RecipesPage />,
        loader: async ({ params }) => {
          const id = parseInt(params.id, 10);
          const recipes = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/recipe/${id}`
          );
          return recipes;
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
