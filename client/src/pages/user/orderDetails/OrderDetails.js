import React, { Fragment, useEffect } from "react";
import ProfileLink from "../../../components/profileLinks/ProfileLink";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { FcInTransit, FcPaid, FcProcess, FcShipped } from "react-icons/fc";

import styles from "./OrderDetails.module.scss";
import { clearErrors, getOrderDetails } from "../../../actions/orderActions";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { BsEmojiSmile, BsPhone } from "react-icons/bs";
import { FaCity } from "react-icons/fa";
import { GrLocation, GrStripe, GrStatusUnknown } from "react-icons/gr";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { GiTakeMyMoney } from "react-icons/gi";
import { AiOutlineDownload } from "react-icons/ai";
import Loader from "../../../components/loader/Loader";
import Navbar from "../../../components/header/Navbar";
import Footer from "../../../components/footer/Footer";
import MetaData from "../../../components/MetaData";

const OrderDetails = ({ match }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const {
        loading,
        error,
        order = {},
    } = useSelector((state) => state.orderDetails);

    // condition for animation

    let status;

    if (order.orderStatus === "Processing") {
        status = 0;
    } else if (order.orderStatus === "On The Way") {
        status = 1;
    } else if (order.orderStatus === "Shipped") {
        status = 2;
    } else {
        status = 3;
    }

    const statusClass = (index) => {
        if (index - status < 1) return styles.done;
        if (index - status === 1) return styles.inProgress;
        if (index - status > 1) return styles.undone;
    };

    const { shippingInfo, orderItems, paymentInfo, user, totalPrice } = order;

    useEffect(() => {
        dispatch(getOrderDetails(match.params.id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, match.params.id]);

    const isPaid =
        paymentInfo && paymentInfo.status === "succeeded" ? true : false;
    return (
        <Fragment>
            <MetaData title={"Order Details"} />
            <Navbar />
            <div className={styles.order_details}>
                <div className="container mt-5 mb-3">
                    <div className="row g-3">
                        <div className="col-md-3">
                            <ProfileLink />
                        </div>
                        <div className="col-md-9">
                            <div className={styles.details}>
                                {loading ? (
                                    <Loader />
                                ) : (
                                    <>
                                        <div className="d-flex align-items-center justify-content-between ps-3 pe-3 pt-3">
                                            <h5 className="">
                                                Order # {order._id}
                                            </h5>
                                            <button>
                                                <AiOutlineDownload
                                                    className={styles.icon}
                                                />{" "}
                                                Invoice
                                            </button>
                                        </div>
                                        <hr />
                                        {/* order status  */}
                                        <div className="p-3">
                                            <h5>Order Status :</h5>
                                            <div className="row g-3 mt-3 mb-3">
                                                <div className="col-md-3">
                                                    <div className="d-flex align-items-center justify-content-center flex-column">
                                                        <FcProcess
                                                            className={statusClass(
                                                                0
                                                            )}
                                                            size={40}
                                                        />
                                                        <p className="mt-2">
                                                            Processing
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="d-flex align-items-center justify-content-center flex-column">
                                                        <FcInTransit
                                                            className={statusClass(
                                                                1
                                                            )}
                                                            size={40}
                                                        />
                                                        <p className="mt-2">
                                                            On The Way
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="d-flex align-items-center justify-content-center flex-column">
                                                        <FcShipped
                                                            className={statusClass(
                                                                2
                                                            )}
                                                            size={40}
                                                        />
                                                        <p className="mt-2">
                                                            Shipped
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-md-3">
                                                    <div className="d-flex align-items-center justify-content-center flex-column">
                                                        <FcPaid
                                                            className={statusClass(
                                                                3
                                                            )}
                                                            size={40}
                                                        />
                                                        <p className="mt-2">
                                                            Delivery
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <hr className="text-primary" />
                                        <div className="row p-3">
                                            {/* shipping info  */}
                                            <div className="col-md-6">
                                                <h5>Shipping Info</h5>
                                                <Table
                                                    className="mt-3 mb-3"
                                                    borderless
                                                    responsive
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <BsEmojiSmile
                                                                    size={20}
                                                                />
                                                            </td>
                                                            <td className="fw-bold">
                                                                Name
                                                            </td>
                                                            <td>
                                                                {user &&
                                                                    user.name}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <BsPhone
                                                                    size={20}
                                                                />
                                                            </td>
                                                            <td className="fw-bold">
                                                                Phone
                                                            </td>
                                                            <td>
                                                                {shippingInfo &&
                                                                    shippingInfo.phoneNo}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <GrLocation
                                                                    size={20}
                                                                />
                                                            </td>
                                                            <td className="fw-bold">
                                                                Address
                                                            </td>
                                                            <td>
                                                                {shippingInfo &&
                                                                    shippingInfo.address}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <FaCity
                                                                    size={20}
                                                                />
                                                            </td>
                                                            <td className="fw-bold">
                                                                City
                                                            </td>
                                                            <td>
                                                                {shippingInfo &&
                                                                    shippingInfo.city}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </div>
                                            <div className="col-md-6">
                                                {/* payment info  */}
                                                <h5>Payment Info</h5>
                                                <Table
                                                    className="mt-3 mb-3"
                                                    borderless
                                                    responsive
                                                >
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <RiMoneyDollarCircleLine
                                                                    size={20}
                                                                />
                                                            </td>
                                                            <td className="fw-bold">
                                                                Payment
                                                            </td>
                                                            <td
                                                                className={
                                                                    isPaid
                                                                        ? "greenColor"
                                                                        : "redColor"
                                                                }
                                                            >
                                                                <b>
                                                                    {isPaid
                                                                        ? "PAID"
                                                                        : "NOT PAID"}
                                                                </b>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <GrStripe
                                                                    size={20}
                                                                />
                                                            </td>
                                                            <td className="fw-bold">
                                                                ID
                                                            </td>
                                                            <td>
                                                                {paymentInfo &&
                                                                    paymentInfo.id}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <GiTakeMyMoney
                                                                    size={20}
                                                                />
                                                            </td>
                                                            <td className="fw-bold">
                                                                Total
                                                            </td>
                                                            <td>
                                                                {totalPrice}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                <GrStatusUnknown
                                                                    size={20}
                                                                />
                                                            </td>
                                                            <td className="fw-bold">
                                                                Status
                                                            </td>
                                                            <td>
                                                                {
                                                                    order.orderStatus
                                                                }
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>

                                        <hr className="text-primary" />

                                        {/* order items  */}
                                        <div className="p-3">
                                            <h5>Order Items</h5>
                                            {orderItems &&
                                                orderItems.map((item) => (
                                                    <div
                                                        key={item.product}
                                                        className="row my-5"
                                                    >
                                                        <div className="col-4 col-lg-2">
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                height="45"
                                                                width="65"
                                                            />
                                                        </div>

                                                        <div className="col-5 col-lg-5">
                                                            <Link
                                                                style={{
                                                                    textDecoration:
                                                                        "none",
                                                                }}
                                                                to={`/products/${item.product}`}
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        </div>

                                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                                            <p>${item.price}</p>
                                                        </div>

                                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                                            <p>
                                                                {item.quantity}{" "}
                                                                Piece(s)
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default OrderDetails;
