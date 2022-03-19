import React from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";

const Login = () => {
    return (
        <div className={styles.login}>
            <div className={styles.login_container}>
                <h3 className="text-center text-white mb-3">Login</h3>
                <div className={styles.from_group}>
                    <label htmlFor="email_field">Email</label>
                    <input type="email" placeholder="Enter your email ..." />
                </div>
                <div className={styles.from_group}>
                    <label htmlFor="password_field">Password</label>
                    <input
                        type="password"
                        placeholder="Enter your password ..."
                    />
                </div>
                <div className={styles.from_group}>
                    <button>Login</button>
                </div>
                <div className={styles.from_group}>
                    <p className="text-center text-white">
                        Dont Have Account ? <Link to="/register">Signup</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
