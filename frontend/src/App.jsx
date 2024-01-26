import { Outlet } from "react-router-dom";
import { useState } from "react";

import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";

import "react-toastify/dist/ReactToastify.css";

function App() {
  const [auth, setAuth] = useState({});

  return (
    <div className="bg-beige">
      <Navbar auth={auth} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
      <Outlet context={{ auth, setAuth }} />
      <Footer />
    </div>
  );
}

export default App;
