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

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.dispatch(userActions.logout());

        this.state = {
            email: '',
            username: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            submitted: false
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ submitted: true });
        const { username, password, submitted, email, firstName, lastName, confirmPassword } = this.state;
        const { dispatch } = this.props;
        if (username && password && email && firstName) {
            const obj = {
                login: username,
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            }
            dispatch(userActions.register(obj));
        }
    }

    render() {
        const { loggingIn, error } = this.props;
        const { username, password, submitted, email, firstName, lastName, confirmPassword } = this.state;
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
                                alignContent="row"
                                container >
                                    
                                    
                                    <Grid item>
                                        <Typography align="center" variant='display3' color="primary">Sign Up</Typography>
                                        <Link to="/login"><Typography align="center" variant='caption'>Have an account?</Typography></Link></Grid>
                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            required
                                            label="E-mail"
                                            type="text"
                                            value={email}
                                            onChange={this.handleChange("email")}
                                            autoFocus
                                            margin="dense"
                                        />
                                        {
                                            submitted && !username &&
                                            <Typography variant="caption" color="error">Username is required</Typography>
                                        }
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            required
                                            label="Login"
                                            type="text"
                                            value={username}
                                            onChange={this.handleChange("username")}
                                            margin="dense"
                                        />
                                        {
                                            submitted && !username &&
                                            <Typography variant="caption" color="error">Username is required</Typography>
                                        }
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            required
                                            label="Password"
                                            type="password"
                                            value={password}
                                            onChange={this.handleChange("password")}
                                            margin="dense"
                                        />
                                        {
                                            submitted && !password &&
                                            <Typography variant="caption" color="error">Password is required</Typography>
                                        }
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            required
                                            label="Confirm password"
                                            type="password"
                                            value={confirmPassword}
                                            onChange={this.handleChange("confirmPassword")}
                                            margin="dense"
                                        />
                                        {
                                            submitted && !password &&
                                            <Typography variant="caption" color="error">Password is required</Typography>
                                        }
                                        {
                                            submitted && !password === confirmPassword &&
                                            <Typography variant="caption" color="error">Your password don't match.<br /> Please retype your password to confirm it.</Typography>
                                        }
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            required
                                            label="First name"
                                            type="text"
                                            value={firstName}
                                            onChange={this.handleChange("firstName")}
                                            margin="dense"
                                        />
                                        {
                                            submitted && !username &&
                                            <Typography variant="caption" color="error">First name is required</Typography>
                                        }
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            label="Last name"
                                            type="text"
                                            value={lastName}
                                            onChange={this.handleChange("lastName")}
                                            margin="dense"
                                        />
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
                                    {/* error && <Grid item>
                                        <Typography variant='display3' color="error">Error</Typography>
                                    </Grid> */}
                                </Grid>
                        

                    </Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn, error } = state.authentication;
    return {
        loggingIn, error
    };
}

const connectedLoginPage = connect(mapStateToProps)(RegisterPage);
export { connectedLoginPage as RegisterPage };