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
          const response = await fetch("http://localhost:3310/api/recipe");
          const recipes = await response.json();
          return { recipes };
        },
      },
      {
        path: "/recipe/:id",
        element: <RecipesPage />,
        loader: async ({ params }) => {
          const recipe = await fetch(
            `http://localhost:3310/api/recipe/${params.id}`
          );
          return { recipe };
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
