import React from 'react'
import { Loc } from 'redux-react-i18n';
import { orderService } from '../../services';
import { Grid, Typography, Table, TableHead, TableRow, TableCell } from '@material-ui/core';



export class OrdersPage extends React.Component {

    componentDidMount() {
        orderService.getAll()
            .catch(err => {
                console.log(err)
            })
            .then(response => {
                if (response) {
                    console.log("order response:", response)
                }
            })
    }

    render() {



        document.title = "Orders"
        return (
            <Grid container className="container" direction="column" justify="flex-start" style={{ height: "100%" }}>
                <Grid item>
                    <Typography variant="headline"><Loc locKey="aside.account.orders" /></Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Table style={{width:"100%"}}>
                         <TableHead>
                             <TableRow>
                                <TableCell>Имя</TableCell>
                                <TableCell>Дата</TableCell>
                                <TableCell>Телефон</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Комментарий</TableCell>
                                <TableCell>Комментарий</TableCell>
                                <TableCell>Комментарий</TableCell>
                             </TableRow>
                         </TableHead>
                    </Table>
                </Grid>
            </Grid>
        )
    }
}