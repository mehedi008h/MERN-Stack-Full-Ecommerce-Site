import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import Loader from "../../components/loader/Loader";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import styles from "./SingleProduct.module.scss";
import { addItemToCart } from "../../actions/cartActions";

const SingleProduct = () => {
    const [quantity, setQuantity] = useState(1);
    const [preview, setPreview] = useState(0);

    const dispatch = useDispatch();
    const alert = useAlert();

    let { id } = useParams();

    const { loading, error, product } = useSelector(
        (state) => state.productDetails
    );

    const increaseQty = () => {
        const count = document.querySelector(".count");

        if (count.valueAsNumber >= product.stock) return;

        const qty = count.valueAsNumber + 1;
        setQuantity(qty);
    };

    const decreaseQty = () => {
        const count = document.querySelector(".count");

        if (count.valueAsNumber <= 1) return;

        const qty = count.valueAsNumber - 1;
        setQuantity(qty);
    };

    useEffect(() => {
        dispatch(getProductDetails(id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, id]);

    const addToCart = () => {
        dispatch(addItemToCart(id, quantity));
        alert.success("Item Added to Cart");
    };
    return (
        <div className={styles.product_details}>
            {loading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>
                    <div className="container mt-3">
                        <div className="row">
                            <div className="col-md-6">
                                {product.images && (
                                    <>
                                        <div className={styles.preview_image}>
                                            <img
                                                src={
                                                    product?.images[preview].url
                                                }
                                                alt=""
                                            />
                                        </div>
                                        <div className={styles.image_thumbline}>
                                            {product?.images.map(
                                                (image, index) => (
                                                    <div key={image._id}>
                                                        <img
                                                            src={image.url}
                                                            onClick={() =>
                                                                setPreview(
                                                                    index
                                                                )
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="col-md-6">
                                <div className={styles.Product_info}>
                                    <h4>{product?.name}</h4>
                                    <div className="d-flex align-items-center mt-3">
                                        <h4>$ {product?.price}</h4>
                                        <div className="ms-5">
                                            <div className="rating-outer">
                                                <div
                                                    className="rating-inner"
                                                    style={{
                                                        width: `${
                                                            (product.ratings /
                                                                5) *
                                                            100
                                                        }%`,
                                                    }}
                                                ></div>
                                            </div>
                                            <span id="no_of_reviews">
                                                ({product.numOfReviews} Reviews)
                                            </span>
                                        </div>
                                    </div>
                                    <p>{product?.description}</p>
                                    <div>
                                        <label htmlFor="color_field">
                                            Colors
                                        </label>
                                        <div></div>
                                    </div>
                                    {/* stock counter  */}
                                    <div className={styles.stock_counter}>
                                        <span
                                            className="minus"
                                            onClick={decreaseQty}
                                        >
                                            <AiOutlineMinus />
                                        </span>

                                        <input
                                            className="count"
                                            type="number"
                                            value={quantity}
                                            readOnly
                                        />

                                        <span
                                            className="plus"
                                            onClick={increaseQty}
                                        >
                                            <AiOutlinePlus />
                                        </span>
                                    </div>
                                    {/* stock status  */}
                                    <p className="mt-3">
                                        Status:
                                        <span
                                            id="stock_status"
                                            className={
                                                product.stock > 0
                                                    ? "greenColor ms-2"
                                                    : "redColor ms-2"
                                            }
                                        >
                                            {product.stock > 0
                                                ? "In Stock"
                                                : "Out of Stock"}
                                        </span>
                                    </p>
                                    {/* product seller  */}
                                    <p id="product_seller mb-3">
                                        Sold by:
                                        <strong className="ms-2">
                                            {product.seller}
                                        </strong>
                                    </p>
                                    {/* butoon  */}
                                    <div className={styles.button}>
                                        <button
                                            disabled={product.stock === 0}
                                            onClick={addToCart}
                                        >
                                            Add To Cart
                                        </button>
                                        <button>Buy Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SingleProduct;
