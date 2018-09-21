import { itemService } from "../services";
import { itemConstants } from "../constants";


export const itemActions = {
    getItems,
    changeName,
    changeProp
}

function changeName(name) {
    return { type: itemConstants.NAME, name }
}

function changeProp(name, value) {
    return { type: itemConstants.CHANGE_PROP, name, value }
}

function getItems(params) {
    return dispatch => {
        dispatch(request())
        itemService.getReqItems(params)
            .catch(err => {
                dispatch(failure(err))
            })
            .then(resp => {
                if (resp && resp.data)
                    dispatch(success(resp.data))
            });
    }

    function request() {
        return { type: itemConstants.GET_ITEMS_REQUEST };
    }

    function success(data) {
        return { type: itemConstants.GET_ITEMS_SUCCESS, data }
    }

    function failure(error) {
        return { type: itemConstants.GET_ITEMS_FAILURE, error }
    }
}