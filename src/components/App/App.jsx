import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../../helpers';
//import { alertActions } from '../../actions';
import { PrivateRoute } from '../';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage'
import { Aside } from '../Aside'
import Header from '../Header.jsx'
import Footer from '../Footer.jsx'
import { ContactsPage } from '../ContactsPage'
import { AddItemPage, UpdateItemPage, Items} from '../ItemPages'
import { ToUpButton } from '../ToUpButton/ToUpButton';


class App extends React.Component {

    render() {

        return (
            <Router history={history}>
                <div className="wrapper">
                    <Header />
                    <ToUpButton/>
                    <div className="content">
                        <Aside />
                        
                        <Route exact path='/' component={HomePage} />
                        <PrivateRoute exact path="/additem" component={AddItemPage} />
                        <PrivateRoute exact path="/updateitem/:number" component={UpdateItemPage}/>
                        {/* <PrivateRoute exact path="/allitems" component={Items}/> */}
                        <Route exact path="/allitems" component={Items}/>
                        <Route path='/login' component={LoginPage} />
                        <Route path='/register' component={RegisterPage} />
                        <Route path='/contacts' component={ContactsPage} />
                    </div>
                    <div className="footer">
                        <Footer />
                    </div>
                </div>
            </Router>
        );
    }
}


const connectedApp = connect()(App);
export { connectedApp as App };
