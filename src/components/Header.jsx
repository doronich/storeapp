import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import { userActions } from '../actions';

class Header extends React.Component {
    logout = () => {
        console.log('header', this.props)
        this.props.logOut();
    }

    render() {
        const { loggedIn } = this.props;
        return (
            <div className="navbar">
                <Grid className="nav" container direction="row" justify="space-between">
                    <Grid item>
                        <Link className="link" to="/">
                            <Button fullWidth>Home</Button>
                        </Link>
                    </Grid>
                    {
                        loggedIn ? (
                            <Grid item>
                                <Link to="/" className="link"><Button fullWidth onClick={this.logout}>Logout</Button></Link>
                            </Grid>)
                            : (
                                <Grid item>
                                    <Grid container  direction="row" justify="center">
                                        <Grid item>
                                            <Link className="link" to="/login">
                                                <Button fullWidth>Sign in</Button>
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link className="link" to="/register"><Button fullWidth>Sign up</Button></Link>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                    }
                </Grid>

            </div>
        );
    }

}

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(userActions.logout())
})

function mapStateToProps(state) {
    const { loggedIn } = state.authentication;
    return {
        loggedIn
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);