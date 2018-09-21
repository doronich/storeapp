import { favsConstants } from "../constants";
import { favsService } from "../services";

export const favsAction = {
    getFavs,
    deleteFav,
    addFav
}

function getFavs(id) {
    return dispatch => {
        dispatch(request())
        favsService.getFavs(id)
            .catch(err => {
                dispatch(failure(err))
            })
            .then(resp => {
                if (resp && resp.data)
                    dispatch(success(resp.data))
            })
    }


    function request() {
        return { type: favsConstants.GET_FAVS_REQUEST };
    }

    function success(items) {
        return { type: favsConstants.GET_FAVS_SUCCESS, items }
    }

    function failure(error) {
        return { type: favsConstants.GET_FAVS_FAILURE, error }
    }
}

function deleteFav(userId, itemId) {
    return dispatch => {
        dispatch(request())
        favsService.deleteFav(userId, itemId)
            .catch(err => {
                dispatch(failure(err))
            })
            .then(resp => {
                if (resp && resp.status === 204) {
                    dispatch(success(itemId))
                }
            })
    }


    function request() {
        return { type: favsConstants.DELETE_FAV_REQUEST };
    }

    function success(itemId) {
        return { type: favsConstants.DELETE_FAV_SUCCESS, itemId }
    }

    function failure(error) {
        return { type: favsConstants.DELETE_FAV_FAILURE, error }
    }
}

function addFav(userId, itemId) {
    return dispatch => {
        dispatch(request())
        favsService.addFav(userId, itemId)
            .catch(err => {
                dispatch(failure(err))
            })
            .then(resp => {
                if (resp && resp.status === 200) {
                    dispatch(success())
                }
            })
    }


    function request() {
        return { type: favsConstants.DELETE_FAV_REQUEST };
    }

    function success() {
        return { type: favsConstants.DELETE_FAV_SUCCESS }
    }

    function failure(error) {
        return { type: favsConstants.DELETE_FAV_FAILURE, error }
    }
}