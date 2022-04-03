import React, { Fragment, useEffect } from "react";
import CheckoutSteps from "../checkoutSteps/CheckoutSteps";
import styles from "./Payment.module.scss";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
} from "@stripe/react-stripe-js";

import { clearErrors, createOrder } from "../../../actions/orderActions";
import Navbar from "../../../components/header/Navbar";
import Footer from "../../../components/footer/Footer";
import MetaData from "../../../components/MetaData";
import { axiosInstance } from "../../../config";

const options = {
    style: {
        base: {
            fontSize: "16px",
        },
        invalid: {
            color: "#9e2146",
        },
    },
};

const Payment = ({ history }) => {
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { cartItems, shippingInfo } = useSelector((state) => state.cart);
    const { error } = useSelector((state) => state.newOrder);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error]);

    const order = {
        orderItems: cartItems,
        shippingInfo,
    };

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    if (orderInfo) {
        order.itemsPrice = orderInfo.itemsPrice;
        order.shippingPrice = orderInfo.shippingPrice;
        order.taxPrice = orderInfo.taxPrice;
        order.totalPrice = orderInfo.totalPrice;
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        document.querySelector("#pay_btn").disabled = true;

        let res;
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            res = await axiosInstance.post(
                "/api/v1/payment/process",
                paymentData,
                config
            );

            const clientSecret = res.data.client_secret;

            if (!stripe || !elements) {
                return;
            }

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                    },
                },
            });

            if (result.error) {
                alert.error(result.error.message);
                document.querySelector("#pay_btn").disabled = false;
            } else {
                // The payment is processed or not
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status,
                    };

                    dispatch(createOrder(order));

                    history.push("/success");
                } else {
                    alert.error("There is some issue while payment processing");
                }
            }
        } catch (error) {
            document.querySelector("#pay_btn").disabled = false;
            alert.error(error.response.data.message);
        }
    };
    return (
        <Fragment>
            <MetaData title={"Payment"} />
            <Navbar />
            <div className={styles.payment}>
                <div className="container">
                    <CheckoutSteps shipping confirmOrder payment />

                    <div className={styles.payment_container}>
                        <form onSubmit={submitHandler}>
                            <h4 className="mb-4">Card Info</h4>
                            <div className={styles.from_group}>
                                <label htmlFor="card_num_field">
                                    Card Number
                                </label>
                                <CardNumberElement
                                    type="text"
                                    id="card_num_field"
                                    options={options}
                                />
                            </div>

                            <div className={styles.from_group}>
                                <label htmlFor="card_exp_field">
                                    Card Expiry
                                </label>
                                <CardExpiryElement
                                    type="text"
                                    id="card_exp_field"
                                    options={options}
                                />
                            </div>

                            <div className={styles.from_group}>
                                <label htmlFor="card_cvc_field">Card CVC</label>
                                <CardCvcElement
                                    type="text"
                                    id="card_cvc_field"
                                    options={options}
                                />
                            </div>
                            <div className={styles.from_group}>
                                <button id="pay_btn" type="submit">
                                    Pay{" "}
                                    {` - ${orderInfo && orderInfo.totalPrice}`}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default Payment;
