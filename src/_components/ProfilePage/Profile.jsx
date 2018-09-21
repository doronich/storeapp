import React from 'react'
import { Grid, Card, CardContent, CardActions } from '@material-ui/core';
import { Loc } from 'redux-react-i18n';
import { userService } from '../../services';


export class ProfileSection extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lname: this.props.lastName || "",
            fname: this.props.firstName || "",
            tel: this.props.phoneNumber || "",
            showOkMessage: false,
            showErrMessage: false,
            changed: false,
        }
    }

    okMessage = <Loc locKey="account.okdata" />
    errMessage = <Loc locKey="account.errdata" />

    handleChange = name => event => {
        this.setState({ [name]: event.target.value, changed: true });
    }

    changeProfileData = (event) => {
        event.preventDefault();
        this.setState({
            showOkMessage: false,
            showErrMessage: false
        })

        if (!this.state.changed) return;

        userService.changeUserInfo({
            FirstName: this.state.fname,
            LastName: this.state.lname,
            PhoneNumber: this.state.tel,
            Id: this.props.id,
            UpdatedBy: this.props.username
        })
            .then(resp => {
                if (resp) {
                    if (resp.status === 200) {
                        this.setState({ showOkMessage: true, changed: false })
                    }
                    if (resp.response) {
                        this.setState({ showErrMessage: true, changed: false })
                    }
                }
            })
    }

    render() {
        return (
            <div>
                <Card square raised className="account-font card_size">
                    <form>
                        <Grid container direction="column" justify="space-between" className="card_size">
                            <Grid item>
                                <CardContent>
                                    <h3 className="profile-title_min"><Loc locKey="account.info.title" /></h3>
                                    <Grid container direction="column">
                                        <Grid item className="account-row">
                                            <span className="account-label"><Loc locKey="account.info.email" />: </span>
                                            <span className="account-label_value">{this.props.email}</span>
                                        </Grid>
                                        <Grid item className="account-row">
                                            <span className="account-label"><Loc locKey="account.info.login" />: </span>
                                            <span className="account-label_value">{this.props.username}</span>
                                        </Grid>
                                        <Grid item className="account-row">
                                            <span className="account-label"><Loc locKey="account.info.fname" />: </span>
                                            <span className="account-label_value"><input className="account-input" type="text" name="fname" maxLength={25} value={this.state.fname} onChange={this.handleChange("fname")} /></span>
                                        </Grid>
                                        <Grid item className="account-row">
                                            <span className="account-label"><Loc locKey="account.info.lname" />: </span>
                                            <span className="account-label_value"><input className="account-input" type="text" maxLength={25} value={this.state.lname} onChange={this.handleChange("lname")} /></span>
                                        </Grid>
                                        <Grid item className="account-row">
                                            <span className="account-label"><Loc locKey="account.info.tel" />: </span>
                                            <span className="account-label_value"><input type="text" maxLength={25} className="account-input" value={this.state.tel} onChange={this.handleChange("tel")} /></span>
                                        </Grid>
                                    </Grid>
                                </CardContent></Grid>
                            <Grid item>
                                <CardActions>
                                    <div className="account-button-row">
                                        <button className="profile-button_primary profile-button_big" onClick={this.changeProfileData}><Loc locKey="account.info.change" /></button>
                                    </div>

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

                    </form>
                </Card>
            </div>
        )
    }
}