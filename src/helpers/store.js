import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers';

import { dictionaries } from '../localize/dictionaries'
import { languages } from '../localize/languages'
import { i18nActions } from 'redux-react-i18n'
import { itemConstants } from '../constants'
//import createAxiosMiddleware from './createAxiosMiddleware';


const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(
        thunkMiddleware,
    ),
    // other store enhancers if any
);

const store = createStore(
    rootReducer,
    enhancer
);

let lng = localStorage.getItem('lang')
if (!lng) {
    localStorage.setItem('lang', 'ru-RU')
    lng = 'ru-RU'
}
let currency = localStorage.getItem('currency')
if (!currency) {
    localStorage.setItem('currency', 'rub')
    currency = 'rub';
}
store.dispatch({ type: itemConstants.SET_CURRENCY, data: currency })
store.dispatch(i18nActions.setLanguages(languages));
store.dispatch(i18nActions.setDictionaries(dictionaries));
store.dispatch(i18nActions.setCurrentLanguage(lng));

export { store }
