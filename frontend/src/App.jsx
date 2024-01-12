import { Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [auth, setAuth] = useState({ token: "", userVerified: "" });
  return (
    <div className="bg-beige">
      <Navbar />
      <Outlet context={{ auth, setAuth }} />
      <Footer />
    </div>
  );
}

export default App;
