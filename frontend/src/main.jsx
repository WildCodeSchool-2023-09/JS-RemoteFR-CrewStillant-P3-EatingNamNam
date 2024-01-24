import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import ReactDOM from "react-dom/client";
import App from "./App";
import Contact from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import CreateRecipePage from "./pages/CreateRecipePage";
import Conditions from "./pages/ConditionPage";
import RecipesPage from "./pages/RecipesPage";
import UserPage from "./pages/UserPage";
import UserInformation from "./components/UserInformation";
import AdminPage from "./pages/AdminPage";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: async () => {
          const recipes = await fetch(`${apiUrl}/api/recipe`).then((res) =>
            res.json()
          );
          return recipes;
        },
      },
      {
        path: "/recipe/:id",
        element: <RecipesPage />,
        loader: async ({ params }) => {
          const id = parseInt(params.id, 10);
          const recipe = await axios
            .get(`${apiUrl}/api/recipe/${id}`)
            .then((res) => res.data);
          const notation = await axios
            .get(`${apiUrl}/api/note/${id}`)
            .then((res) => res.data);
          return { recipe, notation };
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
        path: "/user",
        element: <UserPage />,
        children: [
          {
            path: "/user/info/:id",
            element: <UserInformation />,
            loader: async ({ params }) => {
              const user = await axios.get(`${apiUrl}/api/user/${params.id}`);
              return user;
            },
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminPage />,
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
