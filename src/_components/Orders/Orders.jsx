import React from 'react'
import { Loc } from 'redux-react-i18n';
import { Grid, Typography, IconButton, Dialog, DialogActions, DialogTitle, Button, DialogContent, TextField } from '@material-ui/core';
import OrderItem from './OrderItem'
import { Edit, RemoveCircle } from "@material-ui/icons";

import ReactTable from 'react-table'
import "react-table/react-table.css";

class OrdersPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            removeOpen: false,
            updateOpen: false,
        }
    }
    columns = [
        {
            Header: "Actions",//<Loc locKey="orders.table.username" />,
            accessor: "id",
            Cell: row => (
                <div>
                    <IconButton style={{ height: "28px", width: "28px" }} onClick={this.handleUpdateOpen({ index: row.index, id: row.value })}>
                        <Edit style={{ fontSize: "18px" }} />
                    </IconButton>
                    <IconButton style={{ height: "28px", width: "28px" }} onClick={this.handleRemoveOpen({ index: row.index, id: row.value })}>
                        <RemoveCircle style={{ fontSize: "18px" }} />
                    </IconButton>
                    №{row.value}
                </div>
            )
        },
        {
            Header: <Loc locKey="orders.table.username" />,
            accessor: "username"
        },
        {
            Header: <Loc locKey="orders.table.name" />,
            accessor: "name"
        },
        {
            Header: <Loc locKey="orders.table.email" />,
            accessor: "email"
        },
        {
            Header: <Loc locKey="orders.table.phone" />,
            accessor: "phoneNumber"
        },
        {
            Header: <Loc locKey="orders.table.address" />,
            accessor: "address"
        },
        {
            Header: <Loc locKey="orders.table.comment" />,
            accessor: "comment"
        },
        {
            Header: <Loc locKey="orders.table.totalprice" />,
            accessor: "totalprice"
        },
        {
            Header: <Loc locKey="orders.table.discount" />,
            accessor: "discount"
        },
        {
            Header: <Loc locKey="orders.table.code" />,
            accessor: "code"
        },
        {
            Header: <Loc locKey="orders.table.createddate" />,
            accessor: "date",
            sortMethod: (a, b) => {
                let t1 = Date.parse(a)
                let t2 = Date.parse(b)
                if (isNaN(t1) || isNaN(t2)) {
                    t1 = Date.parse(new Date(a));
                    t2 = Date.parse(new Date(b));
                }
                return t1 > t2 ? 1 : -1;
            }
        },
        {
            Header: <Loc locKey="orders.table.status" />,
            accessor: "status"
        }
    ]

    handleRemoveOpen = obj => event => {
        this.props.setIndex(obj.id)
        this.setState({ removeOpen: true });
    };

    handleRemoveClose = () => {
        this.setState({ removeOpen: false });
    };

    handleUpdateOpen = obj => event => {
        this.props.getOrder(obj.id)
        this.setState({ updateOpen: true })
    }

    handleUpdateClose = () => {
        this.setState({ updateOpen: false })
    }

    handleChange = name => event => {
        this.props.changeInput(name, event.target.value)
    }

    updateOrder = () => {
        this.props.updateOrder(this.props.currentId, this.props.order)
        this.handleUpdateClose();
    }

    removeOrder = () => {
        this.props.removeOrder(this.props.currentId)
        this.handleClose()
    }

    render() {
        document.title = "Orders"
        return (

            <Grid container className="scart-font" direction="row" justify="flex-start">
                <Grid item xs={12}>
                    <Typography variant="headline" align="center"><Loc locKey="aside.account.orders" /></Typography>
                </Grid>
                <Grid item xs={12}>
                    <ReactTable
                        expandedRows={true}
                        columns={this.columns}
                        className="-stripped -highlight"
                        data={this.props.orders}
                        SubComponent={row => {
                            return (<OrderItem id={row.original.id} />)
                        }}
                    />
                </Grid>

                <Dialog
                    open={this.state.updateOpen}
                    onClose={this.handleUpdateClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >

                    <DialogTitle id="alert-dialog-title">
                        Заказ №{this.props.currentId}
                    </DialogTitle>

                    <DialogContent>
                        <form>
                            <TextField
                                fullWidth
                                type="text"
                                name="name"
                                label={"Имя"}
                                value={this.props.order.name}
                                onChange={this.handleChange("name")}
                            />
                            <TextField
                                fullWidth
                                type="text"
                                name="tel"
                                label={"Телефон"}
                                value={this.props.order.phoneNumber}
                                onChange={this.handleChange("phoneNumber")}
                            />
                            <TextField
                                fullWidth
                                type="text"
                                name="address"
                                label={"Адрес"}
                                value={this.props.order.address}
                                onChange={this.handleChange("address")}
                            />
                            <TextField
                                fullWidth
                                type="number"
                                name="status"
                                label={"Статус"}
                                value={this.props.order.status}
                                onChange={this.handleChange("status")}
                            />
                        </form>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={this.updateOrder}>Изменить</Button>
                        <Button color="secondary" onClick={this.handleUpdateClose}>отмена</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.removeOpen}
                    onClose={this.handleRemoveClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{`Удалить заказ №${this.props.currentId} ?`}</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.removeOrder} color="secondary" variant="raised">
                            <Loc locKey="item.remove" />
                        </Button>
                        <Button onClick={this.handleRemoveClose} color="secondary" autoFocus>
                            <Loc locKey="item.cancel" />
                        </Button>
                    </DialogActions>
                </Dialog>
            </Grid>
        )
    }
}

export { OrdersPage as Orders }