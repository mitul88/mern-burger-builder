import axios from 'axios';

import * as actionTypes from './actionTypes';




export const addIngredient = igType => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: igType
    }
}

export const removeIngredient = igType => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igType
    }
}

export const updatePurchasable = () => {
    return {
        type: actionTypes.UPDATE_PURCHASABLE,
    }
}

export const resetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENTS,
    }
}

export const loadOrders = orders => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: orders,
    }
}

export const orderLoadFaild = () => {
    return {
        type: actionTypes.ORDER_LOAD_FAILED,
    }
}

export const fetchOrders = (token, userId) => dispatch => {
    const queryParams = '&orderBy="userId"&equalTo="'+ userId + '"';
    axios.get('https://react-burgerbuilder-17b3f-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth=' + token + queryParams)
        .then(response=> {
            dispatch(loadOrders(response.data));
        })
        .catch(err=> {
            dispatch(orderLoadFaild())
        })
}