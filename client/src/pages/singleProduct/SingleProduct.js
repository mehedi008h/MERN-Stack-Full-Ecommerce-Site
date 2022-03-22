import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import Loader from "../../components/loader/Loader";
import styles from "./SingleProduct.module.scss";

const SingleProduct = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    let { id } = useParams();

    const { loading, error, product } = useSelector(
        (state) => state.productDetails
    );

    const [preview, setPreview] = useState(0);

    useEffect(() => {
        dispatch(getProductDetails(id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, id]);
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
                                <div className={styles.preview_image}>
                                    <img
                                        src={product?.images[preview].url}
                                        alt=""
                                    />
                                </div>
                                <div className={styles.image_thumbline}>
                                    {product?.images.map((image, index) => (
                                        <div key={image._id}>
                                            <img
                                                src={image.url}
                                                onClick={() =>
                                                    setPreview(index)
                                                }
                                                alt=""
                                            />
                                        </div>
                                    ))}
                                </div>
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
