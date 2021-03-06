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
import { FavoriteBorder, Favorite } from '@material-ui/icons'
import { AddShoppingCart } from '@material-ui/icons'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Loc } from 'redux-react-i18n';
import { cartAcitons, favsAction } from '../../../actions'



const styles = {
    card: {
        width: 200,
        height: "auto",
        margin: "0 16px 20px",
        borderRadius: "0px",
        border: "1px solid #dddddd",
        backgroundColor: "#fff",
        cursor: "default",
        //boxShadow:"none",
    },
    media: {
        height: "200px",
        width: "auto"
    },
    actions: {
        padding: "0",
        cursor: "default",
        borderTop: "2px solid #ccc"
    },
    content: {
        padding: "10px 10px 0px 10px"
    }
};

class Item extends React.Component {


    state = {
        name: this.props.data.name,
        price: this.props.data.price,
        id: this.props.data.id,
        open: false,
        active: this.props.data.active,
        added: false,
        isFavorite: this.props.data.isFavorite
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

    addToFav = () => {
        const userId = this.props.currentUser.id, itemId = this.state.id;
        this.props.addFav(userId, itemId)
    }

    deleteFav = () => {
        const userId = this.props.currentUser.id, itemId = this.state.id;
        this.props.deleteFav(userId, itemId)
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
            <div className="card" >

                <Card style={styles.card} >
                    <Link to={"/item/" + id}>
                        <CardMedia
                            style={styles.media}
                            image={this.props.data.previewImagePath}
                            title={this.props.data.name}
                        />
                    </Link>
                    <Link to={"/item/" + id}>
                        <CardContent
                            style={styles.content}
                        >
                            <Typography gutterBottom variant="title" style={{ fontSize: "12px" }}>
                                {name}
                            </Typography>
                            <Typography gutterBottom variant="subheading" style={{ fontSize: "16px" }}>
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
                    <CardActions style={styles.actions}>
                        {
                            active && <div>
                                <IconButton onClick={this.addToCart}>
                                    <AddShoppingCart />
                                </IconButton>


                            </div>
                        }
                        {
                            currentUser &&
                            <div>
                                {
                                    this.state.isFavorite ?
                                        <IconButton onClick={this.deleteFav}>
                                            <Favorite color="error" />
                                        </IconButton>
                                        : <IconButton onClick={this.addToFav}>
                                            <FavoriteBorder />
                                        </IconButton>
                                }
                            </div>

                        }
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
    addToCart: id => dispatch(cartAcitons.addItemToCart(id)),
    addFav: (userId, itemId) => dispatch(favsAction.addFav(userId, itemId)),
    deleteFav: (userId, itemId) => dispatch(favsAction.deleteFav(userId, itemId))
})


const connectedItem = connect(mapStateToProps, mapDispatchToProps)(Item);
export { connectedItem as Item };