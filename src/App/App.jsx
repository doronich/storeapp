import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../helpers';
import { alertActions } from '../actions';
import { PrivateRoute } from '../components';
import { HomePage } from '../components/HomePage';
import { LoginPage } from '../components/LoginPage';
import { RegisterPage } from '../components/RegisterPage'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'



class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        /* history.listen((location, action)=>{
            dispatch(alertActions.clear());
        }); */
    }

    render() {
        const { alert } = this.props;

        return (
            
/*                 {alert.message &&
                    <div>{alert.message}</div>
                } */
                <Router history={history}>
                    <div className="wrapper">
                        <Header />
                        <div className="content">
                            <PrivateRoute exact path='/' component={HomePage} />
                            <Route path='/login' component={LoginPage} />
                            <Route path='/register' component={RegisterPage} />
                        </div>
                        <div className="footer">
                            <Footer/>
                        </div>
                        </div>
                </Router>
            
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
