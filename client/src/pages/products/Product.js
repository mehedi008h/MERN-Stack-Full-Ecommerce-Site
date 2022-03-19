import React from "react";
import { AiFillStar } from "react-icons/ai";

import styles from "./Products.module.scss";

const Product = ({ product }) => {
    return (
        <div className={styles.product}>
            <div>
                <img src={product?.images[0].url} alt="" />
            </div>
            <h4 className="text-center">{product?.name}</h4>
            <div>
                <AiFillStar size={20} /> <span>{product?.numOfReviews}</span>
            </div>
        </div>
    );
};

export default Product;
