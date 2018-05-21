import React from 'react'
import {Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from './Header'
import Footer from './Footer'
import Register from './Register'
import Login from './Login'
import Home from './Home'



class App extends React.Component{
    render(){
        console.log(this.props.testStore)
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

export default connect(
    state=> ({
        testStore: state
    }),
    dispatch => ({})   
)(App);