import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../checkoutSteps/CheckoutSteps";
import { countries } from "countries-list";
import styles from "./Shipping.module.scss";
import { saveShippingInfo } from "../../../actions/cartActions";
import Navbar from "../../../components/header/Navbar";
import Footer from "../../../components/footer/Footer";
import MetaData from "../../../components/MetaData";

const Shipping = ({ history }) => {
    const countriesList = Object.values(countries);

    const { shippingInfo } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
    const [country, setCountry] = useState(shippingInfo.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            saveShippingInfo({ address, city, phoneNo, postalCode, country })
        );
        history.push("/confirm");
    };
    return (
        <Fragment>
            <MetaData title={"Shipping"} />
            <Navbar />
            <div className={styles.shipping}>
                <CheckoutSteps shipping />

                <div className={styles.shipping_container}>
                    <form onSubmit={submitHandler}>
                        <div className={styles.from_group}>
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.from_group}>
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.from_group}>
                            <label htmlFor="phone_field">Phone</label>
                            <input
                                type="phone"
                                id="phone_field"
                                value={phoneNo}
                                onChange={(e) => setPhoneNo(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.from_group}>
                            <label htmlFor="postal_code_field">
                                Postal Code
                            </label>
                            <input
                                type="number"
                                id="postal_code_field"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.from_group}>
                            <label htmlFor="country_field">Country</label>
                            <select
                                id="country_field"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                required
                            >
                                {countriesList.map((country) => (
                                    <option
                                        key={country.name}
                                        value={country.name}
                                    >
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.from_group}>
                            <button type="submit">CONTINUE</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default Shipping;
