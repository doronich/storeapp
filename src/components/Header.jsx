import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { userConstants } from '../constants';

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch({ type: userConstants.LOGOUT })
})

function mapStateToProps(state) {
    const { loggedIn } = state.authentication;
    return {
        loggedIn
    };
}


class Header extends React.Component {
    constructor() {
        super()
        this.state = {
            left: false,
            choosedM:true
        };
    }
    logout = () => {
        console.log('header', this.props)
        this.props.logOut();
    }

/*     toggleSex = (sex)=>{
        if(sex==='man'){
            this.setState({
                choosedM:true
            })
        } else {
            this.setState({
                choosedM:false
            })
        }

    } */

    toggleDrawer = (open) => () => {
        this.setState({
            left: open,
        });
    };

    render() {
        console.log('header', this.props)
        const { loggedIn } = this.props;

        const list = (
            <div style={{ width: "250px" }}>
                <List disablePadding={true}
                    component='nav'>
                    <ListItem button>
                        <ListItemText inset primary="Sent mail" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText inset primary="Drafts" />
                    </ListItem>
                </List>
                <Divider />
                <List>

                </List>
            </div>
        );
        const border = {borderBottom:"2px solid black"};
        return (
            <div className="navbar">
                <Grid className="nav" container direction="row" justify="space-between" alignItems="center">
                    <Grid item className="nav_item">
                        <IconButton onClick={this.toggleDrawer(true)} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                    </Grid>

                    <Grid item className="nav_item">
                        <Grid container>
                            <Grid item className="nav_item">
                                <Link className="link" to="/">
                                    <Button fullWidth >Home</Button>
                                </Link>
                            </Grid>
{/*                             <Grid item className="nav_item" style={!this.state.choosedM ? border:{}}>
                                <Button fullWidth  onClick={this.toggleSex('wooman')}>WOMEN</Button>
                            </Grid>
                            <Grid item className="nav_item" style={this.state.choosedM ? border:{}} >
                                <Button fullWidth onClick={this.toggleSex('man')} >MAN</Button>
                            </Grid> */}
                        </Grid>

                    </Grid>
                    {
                        loggedIn ? (
                            <Grid item className="nav_item">
                                <Link to="/" className="link"><Button fullWidth onClick={this.logout}>Logout</Button></Link>
                            </Grid>)
                            : (
                                <Grid item className="nav_item">
                                    <Grid container direction="row" justify="center">
                                        <Grid item className="nav_item">
                                            <Link className="link" to="/login">
                                                <Button fullWidth>Sign in</Button>
                                            </Link>
                                        </Grid>
                                        <Grid item className="nav_item">
                                            <Link className="link" to="/register"><Button fullWidth>Sign up</Button></Link>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                    }

                    <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer(false)}
                            onKeyDown={this.toggleDrawer(false)}
                        >
                            {list}
                        </div>
                    </Drawer>
                </Grid>

            </div>
        );
    }

}



export default connect(mapStateToProps, mapDispatchToProps)(Header);