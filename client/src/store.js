import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    newProductReducer,
    productDetailsReducer,
    productReducer,
    productsReducer,
} from "./reducers/productReducers";
import {
    allUsersReducer,
    authReducer,
    userDetailsReducer,
    userReducer,
} from "./reducers/userReducers";
import { cartReducer } from "./reducers/cartReducers";
import { allOrdersReducer, newOrderReducer } from "./reducers/orderReducers";

const reducer = combineReducers({
    auth: authReducer,
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
