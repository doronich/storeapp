import React from 'react'
import { Loc } from 'redux-react-i18n';
import { Typography } from '@material-ui/core';

export class NotFoundPage extends React.Component {

    render() {
        document.title = "Page not found"
        return (
            <div style={{display:"flex",flexDirection:"column"}}>
                <Typography variant="display4" color="error" align="center">404 error </Typography>
                <br/>
                <Typography variant="display3" color="default" align="center"><Loc locKey="notfound"/></Typography>
            </div>
        )
    }
}