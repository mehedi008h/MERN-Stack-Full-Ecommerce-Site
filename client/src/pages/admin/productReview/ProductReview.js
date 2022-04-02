import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Table } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    deleteReview,
    getProductReviews,
} from "../../../actions/productAction";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import MetaData from "../../../components/MetaData";
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
            <MetaData title={"Product Review"} />
            <div className="row g-0">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <Navbar />
                    <div className="row justify-content-center p-3">
                        <div className="col-5">
                            <form onSubmit={submitHandler}>
                                <div className={styles.form_group}>
                                    <label htmlFor="productId_field">
                                        Enter Product ID
                                    </label>
                                    <input
                                        type="text"
                                        id="productId_field"
                                        value={productId}
                                        onChange={(e) =>
                                            setProductId(e.target.value)
                                        }
                                    />
                                </div>

                                <div className={styles.form_group}>
                                    <button id="search_button" type="submit">
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>

                        {reviews && reviews.length > 0 ? (
                            <div div className="p-3 mt-3">
                                {/* table  */}
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Review ID</th>
                                            <th>Rating</th>
                                            <th>Comment</th>
                                            <th>Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {reviews?.map((review) => (
                                            <tr key={review?._id}>
                                                <td>{review?._id}</td>

                                                <td>{review.rating}</td>
                                                <td>{review.comment}</td>
                                                <td>{review.name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-outline-danger btn-sm"
                                                        onClick={() =>
                                                            deleteReviewHandler(
                                                                review._id
                                                            )
                                                        }
                                                    >
                                                        <AiOutlineDelete
                                                            size={20}
                                                        />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        ) : (
                            <p className="mt-5 text-center">No Reviews.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductReview;
