import React, { useEffect } from "react";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import Widget from "../../../components/widget/Widget";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Dashboard.module.scss";
import Loader from "../../../components/loader/Loader";
import { getAdminProducts } from "../../../actions/productAction";
import { allUsers } from "../../../actions/userActions";
import { allOrders } from "../../../actions/orderActions";
import MetaData from "../../../components/MetaData";

const Dashboard = () => {
    const dispatch = useDispatch();

    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.allUsers);
    const { loading, products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getAdminProducts());
    }, [dispatch]);
    useEffect(() => {
        dispatch(allOrders());
    }, [dispatch]);
    useEffect(() => {
        dispatch(allUsers());
    }, [dispatch]);

    let stockout = products?.filter((item) => item.stock === 0);

    const user = {
        title: "USERS",
        total: users?.length,
        link: (
            <Link style={{ textDecoration: "none" }} to={"/admin/users"}>
                See all user
            </Link>
        ),
        icon: <AiOutlineUser />,
    };
    const order = {
        title: "ORDERS",
        total: orders?.length,
        link: (
            <Link style={{ textDecoration: "none" }} to={"/admin/orders"}>
                See all orders
            </Link>
        ),
        icon: <AiOutlineShoppingCart />,
    };
    const product = {
        title: "PRODUCTS",
        total: products?.length,
        link: (
            <Link style={{ textDecoration: "none" }} to={"/admin/products"}>
                See all products
            </Link>
        ),
        icon: <AiOutlineUser />,
    };
    const stock = {
        title: "STOCK OUT",
        total: stockout.length,
        link: (
            <Link style={{ textDecoration: "none" }} to={"/admin/users"}>
                See all user
            </Link>
        ),
        icon: <AiOutlineUser />,
    };

    return (
        <div className={styles.dashboard}>
            <MetaData title={"Dashboard"} />
            <div className="row g-0">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <Navbar />
                    {loading ? (
                        <>
                            <Loader />
                        </>
                    ) : (
                        <>
                            <div className={styles.widgets}>
                                <Widget
                                    title={user.title}
                                    icon={user.icon}
                                    link={user.link}
                                    total={user.total}
                                />
                                <Widget
                                    title={order.title}
                                    icon={order.icon}
                                    link={order.link}
                                    total={order.total}
                                />
                                <Widget
                                    title={product.title}
                                    icon={product.icon}
                                    link={product.link}
                                    total={product.total}
                                />
                                <Widget
                                    title={stock.title}
                                    icon={stock.icon}
                                    link={stock.link}
                                    total={stock.total}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
