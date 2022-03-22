import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails } from "../../../actions/productAction";
import Sidebar from "../../../components/sidebar/Sidebar";

import styles from "./ProductDetails.module.scss";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const ProductDetails = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    let { id } = useParams();

    const { loading, error, product } = useSelector(
        (state) => state.productDetails
    );
    const { name, images } = product;
    useEffect(() => {
        dispatch(getProductDetails(id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, id]);
    return (
        <div className={styles.product_details}>
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10" style={{ marginTop: "75px" }}>
                    <div className="container mt-3">
                        {loading ? (
                            <div>
                                <Spinner />
                            </div>
                        ) : (
                            <>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h3>{name}</h3>
                                        <div>
                                            <p>{product.category}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div></div>
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
