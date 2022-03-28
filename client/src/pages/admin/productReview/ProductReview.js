import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    deleteReview,
    getProductReviews,
} from "../../../actions/productAction";
import Sidebar from "../../../components/sidebar/Sidebar";
import { DELETE_REVIEW_RESET } from "../../../constants/productsConstants";
import styles from "./ProductReview.module.scss";

const ProductReview = () => {
    const [productId, setProductId] = useState("");

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, reviews } = useSelector((state) => state.productReviews);
    const { isDeleted, error: deleteError } = useSelector(
        (state) => state.review
    );

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (productId !== "") {
            dispatch(getProductReviews(productId));
        }

        if (isDeleted) {
            alert.success("Review deleted successfully");
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    }, [dispatch, alert, error, productId, isDeleted, deleteError]);

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(id, productId));
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getProductReviews(productId));
    };
    return (
        <div className={styles.review}>
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10" style={{ marginTop: "75px" }}>
                    <div className="row justify-content-center mt-5">
                        <div className="col-5">
                            <form onSubmit={submitHandler}>
                                <div className="form-group">
                                    <label htmlFor="productId_field">
                                        Enter Product ID
                                    </label>
                                    <input
                                        type="text"
                                        id="productId_field"
                                        className="form-control"
                                        value={productId}
                                        onChange={(e) =>
                                            setProductId(e.target.value)
                                        }
                                    />
                                </div>

                                <button
                                    id="search_button"
                                    type="submit"
                                    className="btn btn-primary btn-block py-2"
                                >
                                    SEARCH
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductReview;
