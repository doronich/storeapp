import React from 'react'
import { Loc } from 'redux-react-i18n';
import ReactTable from 'react-table'
import { orderService } from '../../services';
import OrderItem from '../Orders/OrderItem';
import moment from "moment";

const columns = [
    {
        Header: <Loc locKey="orders.table.name" />,
        accessor: "name"
    },
    {
        Header: <Loc locKey="orders.table.address" />,
        accessor: "address"
    },
    {
        Header: <Loc locKey="orders.table.phone" />,
        accessor: "phoneNumber"
    },
    {
        Header: <Loc locKey="orders.table.comment" />,
        accessor: "comment"
    },
    {
        Header: <Loc locKey="orders.table.totalprice" />,
        accessor: "totalPrice",
        style: {
            textAlign: "center"
        }
    },
    {
        Header: <Loc locKey="orders.table.code" />,
        accessor: "code"
    },
    {
        Header: <Loc locKey="orders.table.discount" />,
        accessor: "discount",
        style: {
            textAlign: "center"
        }
    },
    {
        Header: <Loc locKey="orders.table.createddate" />,
        accessor: "createDate"
    },
    {
        Header: <Loc locKey="orders.table.status" />,
        accessor: "status"
    }
]

export class OrdersSection extends React.Component {

    orders = [];
    state = {
        loading: true
    }

    getStatus = (n) => {
        switch (n) {
            case 0:
                return <Loc locKey="orders.table.statuses.queue" />;
            case 1:
                return <Loc locKey="orders.table.statuses.execute" />;
            case 2:
                return <Loc locKey="orders.table.statuses.paid" />;
            case 3:
                return <Loc locKey="orders.table.statuses.canceled" />;
            default:
                break;
        }
    }

    componentDidMount() {


        orderService.getUsersOrders(this.props.id)
            .then(res => {
                this.orders = res.data;
                this.setState({ loading: false })
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let lines = [];
        if (this.orders) {
            lines = this.orders.map(item => {
                return {
                    ...item,
                    createDate: moment.utc(item.createDate).local().format("DD-MM-YYYY HH:mm:ss"),
                    status: this.getStatus(item.status)
                }
            })
        }


        return (
            <div className="account-font">
                <h3 className="profile-title_min"> <Loc locKey="orders.table.yourorders" /></h3>
                <ReactTable
                    expandedRows={true}
                    columns={columns}
                    defaultPageSize={10}
                    data={lines}
                    SubComponent={row => {
                        return (<OrderItem id={row.original.id} />)
                    }}
                />
            </div>
        )
    }
}