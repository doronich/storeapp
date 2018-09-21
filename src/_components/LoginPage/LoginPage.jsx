import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { userService } from '../../services'
import { userConstants } from '../../constants';

import Button from '@material-ui/core/Button';
import Circular from '../styles/Circular';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import { Loc } from 'redux-react-i18n'

import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

const mapStateToProps = (state) => {
    const { inProgress, reqError } = state.authentication;
    return {
        inProgress,
        reqError
    };
}
const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch({ type: userConstants.LOGOUT }),
    logIn: () => dispatch({ type: userConstants.LOGIN }),
    success: (user) => dispatch({ type: userConstants.SUCCESS, user }),
    error: () => dispatch({ type: userConstants.ERROR })
});

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.logOut();

        this.state = {
            username: '',
            password: '',
            reqError: false,
        }
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.logIn();
        const { username, password } = this.state;


        if (username && password) {
            userService.login(username, password)
                .then(
                    response => {
                        if (response && response["access_token"]) {
                            this.props.success(response)
                            this.props.history.push('/')
                        } else {

                            this.props.error();
                            this.setState({ reqError: true })
                        }

                    }
                )
        }
        this.setState({ password: '' });
    }

    render() {
        const { inProgress } = this.props;
        const { username, password, reqError } = this.state;
        return (
            <div>
                <Grid container
                    justify="center"
                >

                    <Grid item xs={8} sm={4} lg={3} xl={2}>
                        <ValidatorForm onSubmit={this.handleSubmit}>
                            <Grid
                                direction="column"
                                container
                            >
                                <Grid item>
                                    <Typography align="center" variant='display1' color="secondary"><Loc locKey="account.signinTitle" /></Typography>
                                    <Link to="/register"><Typography align="center" variant='caption'><Loc locKey="account.needReg" /></Typography></Link>
                                </Grid>
                                <Grid item >
                                    <TextValidator
                                        fullWidth
                                        required
                                        label={<Loc locKey="account.login" />}
                                        onChange={this.handleChange("username")}
                                        type="text"
                                        name="username"
                                        value={username}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid xs={12} item>
                                    <TextValidator
                                        required
                                        fullWidth
                                        label={<Loc locKey="account.pass" />}
                                        onChange={this.handleChange("password")}
                                        name="password"
                                        type="password"
                                        margin="normal"
                                        value={password}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    />
                                </Grid>
                                {
                                    inProgress ? <Grid item align="center"><Circular /></Grid> :
                                        <Button type="submit" xs={12} variant="raised" size="large" color="secondary">
                                            {<Loc locKey="account.signin" />}
                                        </Button>
                                }
                                {
                                    reqError && <Typography align="center" variant="caption" color="error"><Loc locKey="account.errsignin" /></Typography>
                                }
                            </Grid>
                        </ValidatorForm>
                    </Grid>
                </Grid>
            </div>
        );
    }
}



const connectedLoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPage);
export { connectedLoginPage as LoginPage };