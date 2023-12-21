import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./pages/ContactPage";
import HomePage from "./pages/HomePage";

import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: async () => {
          const recipes = await fetch("http://localhost:3310/api/recipe").then(
            (res) => res.json()
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
