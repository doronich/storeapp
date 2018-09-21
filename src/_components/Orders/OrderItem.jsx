import React from 'react'
import { orderService } from '../../services';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import { Loc } from 'redux-react-i18n';
import { Link } from 'react-router-dom';

const columns = [
    {
        Header: <Loc locKey="orders.table.sub.name" />,
        accessor: "name"
    },
    {
        Header: <Loc locKey="orders.table.sub.price" />,
        accessor: "price",
        style: {
            textAlign: "center"
        }
    },
    {
        Header: <Loc locKey="orders.table.sub.amount" />,
        accessor: "amount",
        style: {
            textAlign: "center"
        }
    }
]
const styles = {
    link: {
        color: "black",
        textDecoration: "underline"
    }
}

export default class OrderItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            items: []
        }
    }

    componentWillMount() {
        orderService.getOrderItems(this.state.id)
            .then(res => {
                if (res) {
                    this.setState({ items: res.data });
                }
            })
            .catch(err => console.log(err))
    }

    render() {
        const lines = this.state.items.map(item => {
            return {
                name: <Link to={'/item/' + item.itemId} style={styles.link}>{item.name}</Link>,
                price: item.price,
                amount: item.amount
            }
        })

        return (
            <ReactTable
                columns={columns}
                data={lines}
                pageSize={lines.length}
                showPagination={false}
            />
        )
    }
}