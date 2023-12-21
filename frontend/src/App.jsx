import { Outlet } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <h1>HELLO WORLD</h1>
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
