import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'


class HomePage extends React.Component {


    render() {
        const { user, loggedIn } = this.props;
        return (
            <div>
                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center">
                    {loggedIn ? <Grid item><Typography variant="display1" color="primary">Hi {user.username}!</Typography></Grid> 
                    : <Grid item><Typography variant="display1" color="primary">Welcome travaler!</Typography></Grid>}
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user, loggedIn } = state.authentication;
    return {
        user, loggedIn
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };