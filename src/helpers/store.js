import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers';

import {dictionaries} from '../localize/dictionaries'
import {languages } from '../localize/languages'
import { i18nActions} from 'redux-react-i18n'
 



const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
    )
);

let lng = localStorage.getItem('lang')
console.log("localstorage",lng)
if(!lng){
    localStorage.setItem('lang','ru-RU')
    lng = 'ru-RU'
} 

store.dispatch( i18nActions.setLanguages(languages));
store.dispatch( i18nActions.setDictionaries(dictionaries));
store.dispatch( i18nActions.setCurrentLanguage(lng));

export {store}
