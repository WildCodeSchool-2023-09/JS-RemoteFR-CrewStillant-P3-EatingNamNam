import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import App from "./App";
import Contact from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import Conditions from "./pages/ConditionPage";

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
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/Conditions",
        element: <Conditions />,
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
