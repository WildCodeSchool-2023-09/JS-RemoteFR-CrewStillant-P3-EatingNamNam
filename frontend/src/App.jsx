import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <div className="bg-beige">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
