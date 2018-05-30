import React from 'react';
import { connect } from 'react-redux';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import { Link } from 'react-router-dom';
import { userConstants } from '../../constants';

const mapStateToProps = state => {
    const { loggedIn } = state.authentication;
    return {
        loggedIn
    };
}

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch({ type: userConstants.LOGOUT })
})

class ListMenu extends React.Component {
    constructor(props) {
        super(props);
        //console.log('listmenu ', this.props);
        this.state = {
            openAcc: false,
            openClothing: false,
            openShoes: false,
            openAccessory: false
        };
    }

    logout = () => {
        this.props.logOut();
    }

    handleClick = open => () => {
        this.setState({ [open]: !this.state[open] });
    };

    render() {

        const { loggedIn } = this.props;

        return (
            <List
                component="nav"
            >
                <ListSubheader disableSticky>КАТЕГОРИИ</ListSubheader>
                <ListItem button onClick={this.handleClick('openShoes')}>
                    <ListItemText><Typography variant="button">Обувь</Typography></ListItemText>
                    {this.state.openShoes ? <ExpandLess /> : <ExpandMore />}

                </ListItem>

                <Collapse in={this.state.openShoes} timeout="auto" unmountOnExit>
                    <List component='div'>
                        <Divider />
                        <Link to="/">
                            <ListItem button>
                                <ListItemText primary="Кроссовки" />
                            </ListItem>
                        </Link>

                        <Divider />
                        <Link to="/">
                            <ListItem button>
                                <ListItemText primary="Кеды" />
                            </ListItem>
                        </Link>

                        <Divider />
                        <Link to="/">
                            <ListItem button>
                                <ListItemText primary="Туфли" />
                            </ListItem>
                        </Link>
                    </List>
                </Collapse>

                <Divider />

                <ListItem button onClick={this.handleClick('openClothing')}>
                    <ListItemText><Typography variant="button">Одежда</Typography></ListItemText>
                    {this.state.openClothing ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={this.state.openClothing} timeout="auto" unmountOnExit>

                    <List component='div'>
                        <div>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Верхняя одежда"></ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Брюки" />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Джинсы" />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Футболки и поло" />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Нижнее бельё" />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Толстовки" />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Шорты" />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Костюмы" />
                            </ListItem>
                        </div>
                    </List>
                </Collapse>

                <Divider />



                <ListItem button onClick={this.handleClick('openAccessory')}>
                    <ListItemText><Typography variant="button">Аксессуары</Typography></ListItemText>
                    {this.state.openAccessory ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={this.state.openAccessory} timeout="auto" unmountOnExit>

                    <List component='div'>
                        <div>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Очки"></ListItemText>
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Часы" />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Чехлы" />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Сумки" />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemText primary="Рюкзаки" />
                            </ListItem>

                        </div>
                    </List>
                </Collapse>

                <Divider />

                <ListItem button onClick={this.handleClick('openAcc')}>
                    <ListItemText><Typography variant="button">Профиль</Typography></ListItemText>

                    {this.state.openAcc ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={this.state.openAcc} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            !loggedIn ? <div>
                                <Divider />
                                <Link to='/login'>
                                    <ListItem button>
                                        <ListItemText primary="Войти" />
                                    </ListItem>
                                </Link>
                                <Divider />
                                <Link to='/register'>
                                    <ListItem button >
                                        <ListItemText primary="Регистрация" />
                                    </ListItem>
                                </Link>
                            </div> :
                                <div>
                                    <Divider />
                                    <Link to='/additem'>
                                        <ListItem button>
                                            <ListItemText primary="Добавить предмет"/>
                                        </ListItem>
                                    </Link>
                                    <Divider />
                                    <Link to='/allitems'>
                                        <ListItem button>
                                            <ListItemText primary="Все предметы"/>
                                        </ListItem>
                                    </Link>
                                    <Divider />
                                    <ListItem button onClick={this.logout}>
                                        <ListItemText primary="Выйти" />
                                    </ListItem>
                                </div>

                        }
                    </List>
                </Collapse>

                <Divider />
                <Link to='/contacts'>
                    <ListItem button>
                        <ListItemText><Typography variant="button">Контакты</Typography></ListItemText>
                    </ListItem>
                </Link>

            </List>
        );
    }
}

const connectedListMenu = connect(mapStateToProps, mapDispatchToProps)(ListMenu);
export { connectedListMenu as ListMenu };