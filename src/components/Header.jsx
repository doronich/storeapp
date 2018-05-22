import React from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

export default class Header extends React.Component{

    render(){
        return (
            <div style={{marginBottom:"30px"}}> 
                    <Grid className="navbar" container>
                        <Grid className="nav" container item  direction="row" justify="center" alignItems="center">
                            <Grid item><Button><Link className="link" to="/">Home</Link></Button></Grid>
                            <Grid item><Button><Link className="link" to="/register">Sign up</Link></Button></Grid>
                            <Grid item><Button><Link className="link" to="/login">Sign in</Link></Button></Grid>
                        </Grid>
                    </Grid>
                {/* <Paper>
                    <Tabs
                        value="Home"
                        textColor="primary"
                        centered
                    >
                    
                    <Tab label="Home"><Link className="link" to="/">Home</Link></Tab>
                    <Tab label="Sign up"><Link className="link" to="/register">Sign up</Link></Tab>
                    <Tab label="Sign in"/>
                    </Tabs>
                </Paper> */}
            </div>
        );
    }

}