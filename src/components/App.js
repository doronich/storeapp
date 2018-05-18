import React from 'react'
import {Route, Switch } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'
import Register from './Register'
import Login from './Login'
import Home from './Home'



class App extends React.Component{
    render(){
        return (
            <div>
                <Header/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/login" component={Login}/>
                    </Switch>
                <Footer/>
            </div>
        );
    }
}

export default App;