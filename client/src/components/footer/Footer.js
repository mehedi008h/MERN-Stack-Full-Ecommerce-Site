import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import styles from "./Footer.module.scss";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.footer_info}>
                <div className="container">
                    <div className="row g-3">
                        {/* about us  */}
                        <div className="col-md-3">
                            <div className={styles.about_us}>
                                <h5>About Us</h5>
                                <div>
                                    <p>
                                        Lorem ipsum dolor sit, amet consectetur
                                        adipisicing elit. Est, et atque ducimus
                                        deserunt asperiores aliquid?
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* information  */}
                        <div className="col-md-3">
                            <div className={styles.information}>
                                <h5>Information</h5>
                                <div>
                                    <li>About Us</li>
                                    <li>Contact Us</li>
                                    <li>FAQs</li>
                                    <li>Privacy Policy</li>
                                    <li>Refund policy</li>
                                    <li>Cookie Policy</li>
                                </div>
                            </div>
                        </div>
                        {/* customer service  */}
                        <div className="col-md-3">
                            <div className={styles.information}>
                                <h5>CUSTTOMER SERVICE</h5>
                                <div>
                                    <li>My Account</li>
                                    <li>Support Center</li>
                                    <li>Terms & Conditions</li>
                                    <li>Returns & Exchanges</li>
                                    <li>Shipping & Delivery</li>
                                </div>
                            </div>
                        </div>
                        {/* the optimal newsletter  */}
                        <div className="col-md-3">
                            <div className={styles.newsletter}>
                                <h5>THE OPTIMAL NEWSLETTER</h5>
                                <div>
                                    <p>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Omnis, saepe.
                                    </p>
                                    <input type="email" />
                                    <button>
                                        <AiOutlineMail />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.copyright}>
                <span>© 2022 Optimal. All Rights Reserved.</span>
            </div>
        </div>
    );
};

export default Footer;
