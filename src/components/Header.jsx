import React from 'react'
import { Link } from 'react-router-dom'

export default class Header extends React.Component{

    render(){
        return (
            <div>
                Header<br/>
                <Link className="link" to="/">Home</Link>
                <Link className="link" to="/register">Sign up</Link>
                <Link className="link" to="/login">Sign in</Link>
                <hr/>
            </div>
        );
    }

}