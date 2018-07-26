import React from 'react';
import { connect } from 'react-redux';
import {Grid, Hidden} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import {Last,Carousel} from './sections'
import { Loc } from 'redux-react-i18n';

class HomePage extends React.Component {


    render() {
        //const { currentUser, loggedIn } = this.props;
        document.title = "Store"
        
        return (
            <div style={{overflow:"hidden"}}>
                <Grid container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    style={{height:"100%"}}>

                    <Grid item  style={{backgroundColor:"#343434", width:"100%"}}>
                        <Typography align="center" color="primary" variant="display1" style={{margin:"15px 0 0 0 "}}><Loc locKey="titles.latest"/></Typography>
                        <Last/>
                    </Grid>
                    <Grid item style={{width:"100%"}}>
                        <Hidden only="xs"><div className="container" style={{padding:"80px 0"}}>
                            <Carousel/>
                        </div>
                        </Hidden>
                    </Grid>
                    {/* <Grid item style={{width:"100%",backgroundColor:"#777"}}><Typography align="center" variant="display4">Еще что-то...</Typography></Grid>
                    <Grid item style={{width:"100%",backgroundColor:"#FFF"}}><Typography align="center" variant="display4">Еще что-то...</Typography></Grid> */}
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