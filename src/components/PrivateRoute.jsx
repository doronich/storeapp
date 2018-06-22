import React from 'react'
import { Route, Redirect } from 'react-router-dom'


export const AdminRoute = ({ component: Component, ...rest }) => {
    const user = JSON.parse( localStorage.getItem('user'));
    return <Route {...rest} render={props => (
        user && (user.role === "Admin")
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    )} />
};

export const LoggedInRoute = ({ component: Component, ...rest}) =>{
    const user = JSON.parse( localStorage.getItem('user'));
    return <Route {...rest} render={props=>(
        user?<Component {...props}/>
            :<Redirect to={{ pathname:'login', state: {from:props.location} }}/>
    )}/>
};

