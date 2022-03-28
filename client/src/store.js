import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    newProductReducer,
    newReviewReducer,
    productDetailsReducer,
    productReducer,
    productReviewsReducer,
    productsReducer,
    reviewReducer,
} from "./reducers/productReducers";
import {
    allUsersReducer,
    authReducer,
    forgotPasswordReducer,
    userDetailsReducer,
    userReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
    allOrdersReducer,
    myOrdersReducer,
    newOrderReducer,
    orderDetailsReducer,
    orderReducer,
} from "./reducers/orderReducers";

const reducer = combineReducers({
    auth: authReducer,
    forgotPassword: forgotPasswordReducer,
    products: productsReducer,
    newProduct: newProductReducer,
    productDetails: productDetailsReducer,
    product: productReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    allUsers: allUsersReducer,
    user: userReducer,
    userDetails: userDetailsReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    orderDetails: orderDetailsReducer,
    myOrders: myOrdersReducer,
    productReviews: productReviewsReducer,
    review: reviewReducer,
    newReview: newReviewReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },
};

const middlware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
