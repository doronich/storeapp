import { orderConstants } from "../constants";
import moment from 'moment';
import { statusHelper } from "../helpers";
import React from 'react'

const initialState = {
    orders: [],
    currentId: 0,
    order: {
        name: "",
        address: "",
        phoneNumber: "",
        status: 0
    },
    orderItems: [],
    errorMessage: "Error"
};

export function order(state = initialState, action) {

    switch (action.type) {
        case orderConstants.GET_ORDERS_REQUEST:
            return {
                ...state
            }
        case orderConstants.GET_ORDERS_FAILURE:
            return {
                ...state,
                errorMessage: action.error.message
            }
        case orderConstants.GET_ORDERS_SUCCESS: {

            const orders = action.orders.map(item => {
                return {
                    id: item.id,
                    username: (<a href="/">{item.username}</a>),
                    name: item.name,
                    email: item.email,
                    phoneNumber: item.phoneNumber,
                    address: item.address,
                    comment: item.comment,
                    totalprice: item.totalPrice,
                    date: moment.utc(item.createdDate).local().format("DD-MM-YYYY HH:mm:ss"),
                    status: statusHelper.getStatus(item.status),
                    discount: item.code ? item.code.discount + "%" : "",
                    code: item.code ? item.code.code : "",
                    orderItems: []
                }
            });

            return {
                ...state,
                orders
            }
        }
        case orderConstants.REMOVE_ORDER_REQUEST:
            return {
                ...state
            }
        case orderConstants.REMOVE_ORDER_SUCCESS: {
            const orders = state.orders.filter(i => i.id !== action.id)

            return {
                ...state,
                orders
            }
        }
        case orderConstants.REMOVE_ORDER_FAILURE: {
            return {
                ...state,
                errorMessage: action.error.message
            }
        }
        case orderConstants.GET_ORDER_REQUEST:
            return {
                ...state,
                currentId: action.id
            }
        case orderConstants.GET_ORDER_SUCCESS:
            const { name, address, phoneNumber, status } = action.order;
            return {
                ...state,
                order: {
                    name,
                    address,
                    phoneNumber,
                    status
                }
            }
        case orderConstants.GET_ORDER_FAILURE:
            return {
                ...state,
                errorMessage: action.error.message
            }
        case orderConstants.CHANGE_INPUT:
            return {
                ...state,
                order: {
                    ...state.order,
                    [action.name]: action.value
                }
            }
        case orderConstants.UPDATE_ORDER_REQUEST:
            return {
                ...state
            }
        case orderConstants.UPDATE_ORDER_SUCCESS:
            const orders = state.orders.map(item => {
                if (item.id === state.currentId)
                    return {
                        ...item,
                        ...state.order,
                        status: statusHelper.getStatus(parseInt(state.order.status, 10)),
                    }
                return item;
            })
            return {
                ...state,
                orders
            }
        case orderConstants.UPDATE_ORDER_FAILURE:
            return {
                ...state,
                errorMessage: action.error.message
            }
        case orderConstants.SET_CURRENT_INDEX:
            return {
                ...state,
                currentId: action.id
            }
        case orderConstants.GET_ORDERITEMS_REQUEST:
            return {
                ...state,
                currentId: action.id
            }
        case orderConstants.GET_ORDERITEMS_SUCCESS:
            const ords = state.orders.map(item => {

                if (item.id === state.currentId)
                    return {
                        ...item,
                        orderItems: action.orderItems
                    }
                return item;
            })
            return {
                ...state,
                orders: ords
            }
        case orderConstants.GET_ORDERITEMS_FAILURE:
            return {
                ...state,
                errorMessage: action.error.message
            }
        default:
            return state;
    }
}