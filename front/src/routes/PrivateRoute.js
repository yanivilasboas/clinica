import React from 'react'

import { Route, Redirect } from 'react-router'

import {ACCESS_TOKEN} from '../services/constantes'

const PrivateRoute = props => {
    const isLogged = !!localStorage.getItem(ACCESS_TOKEN)
    return isLogged ? <Route {...props}/> : <Redirect to="/"/>
}

export default PrivateRoute