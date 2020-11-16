import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


// Elementos de la pagina

import BarraNav from '../BarraNav';

import ProfilePage from "../../../Login/ProfilePage";
import Empresa from "../../../Empresa/Sucursales";


const App = () => {

  return (
    <Router>
        
        <header>
          <BarraNav />
        </header>

        <Switch>
          <Route path="/empresa">
            <Empresa/>
          </Route>
          {/* Ruta de la pagina de inicio (Ruta raiz) */}
          <Route path="/perfil">
            <ProfilePage/>
          </Route>

        </Switch>
      
    </Router>
  );
}

export default App;