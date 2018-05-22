import React from 'react';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../actions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Circular from '../styles/Circular';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'




class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.props.dispatch(userActions.logout());

        this.state = {
            username: 'Test1000',
            password: 'FKdf9dFff23',
            submitted: false
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();
        
        this.setState({submitted: true});
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password){
            dispatch(userActions.login(username,password));
        }
    }

    render() {
        const { loggingIn, error } = this.props;
        const { username, password, submitted } = this.state;
        console.log(error);
        return (
            <div> 
                <Grid container
                //alignItems="center"
                justify="center"
                direction="row"
                >

                    <Grid item xs={2}>
                        
                                <Grid 
                                direction="column"
                                alignItems="row"
                                container
                                >
                                    <Grid item>
                                        <Typography align="center" variant='display3' style={{color:"black"}}>Sign In</Typography>
                                        <Link to="/register"><Typography align="center" variant='caption'>Need an account?</Typography></Link>
                                    </Grid>
                                    <Grid item >
                                        <TextField
                                            fullWidth
                                            label="Login"
                                            type="text"
                                            value={username}
                                            onChange={this.handleChange("username")}
                                            autoFocus
                                            margin="normal"
                                            />
                                        {
                                            submitted && !username && 
                                            <Typography variant="caption" color="error">Username is required</Typography>
                                        }
                                    </Grid>
                                    <Grid xs={12} item>
                                        <TextField
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={this.handleChange("password")}
                                        
                                        margin="normal"
                                        />
                                        {
                                            submitted && !password && 
                                            <Typography variant="caption" color="error">Password is required</Typography>
                                        }
                                    </Grid>
                                    <Grid item xs={12} style={{marginTop:"20px"}}>
                                        <Grid container direction="columns" justify="center">
                                            <Grid item>
                                                {
                                                loggingIn? <Circular/>:
                                                <Button variant="raised" size="large" color="primary" onClick={this.handleSubmit}>
                                                Sign in
                                                </Button>
                                                }
                                            </Grid>
                                        </Grid>
                                    </Grid>
{/*                                     {error && <Grid xs={12} item>
                                        <Typography align="center" variant='display1' color="error">Error</Typography>
                                    </Grid>} */}
                                </Grid>

                   </Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state){
    const { loggingIn,error } = state.authentication;
    return {
        loggingIn,error
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };