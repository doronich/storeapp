import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { userConstants, itemConstants } from '../constants';

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Menu as MenuIcon, ShoppingCart } from '@material-ui/icons';
//import Badge from '@material-ui/core/Badge'
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography'
import Person from '@material-ui/icons/Person'

import { ListMenu } from './List'
import LanguageSwitcher from './LanguageSwitcher'

import { Loc } from 'redux-react-i18n'


const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch({ type: userConstants.LOGOUT }),
    logIn: () => dispatch({ type: userConstants.SUCCESS }),
    toMale: () => dispatch({ type: itemConstants.MALE }),
    toFemale: () => dispatch({ type: itemConstants.FEMALE })
})

function mapStateToProps(state) {
    const { loggedIn } = state.authentication;
    const { sex } = state.item;
    const { items } = state.cart
    return {
        loggedIn, sex, count:items.length
    };
}


class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            left: false,
        };
    }
    logout = () => {
        this.props.logOut();
    }

    toggleDrawer = (open) => () => {
        this.setState({
            left: open,
        });
    };

    componentWillMount() {
        window.addEventListener('storage', (event) => {
            if (!event.newValue) {
                this.props.logOut();
            }
        })
    }

    toMaleChange = () => {
        this.props.toMale();

    }
    toFemaleChange = () => {
        this.props.toFemale();
    }

    render() {
        const { loggedIn, sex } = this.props;

        const border = {
            borderBottom: "3px solid white"
        }

        const list = (
            <div style={{ width: "250px" }}>
                <ListMenu toggleDrawer={this.toggleDrawer()}/>
            </div>
        );
        return (
            <header className="navbar backcolor_secondary">
                <Grid className="nav" component="nav" container direction="row" justify="space-between" alignItems="center">
                    <Grid item className="nav_item">
                        <IconButton onClick={this.toggleDrawer(true)} color="primary" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                    </Grid>

                    <Grid item className="nav_item">
                        <Link className="link" to="/">
                            <Button fullWidth><Typography color="primary" variant="display1">Store</Typography></Button>
                        </Link>
                    </Grid>

                    <Grid item className="nav_item">
                        <Grid container>
                            <Grid item className="nav_item mobile900" >
                                <Link className="link" to="/items">
                                    <Button fullWidth color="primary"><Loc locKey="titles.products" /></Button>
                                </Link>
                            </Grid>
                            <Grid item className="nav_item mobile900" >

                                <Button fullWidth color="primary" onClick={this.toFemaleChange} style={sex === "F" ? border : {}}><Loc locKey="header.women" /></Button>

                            </Grid>
                            <Grid item className="nav_item mobile900" >

                                <Button fullWidth color="primary" onClick={this.toMaleChange} style={sex === "M" ? border : {}}><Loc locKey="header.men" /></Button>

                            </Grid>
  {/*                           <Grid item className="nav_item mobile900" >
                                <Link className="link" to="/contacts">
                                    <Button fullWidth color="primary" ><Loc locKey="header.contacts" /></Button>
                                </Link>
                            </Grid>
                            <Grid item className="nav_item mobile900" >
                                <Link className="link" to="/">
                                    <Button fullWidth color="primary" ><Loc locKey="header.delivery" /></Button>
                                </Link>
                            </Grid>
                            <Grid item className="nav_item mobile900" >
                                <Link className="link" to="/">
                                    <Button fullWidth color="primary" ><Loc locKey="header.about" /></Button>
                                </Link>
                            </Grid> */}
                        </Grid>

                    </Grid>
                    <Grid item className="nav_item">
                        <Grid container>
                            {
                                loggedIn ? (
                                    <Grid item className="nav_item">
                                        <Grid container direction="row" justify="center">
{/*                                             <Grid item className="nav_item mobile900">
                                                <Link to="/profile" className="link">
                                                    <Button color="primary"><Person /></Button>
                                                </Link>
                                            </Grid> */}
                                            <Grid item className="nav_item mobile900">
                                                <Link to="/" className="link"><Button color="primary" fullWidth onClick={this.logout}><Loc locKey="account.logout" /></Button></Link>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )
                                    : (
                                        <Grid item className="nav_item">
                                            <Grid container direction="row" justify="center">
                                                <Grid item className="nav_item mobile900">
                                                    <Link className="link" to="/login">
                                                        <Button fullWidth color="primary"><Loc locKey="account.signin" /></Button>
                                                    </Link>
                                                </Grid>
                                                <Grid item className="nav_item mobile900">
                                                    <Link className="link" to="/register"><Button fullWidth color="primary"><Loc locKey="account.signup" /></Button></Link>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )
                            }
                            <Grid item>
                                <Link to="/cart" className="link">
                                    
                                        <IconButton color="primary"><ShoppingCart color="primary" />{this.props.count!==0&&this.props.count}</IconButton>
                                    
                                </Link>
                            </Grid>
                            
                            <Grid item>
                                <LanguageSwitcher />
                            </Grid>
                        </Grid>
                    </Grid>


                    <Drawer open={this.state.left} onClose={this.toggleDrawer(false)}>
                        <div
                            tabIndex={0}
                            role="button"
                            //onClick={this.toggleDrawer(false)}
                            onKeyDown={this.toggleDrawer(false)}
                        >
                            {list}
                        </div>
                    </Drawer>
                </Grid>

            </header>
        );
    }

}



export default connect(mapStateToProps, mapDispatchToProps)(Header);