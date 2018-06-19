import React from 'react'
import { connect } from 'react-redux'
import { Loc } from 'redux-react-i18n';
import { Typography, Grid, Paper, Table, TableHead, TableCell, TableBody, TableRow, IconButton, Input, TableFooter } from '@material-ui/core'
import { RemoveShoppingCart } from '@material-ui/icons'
import { itemService } from '../../services'
import { Link } from 'react-router-dom'
import { cartAcitons } from '../../actions'

const mapStateToProps = state => {
    const { items } = state.cart;
    const { currency } = state.item
    return {
        items, currency
    }
}

const mapDispatchToProps = dispatch =>({
    removeFromCart: id => dispatch(cartAcitons.removeItemFromCart(id))
})

class ShoppingCart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: null
        }

    }

    componentWillMount() {
        if(this.props.items.length!==0){
            itemService.getCartList(this.props.items)
            .catch(err => console.log(err))
            .then(response => {
                if (response) {
                    this.setState({ list: response.data })
                }
            });
        }

    }

    changeAmount = (index) => (event) => {
        if (Number(event.target.value) !== 0) {
            const list = this.state.list;
            list[index].amount = parseInt(event.target.value,10);
            this.setState({ list })
        }
    }

    removeItem= (arrIndex,itemId)=> event=>{
        this.props.removeFromCart(itemId);
        const list = this.state.list;
        list.splice(list.indexOf(list[arrIndex]),1)
        this.setState({list})
    }

    render() {

        let table = null;
        const styles = {
            link: {
                fontWeight: 400,
                color: "black",
                fontSize: "16px",
                textDecoration: "underline"
            },
            total:{
                color:"black",
                fontSize:"18px"
            }
        }
        const valueMultiplier = this.props.currency === "rub" ? 1 : 0.5
        let rows;
        if (this.state.list) {
            rows = this.state.list.map((item, index) => {
                return (<TableRow hover key={index}>
                    <TableCell ><Link to={"/item/" + item.id} style={styles.link}>{item.name}</Link></TableCell>
                    <TableCell numeric>{item.price * valueMultiplier}</TableCell>
                    <TableCell><Input type="number" style={{ width: "45px" }} value={item.amount} onChange={this.changeAmount(index)} /></TableCell>
                    <TableCell><IconButton onClick={this.removeItem(index,item.id)}><RemoveShoppingCart/></IconButton></TableCell>
                </TableRow>)
            })

            let totalvalue = 0;
            for(let i = 0; i<this.state.list.length;i++){
                totalvalue += this.state.list[i].price * this.state.list[i].amount;
            }

            table = (
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><Loc locKey="shopcart.header.name" /></TableCell>
                                <TableCell numeric><Loc locKey="shopcart.header.price" /> <Loc locKey="currency" /></TableCell>
                                <TableCell><Loc locKey="shopcart.header.amount" /></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {rows ? rows : <TableRow></TableRow>}
                        </TableBody>
                        <TableFooter>
                            <TableRow >
                                <TableCell style={styles.total}><Loc locKey="shopcart.footer.total" />:</TableCell>
                                <TableCell numeric style={styles.total}>{totalvalue * valueMultiplier} <Loc locKey="currency"/></TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Paper>
            )
    
        }
 
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
                    <Grid item>
                        <Typography></Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

const connectedCart = connect(mapStateToProps,mapDispatchToProps)(ShoppingCart);
export { connectedCart as ShoppingCart }