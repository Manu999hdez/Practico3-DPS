import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';

//importamos las pag
import Application from "./components/Login/Application";
import UserProvider from "./components/Providers/UserProvider"
import BarraNav from './components/elementos/BarraNav/BarraNav';
import Empresa from './components/Empresa/Sucursales';


function App() {
  return (
    <Router>
      <div className ="App">
      <UserProvider>
        <Application />
      </UserProvider>
      </div>
      </Router>
  );
}

export default App;

