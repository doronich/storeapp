import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { userConstants } from '../../constants'
import { userService } from '../../services'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Circular from '../styles/Circular';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import {Loc} from 'redux-react-i18n'

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

const mapStateToProps = state => {
    const { inProgress } = state.authentication;
    return {
        inProgress
    };
}
const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch({type:userConstants.LOGOUT}),
    reg:() => dispatch({type:userConstants.REGISTER}),
    success: (user) => dispatch({ type: userConstants.SUCCESS, user }),
    error: () => dispatch({ type: userConstants.ERROR })
});

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);
        //console.log('register ',this.props);
        this.props.logOut();

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

        this.props.reg();
        const { username, password, email, firstName, lastName } = this.state;
        if (username && password && email) {
            const obj = {
                login: username,
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            }
            userService.register(obj)
                .then(user => {
                    if (user && user["acces_token"]) {
                        this.props.success(user)
                        this.props.history.push('/')
                    } else {
                        this.props.error();
                    }
                    
                });
            
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
        const { inProgress } = this.props;
        const { username, password, email, firstName, lastName, confirmPassword } = this.state;
        return (
            <div>
                <Grid container
                    justify="center"
                    >
                    <Grid item xs={8} sm={6} lg={3} xl={2}>
                        <ValidatorForm onSubmit={this.handleSubmit}>
                                <Grid 
                                direction="column"
                                container
                                >
                                    <Grid item>
                                        <Typography align="center" variant='display1' color="secondary"><Loc locKey="account.signup"/></Typography>
                                        <Link className="link" to="/login"><Typography align="center" variant='caption'><Loc locKey="account.needLog"/></Typography></Link></Grid>
                                    <Grid item>
                                        <TextValidator
                                            required
                                            fullWidth
                                            label="E-mail"
                                            onChange={this.handleChange("email")}
                                            type="email"
                                            name="email"
                                            value={email}
                                            validators={[ 'isEmail']}
                                            errorMessages={[<Loc locKey="account.emailreq"/>]}
                                            margin="dense"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextValidator
                                            fullWidth
                                            required
                                            label={<Loc locKey="account.login"/>}
                                            onChange={this.handleChange("username")}
                                            type="text"
                                            name="username"
                                            value={username}
                                            validators={['minStringLength:6']}
                                            errorMessages={[<Loc locKey="account.loginreq"/>]}
                                            margin="dense"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextValidator
                                            required
                                            fullWidth
                                            label={<Loc locKey="account.pass"/>}
                                            onChange={this.handleChange("password")}
                                            name="password"
                                            type="password"
                                            margin="dense"
                                            value={password}
                                            validators={['matchRegexp:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}']}
                                            errorMessages={[<Loc locKey="account.passreq"/>]}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextValidator
                                            required
                                            fullWidth
                                            label={<Loc locKey="account.confpass"/>}
                                            onChange={this.handleChange("confirmPassword")}
                                            name="repeatPassword"
                                            type="password"
                                            validators={['isPasswordMatch']}
                                            errorMessages={[<Loc locKey="account.passmism"/>]}
                                            value={confirmPassword}
                                            margin="dense"
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            label={<Loc locKey="account.fname"/>}
                                            type="text"
                                            value={firstName}
                                            onChange={this.handleChange("firstName")}
                                            margin="dense"
                                        />

                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            fullWidth
                                            label={<Loc locKey="account.lname"/>}
                                            type="text"
                                            value={lastName}
                                            onChange={this.handleChange("lastName")}
                                            margin="dense"
                                        />
                                    </Grid>
                                    {
                                    inProgress? <Grid item align="center"><Circular /></Grid>:
                                    <Button type="submit" xs={12} variant="raised" size="large" color="secondary" style={{margin:"10px auto"}}>
                                    {<Loc locKey="account.signup"/>}
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


const connectedLoginPage = connect(mapStateToProps,mapDispatchToProps)(RegisterPage);
export { connectedLoginPage as RegisterPage };