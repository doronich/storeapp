import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../../helpers';

import { AdminRoute } from '../';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage'
import { Aside } from '../Aside'
import Header from '../Header.jsx'
import Footer from '../Footer.jsx'
import { ContactsPage } from '../ContactsPage'
import { AddItemPage, UpdateItemPage, Items,ItemPage, ItemsPage, MItems, FItems } from '../ItemPages'
import { ToUpButton } from '../TopButton';
import { ChatContainer } from '../Chat'

class App extends React.Component {

    render() {

        return (
            <Router history={history}>
                <div className="wrapper">
                    <Header/>
                    <ToUpButton/>
                    <div className="content">
                        <Aside />
                        
                        <Route exact path='/' component={HomePage} />
                        <AdminRoute exact path="/additem" component={AddItemPage} />
                        <AdminRoute exact path="/updateitem/:number" component={UpdateItemPage}/>
                        <Route exact path="/item/:number" component={ItemPage}/>
                        {/* <PrivateRoute exact path="/allitems" component={Items}/> */}
                        <Route exact path="/allitems" component={Items}/>
                        <Route path='/login' component={LoginPage} />
                        <Route path='/register' component={RegisterPage} />
                        <Route path='/contacts' component={ContactsPage} />
                        <Route strict path='/f/items/:kind?/:subkind?/:brand?/:color?' component={FItems}/>
                        <Route strict path='/m/items/:kind?/:subkind?/:brand?/:color?' component={MItems}/>
                        <Route strict path='/items/:sex?/:kind?/:subkind?' component={ItemsPage}/>
                    </div>
                    <div className="footer">
                        <Footer />
                        <ChatContainer/>
                    </div>
                </div>
            </Router>
        );
    }
}


const connectedApp = connect()(App);
export { connectedApp as App };
