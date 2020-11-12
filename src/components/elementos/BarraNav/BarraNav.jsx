import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from "../../database/firebase";
import './BarraNav.css';

class BarraNav extends React.Component {
    cambioMenu() {
        const menu = document.getElementById('navMenu'),
              boton = document.getElementById('botonMenu'); 
        
        menu.classList.toggle('menu-activo');

        if(boton.classList.contains('la-bars')) {
            boton.classList.remove('la-bars');
            boton.classList.add('la-times');
        }
        else {
            boton.classList.remove('la-times');
            boton.classList.add('la-bars');
        }
    }

    cambioMenuUsuario() {
        auth.signOut(); 
    }

    render() {
        return(
            <div className="navbar-contenedor">
            <nav className="navbar">

                <i className="las la-bars" id="botonMenu" onClick={this.cambioMenu}></i>

                <ul id="navMenu">
                    <li>
                        <Link to="/"><i className="las la-home"></i> Inicio</Link>
                    </li>
                    <li>
                        <Link to="/empresa"><i className="las la-credit-card"></i> Como comprar</Link>
                    </li>
                    <li>
                        <Link to="/perfil"><i className="las la-users"></i> Quienes Somos</Link>
                    </li>
                </ul>
            </nav>
            <nav className="navbar-usuario">
                <figure onClick={this.cambioMenuUsuario}>
                    <i className="las la-user-circle"></i>
                </figure>
            </nav>
        </div>
        );
    }
}

export default BarraNav;