import React, { useState } from "react";
import { Link } from "@reach/router";
import { signInWithGoogle } from "../database/firebase";
import { auth } from "../database/firebase";
import Swal from 'sweetalert2';

const SignIn = () => {

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState(null);


    const signInWithEmailAndPasswordHandler = (event) => {

        event.preventDefault(); //DOM -> POST , GET -> PHP , JAVA , ASP , ETC
        Swal.fire(
          'Inicio de sesion exitoso',
          `Bienvenido ${email}`,
          'success'
      );
        console.log(" SignIn - signInWithEmailAndPasswordHandler ");
        const user= auth.signInWithEmailAndPassword(email, password).catch(error => {
          Swal.fire(
            'Error!',
            error.message,
            'error'
        )
        console.error("Error signing in with password and email ", error);
         });
         console.log(" SignIn - signInWithEmailAndPassword ");  
        console.log(" const user :  " + user);      
  };

    const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    }
    else if (name === 'userPassword') {
      setPassword(value);
    }
    };


  return (
    <div className="InicioSesion">
      <h1>Iniciar sesión</h1>
            {error !== null && (
              <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
                {error}
              </div>
            )}
            <div className="form-cuenta">
                <div className="grupo-inputs">
                    <input type="email"  name='userEmail' placeholder="Email" onChange={ (event) => onChangeHandler(event)} />
                    <input type="password" name="userPassword" placeholder="Contraseña" onChange={ (event) => onChangeHandler(event)}/>
                </div>


            <button type="submit" className="botonIniciarSesion"
              onClick={(event) => { signInWithEmailAndPasswordHandler(event) }}
            ><i className="fa fa-lock"></i>  Ingresar</button>
              <button className="botonIniciarSesion botonGoogle"
            onClick={() => { signInWithGoogle(); }}
          ><i className="lab la-google"></i>  Ingresar con Google
          </button>   
            </div> 
          <div className="existencia-cuenta">
            
          <p>¿No tienes cuenta?</p>
              <Link to="signUp"><button class="botonIrRegistro">
                Registrate
          </button></Link>
              <br />
              <br/>
              <Link to="passwordReset" className="text-blue-500 hover:text-blue-600">
                Olvido la contraseña ?
          </Link>
            </div>
          
        
        </div> 
    

  );
};

export default SignIn;