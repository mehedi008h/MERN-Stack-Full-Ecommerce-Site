import React from "react";
import { useAlert } from "react-alert";
import { AiFillStar, AiOutlineEye } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItemToCart } from "../../actions/cartActions";

import styles from "./Products.module.scss";

const Product = ({ product }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const addToCart = () => {
        dispatch(addItemToCart(product._id, 1));
        alert.success("Item Added to Cart");
    };
    return (
        <div className="col-md-4">
            <div className={styles.product}>
                <div className={styles.product_image}>
                    <img src={product?.images[0].url} alt={product?.name} />
                </div>
                <Link to={`/product/${product?._id}`}>
                    <p className={styles.product_name}>{product?.name}</p>
                </Link>
                <div className="d-flex align-items-center justify-content-between mt-5">
                    <div className={styles.product_rating}>
                        <AiFillStar size={20} color={"gold"} />
                        <span className="ms-2">{product?.numOfReviews}</span>
                    </div>
                    <div>
                        <span className="fw-bold">$ {product?.price}</span>
                    </div>
                </div>
                <div className={styles.link_container}>
                    <button onClick={addToCart}>
                        <MdOutlineFavoriteBorder
                            className={styles.icon}
                            size={25}
                        />
                    </button>
                    <Link to={`/product/${product?._id}`}>
                        <AiOutlineEye size={25} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Product;
