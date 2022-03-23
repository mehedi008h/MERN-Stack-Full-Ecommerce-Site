import React from "react";
import CheckoutSteps from "../checkoutSteps/CheckoutSteps";
import styles from "./Payment.module.scss";

const Payment = () => {
    return (
        <div className={styles.payment}>
            <div className="container">
                <CheckoutSteps shipping confirmOrder payment />
            </div>
        </div>
    );
};

export default Payment;
