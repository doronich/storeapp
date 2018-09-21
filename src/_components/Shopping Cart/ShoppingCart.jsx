import React from 'react'
import { connect } from 'react-redux'
import { Loc } from 'redux-react-i18n';
import { Typography, Grid, Table, TableHead, TableCell, TableBody, TableRow, IconButton, TableFooter, TextField, Button, Card } from '@material-ui/core'
import { RemoveShoppingCart } from '@material-ui/icons'
import { itemService, cartService, userService } from '../../services'
import { Link } from 'react-router-dom'
import { cartAcitons } from '../../actions'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import "./style.css"
const mapStateToProps = state => {
    const { items } = state.cart;
    const { currency } = state.item;
    const { loggedIn, currentUser } = state.authentication;
    return {
        items, currency, loggedIn, currentUser
    }
}

const mapDispatchToProps = dispatch => ({
    removeFromCart: id => dispatch(cartAcitons.removeItemFromCart(id)),
    clearCart: () => dispatch(cartAcitons.clearCart())
})

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
            list: [],
            firstname: "",
            phoneNumber: "",
            address: "",
            email: "",
            comment: "",
            complited: false,
            error: false,
            code: "",
            validCode: true
        }
    }

    componentDidMount() {

        if (this.props.loggedIn) {
            userService.getUser(this.props.currentUser.username)
                .then(resp => {
                    if (resp) {
                        this.setState({
                            id: resp.data.id,
                            phoneNumber: resp.data.phoneNumber ? resp.data.phoneNumber : "",
                            firstname: resp.data.firstName,
                            email: resp.data.email
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }

        if (this.props.items.length !== 0) {
            itemService.getCartList(this.props.items)
                .catch(err => console.log(err))
                .then(response => {
                    if (response) {

                        this.setState({ list: response.data })
                    }
                });
        }

    }

    changeAmount = (index, n) => (event) => {
        if (!(this.state.list[index].amount === 1 && n === -1)) {
            const list = this.state.list;
            list[index].amount += n;
            this.setState({ list })
        }
    }

    removeItem = (arrIndex, itemId) => event => {
        this.props.removeFromCart(itemId);
        const list = this.state.list;
        list.splice(list.indexOf(list[arrIndex]), 1)
        this.setState({ list })
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    }

    submitOrder = async event => {
        event.preventDefault();
        const { firstname, phoneNumber, address, email, comment, } = this.state;
        const list = JSON.parse(JSON.stringify(this.state.list));
        list.forEach(item => {
            item.itemId = item.id;
        })

        list.forEach(item => {
            delete item.id;
        })

        if (this.state.code) {
            let codeResult;

            await cartService.checkForCode(this.state.code)
                .catch(err => {
                    //console.log(err)
                    codeResult = false;
                })
                .then(resp => {
                    codeResult = resp.data;
                });

            if (!codeResult) {
                this.setState({ validCode: false })
                return;
            }
        }


        const order = {
            name: firstname,
            phoneNumber: phoneNumber === "" ? null : phoneNumber,
            address,
            email: email === "" ? null : email,
            comment,
            totalPrice: this.totalValue,
            items: list.slice(),
            userName: this.props.currentUser !== null
                ? this.props.currentUser.username
                : null,
            code: this.state.code.trim()
        }

        await cartService.order(order)
            .catch(err => {
                console.log(err)
                this.setState({ error: true })
            })
            .then(response => {
                if (response) {
                    if (response.status === 200) {
                        this.setState({ complited: true })
                        setTimeout(() => {
                            this.props.clearCart();
                            this.props.history.push('/profile')
                        }, 1000)

                    }

                }
            })

    }

    totalValue = 0;

    render() {

        document.title = "Shopping Cart"
        let table = null;

        const valueMultiplier = this.props.currency === "rub" ? 1 : 0.5
        let rows;
        if (this.state.list) {
            rows = this.state.list.map((item, index) => {
                return (<TableRow hover key={index}>
                    <TableCell padding="checkbox"><IconButton onClick={this.removeItem(index, item.id)}><RemoveShoppingCart /></IconButton></TableCell>
                    <TableCell><Link to={"/item/" + item.id} className="scart-link">{item.name}</Link></TableCell>
                    <TableCell numeric>{item.price * valueMultiplier}</TableCell>
                    <TableCell padding="dense">
                        <div className="cartButton-container">
                            <div className="cartButton" onClick={this.changeAmount(index, -1)}>-</div>
                            <div className="cartButton-value">{item.amount}</div>
                            <div className="cartButton" onClick={this.changeAmount(index, +1)}>+</div>
                        </div>
                    </TableCell>

                </TableRow>)
            })

            let totalvalue = 0;
            for (let i = 0; i < this.state.list.length; i++) {
                totalvalue += this.state.list[i].price * this.state.list[i].amount;
            }

            this.totalValue = totalvalue;

            table = (
                <Card raised square className="scart-container_padding">
                    <Table padding="none">
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox"></TableCell>
                                <TableCell><Loc locKey="shopcart.header.name" /></TableCell>
                                <TableCell numeric><Loc locKey="shopcart.header.price" /> <Loc locKey="currency" /></TableCell>
                                <TableCell padding="dense"><Loc locKey="shopcart.header.amount" /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{ overflowX: "scroll" }}>
                            {rows ? rows : <TableRow></TableRow>}
                        </TableBody>
                        <TableFooter>
                            <TableRow >
                                <TableCell padding="dense"><span className="scrat-totalcell"><Loc locKey="shopcart.footer.total" />:</span></TableCell>
                                <TableCell colSpan="2" numeric ><span className="scrat-totalcell">{totalvalue * valueMultiplier} <Loc locKey="currency" /></span></TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Card>
            )

        }

        const errorCode = <Loc locKey="shopcart.codeerror" />
        const errorMessage = <Loc locKey="shopcart.error" />
        const okMessage = <Loc locKey="shopcart.response" />

        return (
            <div className="scart-font">
                <Grid className="container" container direction="row" justify="flex-start">
                    <Grid item xs={12}>
                        <h1 className="scart-title"><Loc locKey="titles.shopCart"></Loc></h1>
                        <hr className="hr-animation hr_black" />
                    </Grid>

                    {
                        (this.props.items.length === 0) ? <Grid item xs={12}> <Typography align="center"><Loc locKey="shopcart.empty"></Loc></Typography></Grid>
                            : <Grid item md={7} xs={12}>
                                {table}
                            </Grid>
                    }
                    {
                        this.props.items.length !== 0 &&
                        <Grid item md={5} xs={12}>
                            <Card square raised style={{ padding: "20px" }}>
                                <Typography variant="headline" align="center"><Loc locKey="shopcart.form.title" /></Typography>
                                <ValidatorForm onSubmit={this.submitOrder}>
                                    {this.props.loggedIn && <TextField
                                        label={"username"}
                                        fullWidth
                                        type="text"
                                        value={this.props.currentUser.username}
                                        disabled
                                    />}
                                    <TextValidator
                                        fullWidth
                                        name="name"
                                        value={this.state.firstname}
                                        onChange={this.handleChange("firstname")}
                                        required
                                        type="text"
                                        label={<Loc locKey="shopcart.form.name" />}
                                    />
                                    <TextValidator
                                        fullWidth
                                        name="phone"
                                        value={this.state.phoneNumber}
                                        onChange={this.handleChange("phoneNumber")}
                                        required
                                        type="text"
                                        validators={['trim']}
                                        label={<Loc locKey="shopcart.form.phoneNumber" />}
                                    />
                                    <br />
                                    <TextValidator
                                        required
                                        fullWidth
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange("email")}
                                        type="email"
                                        label="E-mail"
                                        validators={['isEmail', 'trim']}
                                        disabled={this.props.loggedIn}
                                    />
                                    <br />
                                    <TextValidator
                                        fullWidth
                                        name="address"
                                        value={this.state.address}
                                        onChange={this.handleChange("address")}
                                        type="text"
                                        label={<Loc locKey="shopcart.form.address" />}
                                    />
                                    <TextField
                                        fullWidth
                                        multiline
                                        name="comment"
                                        value={this.state.comment}
                                        onChange={this.handleChange("comment")}
                                        type="text"
                                        label={<Loc locKey="shopcart.form.comment" />}
                                    />
                                    <TextField
                                        fullWidth
                                        name="code"
                                        value={this.state.code}
                                        onChange={this.handleChange("code")}
                                        type="text"
                                        label={<Loc locKey="shopcart.form.code" />}
                                    />

                                    <Button style={{ marginTop: "20px" }} type="submit" size="large" variant="raised" color="secondary"><Loc locKey="shopcart.form.confirm" /></Button>
                                </ValidatorForm>
                                {
                                    this.state.error && <Typography align="center" variant="caption" color="error">{errorMessage}</Typography>
                                }
                                {
                                    !this.state.validCode && <Typography align="center" variant="caption" color="error">{errorCode}</Typography>
                                }
                                {
                                    this.state.complited && <Typography align="center" variant="caption"><span className="scart-message_green">{okMessage}</span></Typography>
                                }
                            </Card>

                        </Grid>
                    }

                </Grid>
            </div>
        )
    }

}

const connectedCart = connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
export { connectedCart as ShoppingCart }