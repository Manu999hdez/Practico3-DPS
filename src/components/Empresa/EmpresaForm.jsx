import React, { useState, useEffect } from "react";
import { db } from "../database/firebase";
//import { toast } from "react-toastify";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const gana=[];
const nom=[];
  let c=0;
  let ma=0;
  let me=0;
  let posMa=0;
  let posMe=0;
  let empMe=null;
  let empMa=null;
  

const EmpresasForm = (props) => {
  
 // Con esta funcion borramos todos los elementos del formulario
 
  const initialStateValues = {
    sucursal: "",
    ganancias: "",
    empleados: "",
  };

  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(values.sucursal != "" && values.ganancias != "" && values.empleados !=""){
    gana.push(values.ganancias);
    nom.push(values.sucursal);
    c++;
    if(c==3) {
     /* me=gana[0];
      ma=gana[0];*/
      posMa=1;
      posMe=1;
     /* empMa=nom[0];
      empMe=nom[0];*/
      for(let i = 0; i < gana.length; i++){
        
         /* ma = gana[i];
          empMa = nom[i];
          console.log("Mayores: "+ma+" nombre: "+empMa)
          console.log("Menores: "+me+" nombre: "+empMe)*/
        if (gana[i] >= 1000 && gana[i] <= 25000){
          ma = gana[i];
          empMa = nom[i];
          toast("El salario mayor es: $"+ma+" del empleado "+empMa+" #"+posMa+ "Buen trabajo", {
            type: "info",
          });
          console.log("Mayores: "+ma+" nombre: "+empMa)
        }else{
            me = gana[i];
            empMe = nom[i]; 
            toast("El salario menor es: $"+me+" del empleado "+empMe+ " #"+ posMe + "Excelente trabajo", {
              type: "warning",
            });
            console.log("Menores: "+me+" nombre: "+empMe)
        }
      }
     /* Swal.fire(
        "El salario mayor es: $"+ma+" del empleado "+empMa+" #"+posMa,
        "El salario menor es: $"+me+" del empleado "+empMe+ " #"+posMe,
        
    );*/
     /* toast("El salario mayor es: $"+ma+" del empleado "+empMa+" #"+posMa, {
        type: "info",
      });
      toast("El salario menor es: $"+me+" del empleado "+empMe+ " #"+posMe, {
        type: "warning",
      });*/
        
        posMa=0;
        posMe=0;
        empMe=null;
        empMa=null;
        c=0;
    }
      props.addOrEditEmpresa(values);
      setValues({ ...initialStateValues });
      
    }else{
      Swal.fire(
        'Llena todos lo campos!!',
        
    );
    }
  
};

  const getEmpresaById = async (id) => {
    const doc = await db.collection("Empresas").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      //https://stackoverflow.com/questions/56059127/how-to-fix-this-error-function-collectionreference-doc
      if (props.currentId !== null && props.currentId !== undefined) {
        getEmpresaById(props.currentId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId]);

  return (
    <form onSubmit={handleSubmit} className="card card-body border-primary">
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
        <i class="las la-city"></i>
        </div>
           <select className='form-control'  name = "sucursal" value={values.sucursal} onChange={handleInputChange}>
          <option >..selecciona una sucursal</option>
          <option >Sucursal 1</option>
          <option >Sucursal 2</option>
          <option >Sucursal 3</option>
        </select>
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
        <i class="las la-dollar-sign"></i>
        </div>
        <input
          type="number"
          min="1000" 
          max="50000"
          step="1"
          value={values.ganancias}
          name="ganancias"
          placeholder="Ingrese sus ganancias"
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
        <i class="las la-users"></i>
        </div>
        <input
          type="number"
          min="10" 
          max="500"
          step="1"
          value={values.empleados}
          name="empleados"
          placeholder="Ingrese cantidad de empleados"
          className="form-control"
          onChange={handleInputChange}
        />
      </div>
      <button className="btn btn-primary btn-block">
        {props.currentId === "" ? "Guardar" : "Actualizar"} 
      </button>
      
    </form>
  );
};

export default EmpresasForm;