import React, { useEffect, useState } from "react";
import EmpresaForm from "./EmpresaForm";
import { db } from "../database/firebase";
import Swal from 'sweetalert2';
import { toast } from "react-toastify";

const Empresas = () => {

  const [Empresas, setEmpresas] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const getEmpresas = async () => {
    db.collection("Empresas").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });

      setEmpresas(docs);
    });
  };

  const onDeleteEmpresa = async (id) => {
    if (window.confirm("are you sure you want to delete this Empresa?")) {
      await db.collection("Empresas").doc(id).delete();
      toast("Se elimino un Sucursal", {
        type: "error",
        //autoClose: 2000
      });
    }
  };

  useEffect(() => {
    getEmpresas();
  }, []);

  

  const addOrEditEmpresa = async (EmpresaObject) => {
    try {
      if (currentId === "") {
        await db.collection("Empresas").doc().set(EmpresaObject);
        toast("Se agrego un Sucursal", {
          type: "success",
        });
      console.log(EmpresaObject);
      } else {
        await db.collection("Empresas").doc(currentId).update(EmpresaObject);
        Swal.fire(
          'Se Actualizo reporte con exitoso',
          'success'
      );
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>    
    <div className="col-md-4 p-2">
      <h2>Agregar Empleados</h2>
      <EmpresaForm {...{ addOrEditEmpresa, currentId, Empresas }} />
    </div>

    <div className="col-md-8 p-2">
      <div className="container">
        <h2>Lista Empleados</h2>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Sucursal</th>
              <th>Ganancias</th>
              <th>Empleados</th>
              <th>Aciones</th>
            </tr>
          </thead>
          <tbody>
            {Empresas.map((Empresa) => (
              <tr key={Empresa.id}>
                <td>{Empresa.sucursal}</td>
                <td className="color-tot">${Empresa.ganancias}</td>
                <td>{Empresa.empleados}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => setCurrentId(Empresa.id)}>Editar</button>
                  &nbsp;
                  &nbsp;
                  <button className="btn btn-danger" onClick={() => onDeleteEmpresa(Empresa.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </>
  );
};
export default Empresas;