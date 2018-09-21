import React from 'react'
import { Grid } from '@material-ui/core';
import Circular from '../styles/Circular'
import { Loc } from 'redux-react-i18n';
import { ProfileSection } from './Profile';
import { PasswordSection } from './Password';
import { OrdersSection } from './Orders';
import { connect } from 'react-redux';
import { userService } from '../../services';
import './style.css'

const mapStateToProps = (state, ownProps) => {
    return {
        username: state.authentication.currentUser.username
    };
}

class ProfilePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            lastName: "",
            firstName: "",
            email: "",
            phoneNumber: "",
            loaded: false
        }
    }

    componentWillMount() {
        userService.getUser(this.props.username)
            .catch(err => console.log(err))
            .then(async response => {
                if (response) {
                    await this.setState({ ...response.data, loaded: true })
                }
            })
    }

    render() {
        document.title = "Profile"
        return (
            <div className="container" >
                <Grid container direction="row" justify="flex-start">
                    <Grid item xs={12}>
                        <h1 className="profile-title account-font"><Loc locKey="titles.profile" /></h1>
                        <hr className="hr-animation hr_black" />
                    </Grid>
                    {
                        !this.state.loaded ?
                            <Grid item xs={12}>
                                <Grid container direction="row" justify="center">
                                    <Grid item>
                                        <Circular />
                                    </Grid>
                                </Grid>

                            </Grid>
                            : <Grid item xs={12}>
                                <Grid container direction="row" justify="center">
                                    <Grid item xs={12} sm={6}>
                                        <ProfileSection {...this.state} username={this.props.username} />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <PasswordSection id={this.state.id} {...this.props} />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <OrdersSection id={this.state.id} />
                                    </Grid>
                                </Grid>
                            </Grid>
                    }

                </Grid>
            </div>

        )
    }
}

const connectedProfilePage = connect(mapStateToProps)(ProfilePage);
export { connectedProfilePage as ProfilePage };