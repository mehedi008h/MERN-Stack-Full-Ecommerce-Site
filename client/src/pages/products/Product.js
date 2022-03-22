import React from "react";
import { AiFillStar, AiOutlineEye } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";

import styles from "./Products.module.scss";

const Product = ({ product }) => {
    return (
        <div className="col-md-4">
            <div className={styles.product}>
                <div className={styles.product_image}>
                    <img src={product?.images[0].url} alt={product?.name} />
                </div>
                <Link>{product?.name}</Link>
                <div className="d-flex align-items-center justify-content-between mt-3">
                    <div className={styles.product_rating}>
                        <AiFillStar size={20} color={"gold"} />
                        <span className="ms-2">{product?.numOfReviews}</span>
                    </div>
                    <div>
                        <p className="fw-bold">$ {product?.price}</p>
                    </div>
                </div>
                <div className={styles.link_container}>
                    <button>
                        <MdOutlineFavoriteBorder
                            className={styles.icon}
                            size={25}
                        />
                    </button>
                    <Link>
                        <AiOutlineEye size={25} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;
