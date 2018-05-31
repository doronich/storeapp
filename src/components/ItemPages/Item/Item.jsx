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

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


const styles = {
    card: {
        width: 300,
        margin: "0 15px 15px 15px"
    },
    media: {
        height: "350px",
        width:"auto"
        //paddingTop: '350px', // 16:9
        //paddingRight: '300px'
    },
};

class Item extends React.Component {


    state = {
        name: this.props.data.name,
        price: this.props.data.price,
        id: this.props.data.id,
        open: false
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    DeleteItem = () =>{
        this.props.handleDeleteItem(this.state.id,this.props.index);
        this.handleClose();
    }

    handleClick = () =>{
        console.log("click")
    }

    render() {
        const { name, price, id } = this.state;
        const { loggedIn } = this.props;
        return (
            <div>
                <Link to={"/item/"+id}>
                <Card style={styles.card} className="card"  >
                    <CardMedia
                        onClick={this.handleClick}
                        style={styles.media}
                        image={this.props.data.previewImagePath}
                        title="Image"
                    />

                    <CardContent
                        onClick={this.handleClick}
                    >
                        <Typography gutterBottom variant="title" >
                            {name}
                        </Typography>
                        <Typography gutterBottom variant="subheading">
                            {price} р.
                         </Typography>
                    </CardContent>
                    {
                        loggedIn &&
                        <CardActions>
                            <Link to={"/updateitem/" + id}>
                                <Button size="small" color="primary">
                                    Изменить
                                </Button>
                            </Link>
                            <Button size="small" color="primary" onClick={this.handleClickOpen}>
                                Удалить
                            </Button>
                        </CardActions>
                    }

                </Card>
                </Link>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Удалить предмет?"}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.DeleteItem} color="primary" variant="raised">
                            Удалить
                        </Button>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Отмена
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { loggedIn } = state.authentication;
    return {
        loggedIn
    };
}


const connectedItem = connect(mapStateToProps)(Item);
export { connectedItem as Item };