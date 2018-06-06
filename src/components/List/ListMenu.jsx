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
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { userConstants, itemConstants } from '../../constants';

const mapStateToProps = state => {
    const { loggedIn, currentUser } = state.authentication;
    const { sex } = state.item;
    return {
        loggedIn, sex, currentUser
    };
}

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch({ type: userConstants.LOGOUT }),
    toMale: () => dispatch({ type: itemConstants.MALE }),
    toFemale: () => dispatch({ type: itemConstants.FEMALE }),
    changeKind: (kind) => dispatch({ type: itemConstants.KIND, kind }),
    changeSubkind: (subkind) => dispatch({ type: itemConstants.SUBKIND, subkind })
})

class ListMenu extends React.Component {
    constructor(props) {
        super(props);

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

    toMaleChange = () => {
        this.props.toMale();

    }
    toFemaleChange = () => {
        this.props.toFemale();
    }

    changeKind = (n) => (event) => {
        this.props.changeKind(n)
    }


    changeSubkind = (n) => (event) => {
        this.props.changeSubkind(n)
    }


    render() {

        const { loggedIn, sex, currentUser } = this.props;
        const border = {
            border: "2px solid black"
        }

        return (
            <List
                component="nav"
            >
                <ListSubheader disableSticky>КАТЕГОРИИ</ListSubheader>
                <Button fullWidth onClick={this.toFemaleChange} style={sex === "F" ? border : {}}>Девушкам</Button>
                <Button fullWidth onClick={this.toMaleChange} style={sex === "M" ? border : {}}>Парням</Button>

                <Link to='/items'>
                    <ListItem button>
                        <ListItemText><Typography variant="button">товары</Typography></ListItemText>
                    </ListItem>
                </Link>
                <Divider />
                <ListItem button onClick={this.handleClick('openShoes')}>
                    <ListItemText><Typography variant="button">Обувь</Typography></ListItemText>
                    {this.state.openShoes ? <ExpandLess /> : <ExpandMore />}

                </ListItem>

                <Collapse in={this.state.openShoes} timeout="auto" unmountOnExit>
                    <List component='div' onClick={this.changeKind(1)}>
                        <Divider />
                        <Link to={`/${sex}/items/1/кроссовки`}>
                            <ListItem button>
                                <ListItemText primary="Кроссовки" />
                            </ListItem>
                        </Link>

                        <Divider />
                        <Link to={`/${sex}/items/1/кеды`}>
                            <ListItem button>
                                <ListItemText primary="Кеды" />
                            </ListItem>
                        </Link>

                        <Divider />
                        <Link to={`/${sex}/items/1/туфли`}>
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

                    <List component='div' onClick={this.changeKind(2)}>
                        <Divider />
                        <Link to={`/${sex}/items/2/верхняя одежда`}>
                            <ListItem button>
                                <ListItemText primary="Верхняя одежда"></ListItemText>
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link to={`/${sex}/items/2/свитшоты`}>
                            <ListItem button>
                                <ListItemText primary="Свитшоты"></ListItemText>
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link to={`/${sex}/items/2/брюки`}>
                            <ListItem button>
                                <ListItemText primary="Брюки" />
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link to={`/${sex}/items/2/джинсы`}>
                            <ListItem button>
                                <ListItemText primary="Джинсы" />
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link to={`/${sex}/items/2/футболки и поло`}>
                            <ListItem button>
                                <ListItemText primary="Футболки и поло" />
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link to={`/${sex}/items/2/нижнее бельё`}>
                            <ListItem button>
                                <ListItemText primary="Нижнее бельё" />
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link to={`/${sex}/items/2/толстовки`}>
                            <ListItem button>
                                <ListItemText primary="Толстовки" />
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link to={`/${sex}/items/2/шорты`}>
                            <ListItem button>
                                <ListItemText primary="Шорты" />
                            </ListItem>
                        </Link>
                        <Divider />
                        <Link to={`/${sex}/items/2/костюмы`}>
                            <ListItem button>
                                <ListItemText primary="Костюмы" />
                            </ListItem>
                        </Link>
                    </List>
                </Collapse>

                <Divider />



                <ListItem button onClick={this.handleClick('openAccessory')}>
                    <ListItemText><Typography variant="button">Аксессуары</Typography></ListItemText>
                    {this.state.openAccessory ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={this.state.openAccessory} timeout="auto" unmountOnExit>

                    <List component='div' onClick={this.changeKind(3)}>
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

                                    {
                                        currentUser.role==="Admin"&&
                                        <div>
                                            <Divider />
                                            <Link to='/additem'>
                                                <ListItem button>
                                                    <ListItemText primary="Добавить предмет" />
                                                </ListItem>
                                            </Link>
                                        </div>
                                    }

                                    <Divider />
                                    <Link to='/allitems'>
                                        <ListItem button>
                                            <ListItemText primary="Все предметы" />
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