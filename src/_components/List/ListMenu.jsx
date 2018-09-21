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
import { itemConstants, subkindsClothing, subkindsFootwear, subkindsAccessories } from '../../constants';
import { Loc } from 'redux-react-i18n'

const mapStateToProps = state => {
    const { loggedIn, currentUser } = state.authentication;
    const { sex } = state.item;
    return {
        loggedIn, sex, currentUser
    };
}

const mapDispatchToProps = dispatch => ({
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

    handleClick = open => () => {
        this.setState({ [open]: !this.state[open] });
    };

    toMaleChange = () => {
        this.props.toMale();

    }
    toFemaleChange = () => {
        this.props.toFemale();
    }


    changeSubkindClothing = (n) => (event) => {
        this.props.toggleDrawer(false)
        this.props.changeKind(2)
        this.props.changeSubkind(n)
    }
    changeSubkindFootwear = (n) => (event) => {
        this.props.toggleDrawer(false)
        this.props.changeKind(1)
        this.props.changeSubkind(n)
    }
    changeSubkindAccessories = (n) => (event) => {
        this.props.toggleDrawer(false)
        this.props.changeKind(3)
        this.props.changeSubkind(n)
    }

    toggleDrawer = () => {
        this.props.toggleDrawer(false)
    }

    render() {

        const { loggedIn, sex, currentUser } = this.props;
        const border = {
            border: "2px solid black"
        }
        const tsubkindClothing = subkindsClothing.map((item, index) => {
            if (index === 0) return null;
            return <div key={index}>
                <Divider />
                <Link to={`/items`}>
                    <ListItem button onClick={this.changeSubkindClothing(item.value)}>
                        <ListItemText primary={<Loc locKey={item.name} />} />
                    </ListItem>
                </Link>
            </div>
        })

        const tsubkindFootwear = subkindsFootwear.map((item, index) => {
            if (index === 0) return null;
            return <div key={index}>
                <Divider />
                <Link to={`/items`}>
                    <ListItem button onClick={this.changeSubkindFootwear(item.value)}>
                        <ListItemText primary={<Loc locKey={item.name} />} />
                    </ListItem>
                </Link>
            </div>
        })

        const tsubkindAccessories = subkindsAccessories.map((item, index) => {
            if (index === 0) return null;
            return <div key={index}>
                <Divider />
                <Link to={`/items`}>
                    <ListItem button onClick={this.changeSubkindAccessories(item.value)}>
                        <ListItemText primary={<Loc locKey={item.name} />} />
                    </ListItem>
                </Link>
            </div>
        })

        return (

            <List
                component="nav"
            >

                <Button fullWidth onClick={this.toFemaleChange} style={sex === "F" ? border : {}}><Loc locKey="header.women" /></Button>
                <Button fullWidth onClick={this.toMaleChange} style={sex === "M" ? border : {}}><Loc locKey="header.men" /></Button>
                <ListSubheader disableSticky><Loc locKey="aside.categories" /></ListSubheader>
                <Link to='/items' onClick={this.toggleDrawer}>
                    <ListItem button>
                        <ListItemText ><Typography variant="button"><Loc locKey="aside.products" /></Typography></ListItemText>
                    </ListItem>
                </Link>
                <Divider />
                <ListItem button onClick={this.handleClick('openShoes')}>
                    <ListItemText><Typography variant="button"><Loc locKey="aside.footwear" /></Typography></ListItemText>
                    {this.state.openShoes ? <ExpandLess /> : <ExpandMore />}

                </ListItem>

                <Collapse in={this.state.openShoes} timeout="auto" unmountOnExit>
                    <List component='div'>
                        {tsubkindFootwear}
                    </List>
                </Collapse>

                <Divider />

                <ListItem button onClick={this.handleClick('openClothing')}>
                    <ListItemText><Typography variant="button"><Loc locKey="aside.clothing" /></Typography></ListItemText>
                    {this.state.openClothing ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={this.state.openClothing} timeout="auto" unmountOnExit>

                    <List component='div'>
                        {tsubkindClothing}
                    </List>
                </Collapse>

                <Divider />



                <ListItem button onClick={this.handleClick('openAccessory')}>
                    <ListItemText><Typography variant="button"><Loc locKey="aside.accessories" /></Typography></ListItemText>
                    {this.state.openAccessory ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={this.state.openAccessory} timeout="auto" unmountOnExit>

                    <List component='div'>
                        {tsubkindAccessories}
                    </List>
                </Collapse>

                <Divider />
                <ListSubheader disableSticky><Loc locKey="aside.other" /></ListSubheader>
                <ListItem button onClick={this.handleClick('openAcc')}>
                    <ListItemText><Typography variant="button"><Loc locKey="aside.account.name" /></Typography></ListItemText>

                    {this.state.openAcc ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse in={this.state.openAcc} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {
                            !loggedIn ? <div>
                                <Divider />
                                <Link to='/login' onClick={this.toggleDrawer}>
                                    <ListItem button>
                                        <ListItemText primary={<Loc locKey="account.signin" />} />
                                    </ListItem>
                                </Link>
                                <Divider />
                                <Link to='/register' onClick={this.toggleDrawer}>
                                    <ListItem button >
                                        <ListItemText primary={<Loc locKey="account.signup" />} />
                                    </ListItem>
                                </Link>
                            </div> :
                                <div>

                                    {
                                        currentUser.role === "Admin" &&
                                        <div>
                                            <Divider />
                                            <Link to='/additem' onClick={this.toggleDrawer}>
                                                <ListItem button>
                                                    <ListItemText primary={<Loc locKey="aside.account.additem" />} />
                                                </ListItem>
                                            </Link>
                                            <Divider />
                                            <Link to='/orders' onClick={this.toggleDrawer}>
                                                <ListItem button>
                                                    <ListItemText primary={<Loc locKey="aside.account.orders" />} />
                                                </ListItem>
                                            </Link>
                                            <Divider />
                                            <Link to='/allitems' onClick={this.toggleDrawer}>
                                                <ListItem button>
                                                    <ListItemText primary={<Loc locKey="aside.account.allitems" />} />
                                                </ListItem>
                                            </Link>
                                        </div>
                                    }


                                    <Divider />
                                    <Link to='/profile' onClick={this.toggleDrawer}>
                                        <ListItem button>
                                            <ListItemText><Loc locKey="aside.account.profile" /></ListItemText>
                                        </ListItem>
                                    </Link>
                                    <Divider />
                                    <Link to={"/login"} onClick={this.toggleDrawer}>
                                        <ListItem button>
                                            <ListItemText primary={<Loc locKey="account.logout" />} />
                                        </ListItem>
                                    </Link>
                                    <Divider />
                                    <Link to={"/favorites"} onClick={this.toggleDrawer}>
                                        <ListItem button>
                                            <ListItemText primary={<Loc locKey="aside.account.favs" />} />
                                        </ListItem>
                                    </Link>
                                </div>

                        }
                    </List>
                </Collapse>

                <Divider />
                <Link to='/contacts' onClick={this.toggleDrawer}>
                    <ListItem button>
                        <ListItemText><Typography variant="button"><Loc locKey="header.contacts" /></Typography></ListItemText>
                    </ListItem>
                </Link>
                <Divider />
                <Link to='/about' onClick={this.toggleDrawer}>
                    <ListItem button>
                        <ListItemText><Typography variant="button"><Loc locKey="header.about" /></Typography></ListItemText>
                    </ListItem>
                </Link>
                <Divider />
                <Link to='/delivery' onClick={this.toggleDrawer}>
                    <ListItem button>
                        <ListItemText><Typography variant="button"><Loc locKey="header.delivery" /></Typography></ListItemText>
                    </ListItem>
                </Link>

            </List>
        );
    }
}

const connectedListMenu = connect(mapStateToProps, mapDispatchToProps)(ListMenu);
export { connectedListMenu as ListMenu };