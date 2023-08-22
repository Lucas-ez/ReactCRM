import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Servicios from '../pages/Servicios'
import Clientes from '../pages/Clientes'
import Contratos from '../pages/Contratos'
import Usuarios from '../pages/Usuarios'
import Cuenta from '../pages/Cuenta'

const RouteContent = () => {
  return (
    <Routes>
      <Route path='/' Component={Home}/>
      <Route path='/servicios' Component={Servicios}/>
      <Route path='/clientes' Component={Clientes}/>
      <Route path='/contratos' Component={Contratos} />
      <Route path='/usuarios' Component={Usuarios} />
      <Route path='/cuenta' Component={Cuenta} />
    </Routes>
  )
}

export default RouteContent