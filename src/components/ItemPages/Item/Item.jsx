import React from 'react'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton'
import { AddShoppingCart } from '@material-ui/icons'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loc } from 'redux-react-i18n';
import { cartAcitons } from '../../../actions'


const styles = {
    card: {
        width: 300,
        margin: "0 15px 15px 15px",
        borderRadius: "5px",
        backgroundColor: "#fff"
    },
    media: {
        height: "300px",
        width: "auto"
        //paddingTop: '350px', // 16:9
        //paddingRight: '300px'
    },
};

class Item extends React.Component {


    state = {
        name: this.props.data.name,
        price: this.props.data.price,
        id: this.props.data.id,
        open: false,
        active: this.props.data.active,
        added: false
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    DeleteItem = () => {
        this.props.handleDeleteItem(this.state.id, this.props.index);
        this.handleClose();
    }

    addToCart = () => {
        if (!this.state.added) this.props.addToCart(this.state.id)

        this.setState({ added: true })
    }


    render() {
        const { name, price, id, active } = this.state;
        const { currentUser } = this.props;

        let valueMultiplier;
        if (this.props.currency === 'rub') {
            valueMultiplier = 1;
        } else {
            valueMultiplier = 0.5;
        }

        return (
            <div>

                <Card style={styles.card} className="card"  >
                    <Link to={"/item/" + id}>
                        <CardMedia
                            style={styles.media}
                            image={this.props.data.previewImagePath}
                            title={this.props.data.name}
                        />
                    </Link>
                    <Link to={"/item/" + id}>
                        <CardContent
                            style={{ paddingBottom: "0" }}
                        >
                            <Typography gutterBottom variant="title" >
                                {name}
                            </Typography>
                            <Typography gutterBottom variant="subheading">
                                {price * valueMultiplier}<Loc locKey="currency" />
                            </Typography>
                            {
                                !active &&
                                <Typography gutterBottom variant="caption" color="error">
                                    <Loc locKey="item.notAv" />
                                </Typography>
                            }

                        </CardContent>
                    </Link>
                    <CardActions>
                        <div>
                            <IconButton onClick={this.addToCart}>
                                <AddShoppingCart />
                            </IconButton>
                        </div>
                        {
                            currentUser ? currentUser.role === "Admin" &&
                                <div>                                <Link to={"/updateitem/" + id}>
                                    <Button size="small" color="secondary">
                                        <Loc locKey="item.change" />
                                    </Button>
                                </Link>
                                    <Button size="small" color="secondary" onClick={this.handleClickOpen}>
                                        <Loc locKey="item.remove" />
                                    </Button>
                                </div>

                                : null
                        }

                    </CardActions>
                </Card>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Удалить предмет?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.DeleteItem} color="secondary" variant="raised">
                            <Loc locKey="item.remove" />
                        </Button>
                        <Button onClick={this.handleClose} color="secondary" autoFocus>
                            <Loc locKey="item.cancel" />
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.authentication;
    const { currency } = state.item
    return {
        currentUser,
        currency
    };
}

const mapDispatchToProps = dispatch => ({
    addToCart: id => dispatch(cartAcitons.addItemToCart(id))
})


const connectedItem = connect(mapStateToProps, mapDispatchToProps)(Item);
export { connectedItem as Item };