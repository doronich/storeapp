import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './helpers';
import { App } from './components/App';
import  './index.css'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

//import red from '@material-ui/core/colors/red';


const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#000'
        },
        secondary:{
            main: "#5890bc"
        },
    }
});

render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Provider>,
document.getElementById('app'));
