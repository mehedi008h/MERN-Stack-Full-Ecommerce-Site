import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    newProductReducer,
    productDetailsReducer,
    productReducer,
    productsReducer,
} from "./reducers/productReducers";
import { authReducer } from "./reducers/userReducers";

const reducer = combineReducers({
    auth: authReducer,
    products: productsReducer,
    newProduct: newProductReducer,
    productDetails: productDetailsReducer,
    product: productReducer,
});

const middlware = [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
