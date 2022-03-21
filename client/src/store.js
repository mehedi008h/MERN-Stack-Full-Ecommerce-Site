import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newProductReducer, productsReducer } from "./reducers/productReducers";
import { authReducer } from "./reducers/userReducers";

const reducer = combineReducers({
    auth: authReducer,
    products: productsReducer,
    newProduct: newProductReducer,
});

const middlware = [thunk];
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
