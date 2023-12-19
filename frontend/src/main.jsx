// import react

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import App from "./App";
import MyRecipe from "./pages/MyRecipe";
import UserCompte from "./pages/UserCompte";

// imports page

// router

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/compte",
    element: <UserCompte />,
  },
  {
    path: "/recettes",
    element: <MyRecipe />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
