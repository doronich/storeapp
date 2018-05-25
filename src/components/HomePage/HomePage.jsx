import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

class HomePage extends React.Component {


    render() {
        const { currentUser, loggedIn } = this.props;
        console.log('home ',this.props)
        return (
            <div style={{overflow:"hidden"}}>
                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center">
                    {loggedIn ? <Grid item><Typography variant="display1" >Hi {currentUser.username}!</Typography></Grid> 
                    : <Grid item><Typography variant="display1" >Welcome travaler!</Typography></Grid>}
                    <Divider />
                    <Grid item><Typography variant="display4">Рекомендуем</Typography></Grid>
                    <Divider />
                    <Grid item><Typography variant="display4">Актуально</Typography></Grid>
                    <Divider />
                    <Grid item><Typography variant="display4">Еще что-то...</Typography></Grid>
                    <Grid item><Typography variant="display4">Еще что-то...</Typography></Grid>
                    <Grid item><Typography variant="display4">Еще что-то...</Typography></Grid>
                    <Grid item><Typography variant="display4">Еще что-то...</Typography></Grid>
                    <Grid item><Typography variant="display4">Еще что-то...</Typography></Grid>
                    <Grid item><Typography variant="display4">Еще что-то...</Typography></Grid>
                    <Grid item><Typography variant="display4">Еще что-то...</Typography></Grid>

                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { currentUser, loggedIn } = state.authentication;
    return {
        currentUser, loggedIn
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };