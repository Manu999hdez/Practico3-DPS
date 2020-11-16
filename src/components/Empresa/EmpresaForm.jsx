import React, { useState, useEffect } from "react";
import { db } from "../database/firebase";
//import { toast } from "react-toastify";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const gana=[];
const nom=[];
const empl=[];
  let emp=0;
  let c=0;
  let ma=0;
  let me=0;
  let resta=0;
  let posMa=0;
  let posMe=0;
  let empMe=null;
  let empMa=null;
  
 
const EmpresasForm = (props) => {


 // Con esta funcion borramos todos los elementos del formulario
 
  const initialStateValues = {
    sucursal: "",
    ganancias: "",
    empleados: 0,
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
    empl.push(values.empleados);
    c++;
    emp=-(-values.empleados-resta);
      
      if(emp>20){
        resta=emp-20;
        values.empleados=emp-resta;
        empMa = values.sucursal; 
        toast("Se han restado "+resta+" empleados de la sucursal "+values.sucursal+", porque llego a su limite.", {
        type: "info",
        });
      }

      if(emp<20)
      {
        values.empleados=emp;
        empMa = values.sucursal; 
        toast("Se han agregado "+(values.empleados-resta)+" nuevos empleados y "+resta+" empleados de la sucursal anterios.", {
        type: "info",
        });
      }
      
      
    if(c==3) {
      posMa=0;
      posMe=0;
      let contador =0;
      let may = [];
      let men = [];
      let suma = 0;
      for(let i = 0; i < gana.length; i++){
       
        suma += parseInt(gana[i]);
       

        if (gana[i] >= 1000 && gana[i] <= 25000){
          ma = gana[i];
          may.push(ma)
          empMa = nom[i];
          posMa = empl[i];
          contador=may.length;

          console.log("**********************************************************************");
          console.log("Sucursales que obtienen ganancias entre $1,000 y $25,000 son: "+contador);
          console.log(empMa+" Buen trabajo");
          console.log("Ganancias: "+ma);
          console.log("Empleados: "+posMa);
          console.log("**********************************************************************");
          
        }
        if (gana[i] > 25000) {
            me = gana[i];
            men.push(me);
            empMe = nom[i]; 
            posMe = empl[i];
            contador=men.length;
            console.log("**********************************************************************");
            console.log("Sucursales que obtienen ganancias mayores a $25,000 son: "+contador);
            console.log(empMe+" Excelente trabajo");
            console.log("Ganancias: "+me);
            console.log("Empleados: "+posMe);
            console.log("**********************************************************************");
        }
      }
      console.log("**********************************************************************");
      console.log("Ganancia Total de la Empresa: $"+suma)
      console.log("**********************************************************************");
      toast("Revisa la Consola", {
        type: "info",
      });

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