import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProducts } from "../../actions/productAction";
import Product from "./Product";
import { Spinner } from "react-bootstrap";

import styles from "./Products.module.scss";

const Products = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector((state) => state.products);

    console.log(products);

    useEffect(() => {
        dispatch(getProducts());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error]);
    return (
        <Fragment>
            {loading ? (
                <>
                    <div className={styles.spinner}>
                        <Spinner animation="border" />
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.products}>
                        <div
                            className="container"
                            style={{ marginTop: "80px" }}
                        >
                            <div className="row g-3">
                                <div className="col-md-3">
                                    <h1>1</h1>
                                </div>
                                <div className="col-md-9">
                                    <div className="row g-5">
                                        {products &&
                                            products.map((product) => (
                                                <Product
                                                    key={product._id}
                                                    product={product}
                                                />
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Fragment>
    );
};

export default Products;
