import React from "react";
import Empresa from "../Empresa/Empresa";
import "../../App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container p-4">
      <div className="row">
        <Empresa />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;