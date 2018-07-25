import React from 'react'
import { Loc } from 'redux-react-i18n';
import { orderService } from '../../services';
import { Grid, Typography} from '@material-ui/core';

import ReactTable from 'react-table'
import "react-table/react-table.css";

const columns=[
    {
        Header:<Loc locKey="orders.table.name"/>,
        accessor:"name"
    },
    {
        Header:<Loc locKey="orders.table.email"/>,
        accessor:"email"
    },
    {
        Header:<Loc locKey="orders.table.phone"/>,
        accessor:"phoneNumber"
    },
    {
        Header:<Loc locKey="orders.table.address"/>,
        accessor:"address"
    },
    {
        Header:<Loc locKey="orders.table.comment"/>,
        accessor:"comment"
    },
    {
        Header:<Loc locKey="orders.table.totalprice"/>,
        accessor:"totalprice"
    },
    {
        Header:<Loc locKey="orders.table.createddate"/>,
        accessor: "date"
    },
    {
        Header:<Loc locKey="orders.table.status"/>,
        accessor:"status"
    }
]

const styles = {
    table:{
        width:"100%",
        
    }
}

export class OrdersPage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            result:[],
            rows:20
        }
    }

    sub = (newEx,index,event)=>{
        console.log(event);
        console.log(index);
        console.log(newEx);
        orderService.getOrderItems(this.state.result[index].id)
            .then(result=>{
                if(result){
                    console.log(result.data)
                }
            })
            .catch(err=>console.log(err))
    }

    componentWillMount() {
       orderService.getAll()
            .catch(err => {
                console.log(err)
            })
            .then(response => {
                if (response) {
                    console.log("order response:", response)
                    this.setState({result:response.data});
                }
            })
    }

    render() {
        const lines = this.state.result.map((item,index)=>{
            return{
                name: item.name,
                email:item.email,
                phoneNumber:item.phoneNumber,
                address: item.address,
                comment: item.comment,
                totalprice: item.totalPrice,
                date: new Date( Date.parse(item.createdDate) ).toLocaleString("ru-RU"),
                status:item.status,
            }
        })

        console.log(lines)
        document.title = "Orders"
        return (
            <Grid container className="container" direction="column" justify="flex-start" style={{ height: "100%" }}>
                <Grid item>
                    <Typography variant="headline"><Loc locKey="aside.account.orders" /></Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}> 
                    <ReactTable
                        expandedRows={true}
                        style={styles.table}
                        columns={columns}
                        className="-stripped -highlight"
                        data={lines}
                        SubComponent={row=>{
                            return(<span>da</span>)
                        }}
                        onExpandedChange={this.sub}
                        />
                </Grid>
            </Grid>
        )
    }
}