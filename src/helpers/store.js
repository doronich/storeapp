import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers';

import {dictionaries} from '../localize/dictionaries'
import {languages } from '../localize/languages'
import { i18nActions} from 'redux-react-i18n'
import { itemConstants } from '../constants'



const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
    )
);

let lng = localStorage.getItem('lang')
if(!lng){
    localStorage.setItem('lang','ru-RU')
    lng = 'ru-RU'
} 
let currency = localStorage.getItem('currency')
if(!currency){
    localStorage.setItem('currency','rub')
    currency='rub';
}
store.dispatch({type:itemConstants.SET_CURRENCY,data:currency})
store.dispatch( i18nActions.setLanguages(languages));
store.dispatch( i18nActions.setDictionaries(dictionaries));
store.dispatch( i18nActions.setCurrentLanguage(lng));

export {store}
