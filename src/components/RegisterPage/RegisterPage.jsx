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

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

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
        const { username, password, email, firstName, lastName } = this.state;
        const { dispatch } = this.props;
        if (username && password && email) {
            const obj = {
                login: username,
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            }
            dispatch(userActions.register(obj));
            
        }
        this.setState({password:'', confirmPassword:''});
    }

    componentWillMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, email, firstName, lastName, confirmPassword } = this.state;
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
                                        <Typography align="center" variant='display3' color="primary">Sign Up</Typography>
                                        <Link className="link" to="/login"><Typography align="center" variant='caption'>Have an account?</Typography></Link></Grid>
                                    <Grid item>
                                        <TextValidator
                                            required
                                            fullWidth
                                            label="E-mail"
                                            onChange={this.handleChange("email")}
                                            type="email"
                                            name="email"
                                            value={email}
                                            validators={['required', 'isEmail']}
                                            errorMessages={['this field is required', 'email is not valid']}
                                            margin="dense"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextValidator
                                                fullWidth
                                                required
                                                label="Login"
                                                onChange={this.handleChange("username")}
                                                type="text"
                                                name="username"
                                                value={username}
                                                validators={['required','minStringLength:6']}
                                                errorMessages={['this field is required','login must have atleast 6 characters']}
                                                margin="dense"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextValidator
                                            required
                                            fullWidth
                                            label="Password"
                                            onChange={this.handleChange("password")}
                                            name="password"
                                            type="password"
                                            margin="dense"
                                            value={password}
                                            validators={['required','matchRegexp:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}']}
                                            errorMessages={['this field is required', 'Password must have contains at least 6 characters; one lowercase character; one upperrcase character; one digit from 0-9.']}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextValidator
                                            required
                                            fullWidth
                                            label="Repeat password"
                                            onChange={this.handleChange("confirmPassword")}
                                            name="repeatPassword"
                                            type="password"
                                            validators={['isPasswordMatch', 'required']}
                                            errorMessages={['password mismatch', 'this field is required']}
                                            value={confirmPassword}
                                            margin="dense"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            label="First name"
                                            type="text"
                                            value={firstName}
                                            onChange={this.handleChange("firstName")}
                                            margin="dense"
                                        />

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
                                    {
                                    loggingIn? <Grid item align="center"><Circular /></Grid>:
                                    <Button type="submit" xs={12} variant="raised" size="large" color="primary" style={{margin:"10px auto"}}>
                                    Sign up
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

function mapStateToProps(state) {
    const { loggedIn } = state.authentication;
    return {
        loggedIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(RegisterPage);
export { connectedLoginPage as RegisterPage };