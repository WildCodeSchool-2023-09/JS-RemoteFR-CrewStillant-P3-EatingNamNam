import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./pages/ContactPage";
import HomePage from "./pages/HomePage";

import App from "./App";
import NewRecipePage from "./pages/NewRecipePage";

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
        path: "/new-recipe",
        element: <NewRecipePage />,
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
