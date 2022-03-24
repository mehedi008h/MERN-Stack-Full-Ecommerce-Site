import axios from "axios";

import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    CLEAR_ERRORS,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post("/api/v1/order/new", order, config);

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
