import React, { useContext } from "react";
import { Router } from "@reach/router";

import SignIn from "./signIn";
import SignUp from "./signUp";
import PasswordReset from "./passwordReset";

import Ruta from "../elementos/BarraNav/rutas/ruta";
import { UserContext } from "../Providers/UserProvider";


function Application() {
  // Asigna un user para leer el contexto actual.
  // React encontrará el Provider superior más cercano 
  // y usará su valor.
  const user = useContext(UserContext);
  console.log(" Usuario Application : " + user);

  return (
    user ? <Ruta />  // true
      : // false
      <Router> 
          <SignIn path="/" />
          <SignUp path="signUp" />
          <PasswordReset path="passwordReset" />      
      </Router>
  );
}

export default Application;