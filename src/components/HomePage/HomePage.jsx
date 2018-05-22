import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

//import { userActions } from '../actions';

class HomePage extends React.Component{
    componentDidMount() {
        //this.props.dispatch(userActions.getAll());
    }

    render(){
        const { user } = this.props;
        return (
            <div style={{height:"1000px"}}>
                <Grid container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item><Typography variant="display1" color="primary">Hi {user.username}!</Typography></Grid>
                    <Grid item><Button variant="raised" color="primary"><Link className="link" to='/login'>Logout</Link></Button></Grid>
                </Grid>
            </div>
        );
    }
}

function mapStateToProps(state){
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };