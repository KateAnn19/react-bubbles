import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    const token = localStorage.getItem('token');
    return(
        <Route {...rest} render={() => {
            if(token){
                //render component
                return <Component/>
            }else{
                return <Redirect to='/login'/>
            }
        }}
        />
    )
}

export default PrivateRoute;