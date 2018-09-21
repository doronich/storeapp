import { orderService } from '../services';
import { orderConstants } from '../constants'

export const orderActions = {
    getOrders,
    removeOrder,
    getOrder,
    changeInput,
    updateOrder,
    setIndex,
    getOrderItems
}

function getOrders() {
    return dispatch => {
        dispatch(request());

        orderService.getAll()
            .catch(err => {
                dispatch(failure(err));
                console.log(err)
            })
            .then(response => {
                if (response && response.data) {
                    dispatch(success(response.data));
                }
            });
    }

    function request() {
        return { type: orderConstants.GET_ORDERS_REQUEST };
    }

    function success(orders) {
        return { type: orderConstants.GET_ORDERS_SUCCESS, orders }
    }

    function failure(error) {
        return { type: orderConstants.GET_ORDERS_FAILURE, error }
    }
}

function removeOrder(id) {
    return dispatch => {
        dispatch(request())

        orderService.removeOrder(id)
            .catch(err => {
                dispatch(failure(err))
            })
            .then(resp => {
                if (resp && resp.status === 204) {
                    dispatch(success(id))
                }
            });
    }

    function request() {
        return { type: orderConstants.REMOVE_ORDER_REQUEST }
    }

    function success(id) {
        return { type: orderConstants.REMOVE_ORDER_SUCCESS, id }
    }

    function failure(error) {
        return { type: orderConstants.REMOVE_ORDER_FAILURE, error }
    }
}

function getOrder(id) {
    return dispatch => {
        dispatch(request(id))

        orderService.getOrder(id)
            .catch(err => {
                console.log(err)
                dispatch(failure(err))
            })
            .then(resp => {
                if (resp && resp.data)
                    dispatch(success(resp.data))
            })
    }

    function request(id) {
        return { type: orderConstants.GET_ORDER_REQUEST, id };
    }

    function success(order) {
        return { type: orderConstants.GET_ORDER_SUCCESS, order }
    }

    function failure(error) {
        return { type: orderConstants.GET_ORDER_FAILURE, error }
    }
}

function changeInput(name, value) {
    return { type: orderConstants.CHANGE_INPUT, name, value }
}

function updateOrder(id, order) {
    return dispatch => {
        dispatch(request())
        order.id = id;
        orderService.updateOrder(order)
            .catch(err => {
                console.log(err)
                dispatch(failure(err))
            })
            .then(resp => {
                if (resp.status === 200)
                    dispatch(success())
            })
    }

    function request() {
        return { type: orderConstants.UPDATE_ORDER_REQUEST };
    }

    function success() {
        return { type: orderConstants.UPDATE_ORDER_SUCCESS }
    }

    function failure(error) {
        return { type: orderConstants.UPDATE_ORDER_FAILURE, error }
    }
}

function setIndex(id) {
    return { type: orderConstants.SET_CURRENT_INDEX, id }
}

function getOrderItems(id) {
    return dispatch => {
        dispatch(request(id))

        orderService.getOrderItems(id)
            .catch(err => {
                console.log(err)
                dispatch(failure(err))
            })
            .then(resp => {
                if (resp && resp.data)
                    dispatch(success(resp.data))
            })
    }

    function request(id) {
        return { type: orderConstants.GET_ORDERITEMS_REQUEST, id };
    }

    function success(orderItems) {
        return { type: orderConstants.GET_ORDERITEMS_SUCCESS, orderItems }
    }

    function failure(error) {
        return { type: orderConstants.GET_ORDERITEMS_FAILURE, error }
    }
}