import React, { useState } from "react";
import { Link } from "@reach/router";
import { auth, generateUserDocument } from "../database/firebase";
import Swal from "sweetalert2"

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [error, setError] = useState(null);
  
    const createUserWithEmailAndPasswordHandler = async (event) => {
  
      event.preventDefault(); // POST , GET , PHP, JAVA , ASP, ETC
  
      setError("");
      try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        generateUserDocument(user, { displayName });
        Swal.fire(
          'Inicio de sesion exitoso',
          `Bienvenido ${email}`,
          'success'
      );
      }
      catch (error) {
        Swal.fire(
          'Error!',
          error.message,
          'error'
      )
      }
      setEmail("");
      setPassword("");
      setDisplayName("");
    };
  
    const onChangeHandler = event => {
      const { name, value } = event.currentTarget;
      if (name === "userEmail") {
        setEmail(value);
      } else if (name === "userPassword") {
        setPassword(value);
      } else if (name === "displayName") {
        setDisplayName(value);
      }
    };
  
    return (
      <div className="Registro">
        <div className="mt-8">
          <h1 className="text-3xl mb-2 text-center font-bold">Crear Cuenta</h1>
          <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
            {error !== null && (
              <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
                {error}
              </div>
            )}
            <div className="form-cuenta">
                <div className="grupo-inputs">
                    <input type="text"  name="displayName" placeholder="Ingresar Nombre" onChange={ (event) => onChangeHandler(event)} />
                    <input type="email"  name='userEmail' placeholder="Email" onChange={ (event) => onChangeHandler(event)} />
                    <input type="password" id="userEmail" value={password}  name="userPassword" placeholder="Contraseña" onChange={ (event) => onChangeHandler(event)}/>
                </div>
                     
                         
              <button className="botonIniciarSesion" 
                onClick={event => {
                  createUserWithEmailAndPasswordHandler(event);
                }}
              ><i class="fa fa-save"></i>  Guardar
            </button>
            </div>
            <p className="text-center my-3">
              {" "}
              <Link to="/" className="text-blue-500 hover:text-blue-600">
                Regresar Login
            </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default SignUp;