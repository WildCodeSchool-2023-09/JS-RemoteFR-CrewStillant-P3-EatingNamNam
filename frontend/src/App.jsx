import { Outlet } from "react-router-dom";
import "./App.css";
import RegistrationForm from "./components/RegistrationForm";

function App() {
  return (
    <div>
      <h1>hello</h1>
      <Outlet />
      <RegistrationForm />
    </div>
  );
}

export default App;
