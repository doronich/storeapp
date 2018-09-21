import { combineReducers } from 'redux'

import { authentication } from './authentication.reducer'
import { item } from './item.reducer'
import { cart } from './cart.reducer'
import { order } from './order.reducer'
import { i18nReducer } from 'redux-react-i18n'
import { fav } from './fav.reducer'
//import { routerReducer } from "react-router-redux";

const rootReducer = combineReducers({
    //routing: routerReducer,
    authentication,
    item,
    cart,
    i18n: i18nReducer,
    order,
    fav
});

export default rootReducer;