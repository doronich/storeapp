import React from 'react'
import { connect } from 'react-redux'
import { Loc } from 'redux-react-i18n';
import { Typography, Grid, Paper, Table, TableHead, TableCell, TableBody, TableRow, IconButton, TableFooter, TextField, Button } from '@material-ui/core'
import { RemoveShoppingCart } from '@material-ui/icons'
import { itemService,cartService } from '../../services'
import { Link } from 'react-router-dom'
import { cartAcitons } from '../../actions'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

const mapStateToProps = state => {
    const { items } = state.cart;
    const { currency } = state.item
    return {
        items, currency
    }
}

const mapDispatchToProps = dispatch => ({
    removeFromCart: id => dispatch(cartAcitons.removeItemFromCart(id))
})

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            name: "",
            phoneNumber: "",
            address: "",
            email: "",
            comment: "",
            complited:false,
            error:false,
        }

    }

    componentWillMount() {
        if (this.props.items.length !== 0) {
            itemService.getCartList(this.props.items)
                .catch(err => console.log(err))
                .then(response => {
                    if (response) {
                        console.log("resp:", response.data)
                        this.setState({ list: response.data })
                    }
                });
        }

    }

    changeAmount = (index, n) => (event) => {
        if (!(this.state.list[index].amount === 1 && n === -1)) {
            const list = this.state.list;
            list[index].amount += n;
            //list[index].amount = parseInt(event.target.value, 10);
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

    submitOrder = (event) => {
        event.preventDefault();
        const { name, phoneNumber, address, email, comment, } = this.state;
        const list = JSON.parse(JSON.stringify(this.state.list));
        list.forEach(item=>{
            item.itemId = item.id;
        })

        list.forEach(item=>{
            delete item.id;
        })
        const order = {
            name,
            phoneNumber,
            address,
            email,
            comment,
            totalPrice:this.totalValue,
            items:list.slice()
        }


        console.log("start order request")
        console.log(order)
        cartService.order(order)
            .catch(err => {
                console.log(err)
                this.setState({error:true})
            })
            .then(response => {
                if (response) {
                    if(response.status===200){
                        this.setState({complited:true})
                    }
                    console.log("Order response:", response)
                }
            })

    }

    totalValue = 0;

    render() {

        let table = null;
        const styles = {
            link: {
                fontWeight: 400,
                color: "black",
                fontSize: "16px",
                textDecoration: "underline"
            },
            total: {
                color: "black",
                fontSize: "18px"
            }
        }


        const valueMultiplier = this.props.currency === "rub" ? 1 : 0.5
        let rows;
        if (this.state.list) {
            rows = this.state.list.map((item, index) => {
                return (<TableRow hover key={index}>
                    <TableCell ><Link to={"/item/" + item.id} style={styles.link}>{item.name}</Link><IconButton onClick={this.removeItem(index, item.id)}><RemoveShoppingCart /></IconButton></TableCell>
                    <TableCell numeric>{item.price * valueMultiplier}</TableCell>
                    <TableCell ><div className="cartButton-container">
                        <div className="cartButton" onClick={this.changeAmount(index, -1)}>-</div>
                        <div className="cartButton-value">{item.amount}</div>
                        <div className="cartButton" onClick={this.changeAmount(index, +1)}>+</div>
                    </div></TableCell>
                </TableRow>)
            })

            let totalvalue = 0;
            for (let i = 0; i < this.state.list.length; i++) {
                totalvalue += this.state.list[i].price * this.state.list[i].amount;
            }

            this.totalValue = totalvalue;

            table = (
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><Loc locKey="shopcart.header.name" /></TableCell>
                                <TableCell numeric><Loc locKey="shopcart.header.price" /> <Loc locKey="currency" /></TableCell>
                                <TableCell><Loc locKey="shopcart.header.amount" /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {rows ? rows : <TableRow></TableRow>}
                        </TableBody>
                        <TableFooter>
                            <TableRow >
                                <TableCell style={styles.total}><Loc locKey="shopcart.footer.total" />:</TableCell>
                                <TableCell numeric style={styles.total}>{totalvalue * valueMultiplier} <Loc locKey="currency" /></TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Paper>
            )

        }

        const errorMessage=<Loc locKey="shopcart.error"/>
        const okMessage=<Loc locKey="shopcart.response"/>

        return (
            <div style={{ height: "inherit" }}>
                <Grid className="container" container direction="column" justify="flex-start" alignItems="center" style={{ height: "100%" }}>
                    <Grid item style={{}}>
                        <Typography variant="display1" gutterBottom><Loc locKey="titles.shopCart"></Loc></Typography>
                    </Grid>
                    {
                        (this.props.items.length === 0) ? <Grid item > <Typography><Loc locKey="shopcart.empty"></Loc></Typography></Grid>
                            : <Grid item style={{ width: "100%" }}>
                                {table}
                            </Grid>
                    }
                    {
                        this.props.items.length !== 0 &&
                        <Grid item style={{ marginTop: "30px", width: "100%", maxWidth: "600px" }}>
                            <Paper style={{ width: "100%", padding: "20px" }}>
                                <Typography variant="headline" align="center"><Loc locKey="shopcart.form.title" /></Typography>
                                <ValidatorForm onSubmit={this.submitOrder}>
                                    <TextValidator
                                        fullWidth
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.handleChange("name")}
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
                                        label={<Loc locKey="shopcart.form.phoneNumber" />}
                                    />
                                    <br />
                                    <TextValidator
                                        fullWidth
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.handleChange("email")}
                                        type="email"
                                        label="E-mail"
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

                                    <Button style={{ marginTop: "20px" }} type="submit" size="large" variant="raised" color="secondary"><Loc locKey="shopcart.form.confirm" /></Button>
                                </ValidatorForm>
                                {
                                    this.state.error && <Typography align="center" variant="caption" color="error">{errorMessage}</Typography>
                                }
                                {
                                    this.state.complited && <Typography align="center" variant="caption" style={{ color: "#84d175" }}>{okMessage}</Typography>
                                }
                            </Paper>

                        </Grid>
                    }

                </Grid>
            </div>
        )
    }

}

const connectedCart = connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
export { connectedCart as ShoppingCart }