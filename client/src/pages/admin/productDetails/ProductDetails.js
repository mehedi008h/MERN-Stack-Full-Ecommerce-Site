import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails } from "../../../actions/productAction";
import Sidebar from "../../../components/admin/sidebar/Sidebar";

import styles from "./ProductDetails.module.scss";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import Navbar from "../../../components/admin/navbar/Navbar";
import MetaData from "../../../components/MetaData";

const ProductDetails = () => {
    const [preview, setPreview] = useState(0);

    const dispatch = useDispatch();
    const alert = useAlert();

    let { id } = useParams();

    const { loading, error, product } = useSelector(
        (state) => state.productDetails
    );

    useEffect(() => {
        dispatch(getProductDetails(id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, id]);
    return (
        <div className={styles.product_details}>
            <MetaData title={"Product Details"} />
            <div className="row g-0">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <Navbar />
                    <div className="container p-3">
                        {loading ? (
                            <div>
                                <Spinner />
                            </div>
                        ) : (
                            <>
                                <div className="row">
                                    <div className="col-md-6">
                                        {product.images && (
                                            <>
                                                <div
                                                    className={
                                                        styles.preview_image
                                                    }
                                                >
                                                    <img
                                                        src={
                                                            product?.images[
                                                                preview
                                                            ].url
                                                        }
                                                        alt=""
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        styles.image_thumbline
                                                    }
                                                >
                                                    {product?.images.map(
                                                        (image, index) => (
                                                            <div
                                                                key={image._id}
                                                            >
                                                                <img
                                                                    src={
                                                                        image.url
                                                                    }
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
                                                        ({product.numOfReviews}{" "}
                                                        Reviews)
                                                    </span>
                                                </div>
                                            </div>
                                            <p>{product?.description}</p>

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
                                                    <b>
                                                        {product.stock > 0
                                                            ? "In Stock"
                                                            : "Out of Stock"}
                                                    </b>
                                                </span>
                                            </p>
                                            {/* stock  */}
                                            <p id="product_seller mb-3">
                                                Stock:
                                                <strong className="ms-2">
                                                    {product.stock}
                                                </strong>
                                            </p>
                                            {/* product seller  */}
                                            <p id="product_seller mb-3">
                                                Sold by:
                                                <strong className="ms-2">
                                                    {product.seller}
                                                </strong>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
