import React from 'react'
import { Grid, Card, CardContent, CardActions } from '@material-ui/core';
import { Loc } from 'redux-react-i18n';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { userService } from '../../services';

export class PasswordSection extends React.Component {

    state = {
        currentpassword: "",
        newpassword: "",
        confPassword: "",
        showOkMessage: false,
        showErrMessage: false
    }


    okMessage = <Loc locKey="account.okpass" />
    errMessage = <Loc locKey="account.errpass" />

    componentWillMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.newpassword) {
                return false;
            }
            return true;
        });
    }


    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            showOkMessage: false,
            showErrMessage: false
        })

        if (this.props.id !== 0) {
            userService.changePassword({
                id: this.props.id,
                currentpassword: this.state.currentpassword,
                newpassword: this.state.newpassword
            })
                .catch(err => {
                    this.setState({ showErrMessage: true })
                })
                .then(resp => {
                    if (resp) {
                        if (resp.status === 200) {
                            this.setState({ showOkMessage: true })
                        }
                    }
                })
            this.setState({
                currentpassword: "",
                newpassword: "",
                confPassword: ""
            })
        } else {
            this.props.history.push("/login")
        }
    }

    render() {
        return (
            <div>
                <ValidatorForm onSubmit={this.handleSubmit}>
                    <Card square raised className="account-font card_size">
                        <Grid container className="card_size" direction="column" justify="space-between">
                            <Grid item><CardContent>
                                <h3 className="profile-title_min"><Loc locKey="account.pass" /></h3>
                                <Grid container direction="column">
                                    <Grid item lg={8} sm={12}>
                                        <TextValidator
                                            className="account-font"
                                            required
                                            fullWidth
                                            label={<Loc locKey="account.curpass" />}
                                            onChange={this.handleChange("currentpassword")}
                                            name="currentpassword"
                                            type="password"
                                            margin="dense"
                                            value={this.state.currentpassword}
                                        />
                                    </Grid>
                                    <Grid item lg={8} sm={12}>
                                        <TextValidator
                                            required
                                            fullWidth
                                            label={<Loc locKey="account.newpass" />}
                                            onChange={this.handleChange("newpassword")}
                                            name="newpassword"
                                            type="password"
                                            margin="dense"
                                            value={this.state.newpassword}
                                            validators={['matchRegexp:(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}']}
                                            errorMessages={[<Loc locKey="account.passreq" />]}
                                        />

                                    </Grid>
                                    <Grid item lg={8} sm={12}>
                                        <TextValidator
                                            required
                                            fullWidth
                                            label={<Loc locKey="account.confpass" />}
                                            onChange={this.handleChange("confPassword")}
                                            name="confPassword"
                                            type="password"
                                            validators={['isPasswordMatch']}
                                            errorMessages={[<Loc locKey="account.passmism" />]}
                                            value={this.state.confPassword}
                                            margin="dense"
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent></Grid>
                            <Grid item>
                                <CardActions>
                                    <button className="profile-button_big profile-button_primary" type="submit"><Loc locKey="account.changepass" /></button>
                                    <button className="profile-button_big profile-button_secondary" type="button"><Loc locKey="account.resetpass" /></button>
                                </CardActions>
                                <div className="card-message">
                                    {
                                        this.state.showOkMessage && <span className="card-message_ok">{this.okMessage}</span>
                                    }
                                    {
                                        this.state.showErrMessage && <span className="card-message_error">{this.errMessage}</span>
                                    }
                                </div>
                            </Grid>
                        </Grid>
                    </Card>
                </ValidatorForm>
            </div >
        )
    }
}