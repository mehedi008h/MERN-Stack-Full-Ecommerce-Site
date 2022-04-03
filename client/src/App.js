import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/auth/login/Login";
import Products from "./pages/products/Products";
import Register from "./pages/auth/register/Register";
import { useEffect, useState } from "react";
import store from "./store";
import { loadUser } from "./actions/userActions";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import NewProduct from "./pages/admin/newProduct/NewProduct";
import ProductsList from "./pages/admin/products/ProductsList";
import ProtectedRoute from "./components/route/ProtectedRoute";
import ProductDetails from "./pages/admin/productDetails/ProductDetails";
import UpdateProduct from "./pages/admin/updateProduct/UpdateProduct";
import SingleProduct from "./pages/singleProduct/SingleProduct";
import Cart from "./pages/cart/Cart";
import Shipping from "./pages/cart/shipping/Shipping";
import ConfirmOrder from "./pages/cart/confirmOrder/ConfirmOrder";

//  payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./pages/cart/payment/Payment";
import Success from "./pages/cart/success/Success";
import Users from "./pages/admin/users/Users";
import UserDetails from "./pages/admin/users/userDetails/UserDetails";
import Orders from "./pages/admin/orders/Orders";
import ProcessOrder from "./pages/admin/orders/processOrder/ProcessOrder";
import Profile from "./pages/user/Profile";
import UpdateProfile from "./pages/user/updateProfile/UpdateProfile";
import ChangePassword from "./pages/user/changePassword/ChangePassword";
import MyOrders from "./pages/user/myOrders/MyOrders";
import OrderDetails from "./pages/user/orderDetails/OrderDetails";
import ProductReview from "./pages/admin/productReview/ProductReview";
import ForgotPassword from "./pages/auth/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/auth/resetPassword/ResetPassword";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import { axiosInstance } from "./config";

function App() {
    const [stripeApiKey, setStripeApiKey] = useState("");
    useEffect(() => {
        store.dispatch(loadUser());

        async function getStripApiKey() {
            const { data } = await axiosInstance.get("/api/v1/stripeapi");

            setStripeApiKey(data.stripeApiKey);
        }

        getStripApiKey();
    }, []);
    return (
        <div className="app">
            <Router>
                <Route path="/" component={Home} exact />
                <Route path="/login" component={Login} exact />
                <Route path="/register" component={Register} exact />
                <Route
                    path="/password/forgot"
                    component={ForgotPassword}
                    exact
                />
                <Route
                    path="/password/reset/:token"
                    component={ResetPassword}
                    exact
                />
                <Route path="/about" component={About} exact />
                <Route path="/contact" component={Contact} exact />
                <Route path="/products" component={Products} exact />
                <Route path="/products/search/:keyword" component={Products} />
                <Route path="/product/:id" component={SingleProduct} exact />
                <Route path="/cart" component={Cart} exact />

                <ProtectedRoute path="/me" component={Profile} exact />
                <ProtectedRoute
                    path="/me/update"
                    component={UpdateProfile}
                    exact
                />
                <ProtectedRoute
                    path="/me/password"
                    component={ChangePassword}
                    exact
                />
                <ProtectedRoute path="/orders/me" component={MyOrders} exact />
                <ProtectedRoute
                    path="/order/:id"
                    component={OrderDetails}
                    exact
                />

                <ProtectedRoute path="/shipping" component={Shipping} />
                <ProtectedRoute path="/confirm" component={ConfirmOrder} />
                {stripeApiKey && (
                    <Elements stripe={loadStripe(stripeApiKey)}>
                        <ProtectedRoute path="/payment" component={Payment} />
                    </Elements>
                )}
                <ProtectedRoute path="/success" component={Success} />
                <ProtectedRoute
                    path="/admin"
                    isAdmin={true}
                    component={Dashboard}
                    exact
                />
                <ProtectedRoute
                    path="/admin/products/new"
                    isAdmin={true}
                    component={NewProduct}
                    exact
                />
                <ProtectedRoute
                    path="/admin/products"
                    isAdmin={true}
                    component={ProductsList}
                    exact
                />
                <ProtectedRoute
                    path="/admin/product/details/:id"
                    component={ProductDetails}
                    exact
                />
                <ProtectedRoute
                    path="/admin/product/:id"
                    isAdmin={true}
                    component={UpdateProduct}
                    exact
                />
                <ProtectedRoute
                    path="/admin/users"
                    isAdmin={true}
                    component={Users}
                    exact
                />
                <ProtectedRoute
                    path="/admin/user/details/:id"
                    isAdmin={true}
                    component={UserDetails}
                    exact
                />
                <ProtectedRoute
                    path="/admin/orders"
                    isAdmin={true}
                    component={Orders}
                    exact
                />
                <ProtectedRoute
                    path="/admin/order/:id"
                    isAdmin={true}
                    component={ProcessOrder}
                    exact
                />
                <ProtectedRoute
                    path="/admin/reviews"
                    isAdmin={true}
                    component={ProductReview}
                    exact
                />
            </Router>
        </div>
    );
}

export default App;
