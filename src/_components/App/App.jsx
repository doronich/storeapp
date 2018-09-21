import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { history } from '../../helpers';

import { AdminRoute } from '../';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage'
//import { Aside } from '../Aside'
import Header from '../Header.jsx'
import { Footer } from "../Footer";
import { ContactsPage } from '../ContactsPage'
import { AddItemPage, UpdateItemPage, Items, ItemPage, ItemsPage } from '../ItemPages'
import { ToUpButton } from '../TopButton';
import { ChatContainer } from '../Chat'
import { ShoppingCart } from '../Shopping Cart'
import { LoggedInRoute } from '../PrivateRoute';
import { ProfilePage } from '../ProfilePage'
import { NotFoundPage } from '../NotFoundPage';
import { OrdersContainer } from '../Orders/Orders.Container';
import { AboutContainer } from '../About';
import { DeliveryContainer } from '../Delivery';
import { FavoritesContainer } from '../Favorites/Favorites.Container';
import { ProductContainer } from '../ProductPage';


const mapStateToProps = (state) => {
    return {}
};

class App extends React.Component {

    render() {
        return (
            <Router history={history}>
                <div className="wrapper">
                    <Header />

                    <ToUpButton />
                    <div className="content">
                        <Switch>
                            {/* <Aside /> */}
                            <Route exact path='/' component={HomePage} />
                            <AdminRoute exact path="/additem" component={AddItemPage} />
                            <AdminRoute exact path="/updateitem/:number" component={UpdateItemPage} />
                            <Route exact path="/item/:number" component={ItemPage} />
                            <Route exact path="/products" component={ProductContainer} />
                            <AdminRoute exact path="/allitems" component={Items} />
                            <AdminRoute exact path="/orders" component={OrdersContainer} />
                            <Route path='/login' component={LoginPage} />
                            <Route path='/register' component={RegisterPage} />
                            <Route path='/contacts' component={ContactsPage} />
                            <Route strict path='/items' component={ItemsPage} />
                            <Route exact path="/about" component={AboutContainer} />
                            <Route exact path="/delivery" component={DeliveryContainer} />
                            <Route path='/cart' component={ShoppingCart} />
                            <LoggedInRoute exact path="/profile" component={ProfilePage} />
                            <LoggedInRoute exact path="/favorites" component={FavoritesContainer} />
                            <Route strict path="/404" component={NotFoundPage} />
                            <Redirect strict from="/*" to="/404" />
                        </Switch>
                    </div>

                    <div className="footer">
                        <Footer />
                        <ChatContainer />
                    </div>
                </div>
            </Router>
        );
    }
}


const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };
