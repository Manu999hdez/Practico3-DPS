import React, { useContext } from "react";
import { UserContext } from "../Providers/UserProvider";
import { auth } from "../database/firebase";
import { Router, Link } from "@reach/router";

const ProfilePage = () => {

  // Asigna un user para leer el contexto del tema actual.
  // React encontrará el Provider superior más cercano y usará su valor.
  const user = useContext(UserContext);

  const { photoURL, displayName, email } = user;
  console.log(" Usuario ProfilePage : " + displayName + " - " + email);

  const signOut = () => {
    auth.signOut();  
  };

  return (
    <div className = "profile">
            <div className="container">
        <div className="row">
          <div className="col-md-12">
            <span className="float-right">
              <div
                style={{
                  background: `url(${photoURL || 'https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png'})  no-repeat center center`,
                  backgroundSize: "cover",
                  height: "100px",
                  width: "100px"
                }}
                className="border border-blue-300"
              ></div>
              <br></br>
             Nombre : <h2 className="text-2xl font-semibold">{displayName}</h2>
              <br></br>
             Correo: <h3 className="italic">{email}</h3>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ProfilePage;