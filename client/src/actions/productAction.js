import { axiosInstance } from "../config";
import {
    ADMIN_PRODUCTS_FAIL,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    CLEAR_ERRORS,
    DELETE_PRODUCT_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    GET_REVIEWS_FAIL,
    GET_REVIEWS_REQUEST,
    GET_REVIEWS_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
} from "../constants/productsConstants";

// get product for user
export const getProducts =
    (keyword = "", currentPage = 1, price, category, rating = 0) =>
    async (dispatch) => {
        try {
            dispatch({ type: ALL_PRODUCTS_REQUEST });

            let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&ratings[gte]=${rating}`;

            if (category) {
                link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}&ratings[gte]=${rating}`;
            }

            const { data } = await axiosInstance.get(link);

            dispatch({
                type: ALL_PRODUCTS_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: ALL_PRODUCTS_FAIL,
                payload: error.response.data.message,
            });
        }
    };

// create new produtc by admin
export const newProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axiosInstance.post(
            `/api/v1/admin/products/new`,
            productData,
            config
        );

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// get admin products
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST });

        const { data } = await axiosInstance.get(`/api/v1/admin/products`);

        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axiosInstance.get(`/api/v1/product/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update Product (ADMIN)
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axiosInstance.put(
            `/api/v1/admin/product/${id}`,
            productData,
            config
        );

        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete product (Admin)
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        const { data } = await axiosInstance.delete(
            `/api/v1/admin/product/${id}`
        );

        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

// review section

export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axiosInstance.put(
            `/api/v1/review`,
            reviewData,
            config
        );

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get product reviews
export const getProductReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: GET_REVIEWS_REQUEST });

        const { data } = await axiosInstance.get(`/api/v1/reviews?id=${id}`);

        dispatch({
            type: GET_REVIEWS_SUCCESS,
            payload: data.reviews,
        });
    } catch (error) {
        dispatch({
            type: GET_REVIEWS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete product review
export const deleteReview = (id, productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST });

        const { data } = await axiosInstance.delete(
            `/api/v1/reviews?id=${id}&productId=${productId}`
        );

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        console.log(error.response);

        dispatch({
            type: DELETE_REVIEW_FAIL,
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
