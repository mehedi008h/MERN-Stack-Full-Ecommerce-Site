import React, { Fragment, useEffect } from "react";
import Loader from "../../../components/loader/Loader";
import ProfileLink from "../../../components/profileLinks/ProfileLink";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import styles from "./MyOrders.module.scss";
import { clearErrors, myOrders } from "../../../actions/orderActions";
import { Link } from "react-router-dom";
import Navbar from "../../../components/header/Navbar";
import Footer from "../../../components/footer/Footer";
import MetaData from "../../../components/MetaData";

const MyOrders = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector((state) => state.myOrders);

    useEffect(() => {
        dispatch(myOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error]);
    return (
        <Fragment>
            <MetaData title={"My Order"} />
            <Navbar />
            <div className={styles.orders}>
                <div className="container mt-5 mb-3">
                    <div className="row g-3">
                        <div className="col-md-3">
                            <ProfileLink />
                        </div>
                        <div className="col-md-9">
                            {loading ? (
                                <Loader />
                            ) : (
                                <>
                                    {orders && (
                                        <Fragment>
                                            <div
                                                className={
                                                    styles.orders_container
                                                }
                                            >
                                                {orders.length === 0 ? (
                                                    <>
                                                        <h4>
                                                            No Item Order Yet
                                                        </h4>
                                                    </>
                                                ) : (
                                                    <>
                                                        {/* <div className="d-flex align-items-center justify-content-between mb-2 ps-2 pe-2 pt-2">
                                                <h5>
                                                    Total Orders :
                                                    <span className="ms-2 text-success">
                                                        {orders.length}
                                                    </span>
                                                </h5>
                                                <h5>
                                                    Total Spend :
                                                    <span className="ms-2 text-success">
                                                        {orders.length}
                                                    </span>
                                                </h5>
                                            </div> */}
                                                        <div>
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <p className="fw-bold">
                                                                        Order ID
                                                                    </p>
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <p className="fw-bold">
                                                                        Quantity
                                                                    </p>
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <p className="fw-bold">
                                                                        Amount
                                                                    </p>
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <p className="fw-bold">
                                                                        Status
                                                                    </p>
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <p className="fw-bold">
                                                                        Actions
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <hr className="text-primary" />
                                                        {orders.map((order) => (
                                                            <div>
                                                                <div className="row">
                                                                    <div className="col-md-4">
                                                                        <p>
                                                                            {
                                                                                order?._id
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <p>
                                                                            {
                                                                                order
                                                                                    ?.orderItems
                                                                                    .length
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <p>
                                                                            $
                                                                            {
                                                                                order?.totalPrice
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        {/* Delivered  */}
                                                                        {order?.orderStatus ===
                                                                            "Delivered" && (
                                                                            <>
                                                                                <p
                                                                                    style={{
                                                                                        color: "green",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        order?.orderStatus
                                                                                    }
                                                                                </p>
                                                                            </>
                                                                        )}
                                                                        {/* Shipped */}
                                                                        {order?.orderStatus ===
                                                                            "Shipped" && (
                                                                            <>
                                                                                <p
                                                                                    style={{
                                                                                        color: "skyblue",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        order?.orderStatus
                                                                                    }
                                                                                </p>
                                                                            </>
                                                                        )}
                                                                        {/* Processing  */}
                                                                        {order?.orderStatus ===
                                                                            "On The Way" && (
                                                                            <>
                                                                                <p
                                                                                    style={{
                                                                                        color: "#DCAB2F",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        order?.orderStatus
                                                                                    }
                                                                                </p>
                                                                            </>
                                                                        )}
                                                                        {/* Processing  */}
                                                                        {order?.orderStatus ===
                                                                            "Processing" && (
                                                                            <>
                                                                                <p
                                                                                    style={{
                                                                                        color: "#DCAB2F",
                                                                                    }}
                                                                                >
                                                                                    {
                                                                                        order?.orderStatus
                                                                                    }
                                                                                </p>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <Link
                                                                            to={`/order/${order?._id}`}
                                                                            className={
                                                                                styles.view_button
                                                                            }
                                                                        >
                                                                            View
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </>
                                                )}
                                            </div>
                                        </Fragment>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default MyOrders;
