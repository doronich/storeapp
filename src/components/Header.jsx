import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { userConstants, itemConstants } from '../constants';

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography'
import Person from '@material-ui/icons/Person'


import { ListMenu } from './List'



const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch({ type: userConstants.LOGOUT }),
    logIn: () => dispatch({ type: userConstants.SUCCESS }),
    toMale: () => dispatch({ type: itemConstants.MALE }),
    toFemale: () => dispatch({ type: itemConstants.FEMALE })
})

function mapStateToProps(state) {
    const { loggedIn } = state.authentication;
    const { sex } = state.item;
    return {
        loggedIn, sex
    };
}


class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            left: false,
            choosedM: true,
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
        //console.log('header', this.props)
        const { loggedIn, sex } = this.props;

        const border = {
            borderBottom: "3px solid black"
        }

        const list = (
            <div style={{ width: "250px" }}>
                <ListMenu />
            </div>
        );
        return (
            <header className="navbar">
                <Grid className="nav" component="nav" container direction="row" justify="space-between" alignItems="center">
                    <Grid item className="nav_item not_mobile">
                        <IconButton onClick={this.toggleDrawer(true)} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                    <Grid item className="nav_item">
                        <Link className="link" to="/">
                            <Button fullWidth><Typography color="primary" variant="display1">Title</Typography></Button>
                        </Link>
                    </Grid>

                    <Grid item className="nav_item">
                        <Grid container>
                            <Grid item className="nav_item mobile900" >
                                <Link className="link" to="/items">
                                    <Button fullWidth >Все товары</Button>
                                </Link>
                            </Grid>
                            <Grid item className="nav_item mobile600" >

                                <Button fullWidth onClick={this.toFemaleChange} style={sex === "F" ? border:{}}>Женские</Button>

                            </Grid>
                            <Grid item className="nav_item mobile600" >

                                <Button fullWidth onClick={this.toMaleChange} style={sex === "M"? border:{}}>Мужские</Button>

                            </Grid>
                            <Grid item className="nav_item mobile900" >
                                <Link className="link" to="/contacts">
                                    <Button fullWidth >Контакты</Button>
                                </Link>
                            </Grid>
                            <Grid item className="nav_item mobile900" >
                                <Link className="link" to="/">
                                    <Button fullWidth >Доставка</Button>
                                </Link>
                            </Grid>
                        </Grid>

                    </Grid>
                    {
                        loggedIn ? (
                            <Grid item className="nav_item mobile900">
                                <Grid container direction="row" justify="center">
                                    <Grid item className="nav_item">
                                        <Link to="/profile" className="link">
                                            <Button><Person /></Button>
                                        </Link>
                                    </Grid>
                                    <Grid item className="nav_item">
                                        <Link to="/" className="link"><Button fullWidth onClick={this.logout}>Выйти</Button></Link>
                                    </Grid>
                                </Grid>
                            </Grid>
                        )
                            : (
                                <Grid item className="nav_item mobile900">
                                    <Grid container direction="row" justify="center">
                                        <Grid item className="nav_item">
                                            <Link className="link" to="/login">
                                                <Button fullWidth>Войти</Button>
                                            </Link>
                                        </Grid>
                                        <Grid item className="nav_item">
                                            <Link className="link" to="/register"><Button fullWidth>Регистрация</Button></Link>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            )
                    }

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