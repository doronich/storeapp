import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../actions';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Circular from '../styles/Circular';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'

import { ValidatorForm } from 'react-material-ui-form-validator'



class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.logOut();
        this.state = {
            username: 'Test1000',
            password: 'FKdf9dFff23',
            submitted: false
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { logIn } = this.props;
        if (username && password) {
            logIn(username, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;

        return (
            <div>
                <Grid container
                    justify="center"
                >

                    <Grid item sm={4} lg={3} xl={2}>
                        <ValidatorForm onSubmit={this.handleSubmit}>
                            <Grid
                                direction="column"
                                container
                            >
                                <Grid item>
                                    <Typography align="center" variant='display3' style={{ color: "black" }}>Sign In</Typography>
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
                                        <Typography variant="caption" color="error">Login is required</Typography>
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
                                {
                                    loggingIn ? <Grid item align="center"><Circular /></Grid> :
                                        <Button type="submit" xs={12} variant="raised" size="large" color="primary" style={{ margin: "10px auto" }}>
                                            Sign in
                                    </Button>
                                }
                            </Grid>
                        </ValidatorForm>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}
const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(userActions.logout()),
    logIn:(username,password)=>dispatch(userActions.login(username,password))
})

const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export { connectedLoginPage as LoginPage };