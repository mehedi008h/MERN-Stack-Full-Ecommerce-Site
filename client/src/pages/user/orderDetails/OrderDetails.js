import React, { useEffect } from "react";
import ProfileLink from "../../../components/profileLinks/ProfileLink";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { FcInTransit, FcPaid, FcProcess, FcShipped } from "react-icons/fc";

import styles from "./OrderDetails.module.scss";
import { clearErrors, getOrderDetails } from "../../../actions/orderActions";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import { BsEmojiSmile, BsPhone } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";

const OrderDetails = ({ match }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const {
        loading,
        error,
        order = {},
    } = useSelector((state) => state.orderDetails);

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

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        user,
        totalPrice,
        orderStatus,
    } = order;

    useEffect(() => {
        dispatch(getOrderDetails(match.params.id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, match.params.id]);

    const shippingDetails =
        shippingInfo &&
        `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`;

    const isPaid =
        paymentInfo && paymentInfo.status === "succeeded" ? true : false;
    return (
        <div className={styles.order_details}>
            <div className="container" style={{ marginTop: "85px" }}>
                <div className="row g-3">
                    <div className="col-md-3">
                        <ProfileLink />
                    </div>
                    <div className="col-md-9">
                        <div className={styles.details}>
                            <h4 className="">Order # {order._id}</h4>
                            {/* order status  */}
                            <div>
                                <h4>Order Status :</h4>
                                <div className="row g-3 mt-3 mb-3">
                                    <div className="col-md-3">
                                        <div className="d-flex align-items-center justify-content-center flex-column">
                                            <FcProcess
                                                className={statusClass(0)}
                                                size={40}
                                            />
                                            <p className="mt-2">Processing</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="d-flex align-items-center justify-content-center flex-column">
                                            <FcInTransit
                                                className={statusClass(1)}
                                                size={40}
                                            />
                                            <p className="mt-2">On The Way</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="d-flex align-items-center justify-content-center flex-column">
                                            <FcShipped
                                                className={statusClass(2)}
                                                size={40}
                                            />
                                            <p className="mt-2">Shipped</p>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <div className="d-flex align-items-center justify-content-center flex-column">
                                            <FcPaid
                                                className={statusClass(3)}
                                                size={40}
                                            />
                                            <p className="mt-2">Delivery</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="text-primary" />
                            <div className="row">
                                {/* shipping info  */}
                                <div className="col-md-6">
                                    <h5>Shipping Info</h5>
                                    <Table className="mt-3 mb-3" responsive>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <BsEmojiSmile size={25} />
                                                </td>
                                                <td className="fw-bold">
                                                    Name
                                                </td>
                                                <td>{user && user.name}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <BsPhone size={25} />
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
                                                    <BsPhone size={25} />
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
                                                    <BsPhone size={25} />
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
                                    <Table className="mt-3 mb-3" responsive>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <BsEmojiSmile size={25} />
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
                                                    {isPaid
                                                        ? "PAID"
                                                        : "NOT PAID"}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <BsPhone size={25} />
                                                </td>
                                                <td className="fw-bold">ID</td>
                                                <td>
                                                    {paymentInfo &&
                                                        paymentInfo.id}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <BsPhone size={25} />
                                                </td>
                                                <td className="fw-bold">
                                                    Total
                                                </td>
                                                <td>{totalPrice}</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <BsPhone size={25} />
                                                </td>
                                                <td className="fw-bold">
                                                    Status
                                                </td>
                                                <td>{order.orderStatus}</td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>

                            <hr className="text-primary" />
                            <div className="cart-item my-1">
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
                                                        textDecoration: "none",
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
                                                <p>{item.quantity} Piece(s)</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
