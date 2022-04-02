import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, login } from "../../../actions/userActions";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/header/Navbar";
import ButtonLoader from "../../../components/loader/ButtonLoader";
import MetaData from "../../../components/MetaData";
import styles from "./Login.module.scss";

const Login = ({ history, location }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(
        (state) => state.auth
    );

    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        if (isAuthenticated) {
            history.push(redirect);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, isAuthenticated, error, history, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };
    return (
        <Fragment>
            <MetaData title={"Login"} />
            <Navbar />
            <div className={styles.login}>
                <div className={styles.login_container}>
                    <h3 className="text-center text-white mb-3">Login</h3>
                    <form onSubmit={submitHandler}>
                        <div className={styles.from_group}>
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email ..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className={styles.from_group}>
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password ..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles.from_group}>
                            <button type="submit">
                                {loading ? <ButtonLoader /> : "Login"}
                            </button>
                        </div>
                    </form>
                    <div className={styles.from_group}>
                        <p className="text-center text-white">
                            Dont Have Account ?{" "}
                            <Link to="/register">Signup</Link>
                        </p>
                        <p className="text-center text-white">
                            <Link to="/password/forgot">Forgot Password?</Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default Login;
