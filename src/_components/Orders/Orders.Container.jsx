import React from 'react'
import { Orders } from './Orders';
import { connect } from 'react-redux'
import { orderActions } from '../../actions/order.actions';
import './style.css'

class OrdersContainer extends React.Component {

    componentDidMount() {
        this.props.getOrders();
    }

    render() {
        return (
            <Orders
                orders={this.props.orders}
                order={this.props.order}
                currentId={this.props.currentId}
                removeOrder={this.props.removeOrder}
                getOrder={this.props.getOrder}
                changeInput={this.props.changeInput}
                updateOrder={this.props.updateOrder}
                setIndex={this.props.setIndex}
                getOrderItems={this.props.getOrderItems}
            />
        )
    }
}

const mapStateToProps = state => {
    const { orders, order, currentId } = state.order;
    return { orders, order, currentId };
}

const mapDispatchToProps = dispatch => {
    return {
        getOrders: () => dispatch(orderActions.getOrders()),
        removeOrder: (id) => dispatch(orderActions.removeOrder(id)),
        getOrder: (id) => dispatch(orderActions.getOrder(id)),
        changeInput: (name, value) => dispatch(orderActions.changeInput(name, value)),
        updateOrder: (id, order) => dispatch(orderActions.updateOrder(id, order)),
        setIndex: (id) => dispatch(orderActions.setIndex(id)),
        //getOrderItems: (id) => dispatch(orderActions.getOrderItems(id))
    }
}

const connectedOrdersContainer = connect(mapStateToProps, mapDispatchToProps)(OrdersContainer);
export { connectedOrdersContainer as OrdersContainer }