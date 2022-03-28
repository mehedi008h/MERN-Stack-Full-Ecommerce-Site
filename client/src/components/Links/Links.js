import React from "react";
import { Link } from "react-router-dom";
import styles from "./Links.module.scss";

const Links = () => {
    return (
        <div className={styles.links}>
            <Link to="/">Home </Link>
            <Link to="/products">Products </Link>
            <Link to="/contact">Contact </Link>
            <Link to="/about">About </Link>
        </div>
    );
};

export default Links;
