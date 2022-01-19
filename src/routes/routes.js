import React, {useState, useEffect} from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "../pages/Home/index";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import {ACCESS_TOKEN} from '../services/constantes'
import { Paciente } from '../pages/Paciente';
import Pacientes from '../pages/Listagem/pacientes';
import { Enfermeiro } from '../pages/Enfermeiro';
import Enfermeiros from '../pages/Listagem/enfermeiros';
import { Medico } from '../pages/Medico';
import Medicos from '../pages/Listagem/medicos';



export default function Routes() {

  const [usuarioLogado, setUsuarioLogado] = useState(false);

  useEffect(() => {
    setUsuarioLogado(!!localStorage.getItem(ACCESS_TOKEN));
  },[])

  return (
    <BrowserRouter>
      <Switch>
        
        <PrivateRoute exact path="/home" component={Home} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />

        <PrivateRoute exact path="/paciente" component={Paciente} />
        <PrivateRoute path="/pacientes" component={Pacientes} />

        <PrivateRoute exact path="/enfermeiro" component={Enfermeiro} />
        <PrivateRoute exact path="/enfermeiros" component={Enfermeiros} />

        <PrivateRoute exact path="/medico" component={Medico} />
        <PrivateRoute exact path="/medicos" component={Medicos} />
        

        <Route exact path="/" component={Login} setUsuarioLogado={setUsuarioLogado}/>


      </Switch>
    </BrowserRouter>
  );
}
