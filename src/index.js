import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './helpers';
import { App } from './App';

render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('app'));


/*import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { routerReducer } from 'react-router-redux' 
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import App from './components/App'
import './index.css'

const initialState = [
    "dadd1",
    'dadkl2'
]

function playlist(state=initialState, action){
    if(action.type === 'ADD_TRACK'){
        return [
            ...state,
            action.payLoad
        ];
    }
    return state;
}
const store = createStore(playlist, composeWithDevTools(applyMiddleware(thunk)));
store.subscribe(() => {
    console.log('subscribe', store.getState());
});

store.dispatch({type:"ADD_TRACK", payLoad:"fdskjfh"})
store.dispatch({type:"ADD_TRACK", payLoad:"111111111111jfh"})
ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </BrowserRouter>
    </Provider>
),document.getElementById('app'));
*/