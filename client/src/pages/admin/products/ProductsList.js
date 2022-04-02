import React, { useEffect } from "react";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { Table } from "react-bootstrap";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import styles from "./ProductsList.module.scss";
import {
    clearErrors,
    deleteProduct,
    getAdminProducts,
} from "../../../actions/productAction";
import Loader from "../../../components/loader/Loader";
import { Link } from "react-router-dom";

import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { DELETE_PRODUCT_RESET } from "../../../constants/productsConstants";
import Navbar from "../../../components/admin/navbar/Navbar";
import MetaData from "../../../components/MetaData";
const ProductsList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted } = useSelector(
        (state) => state.product
    );

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Product deleted successfully");
            history.push("/admin/products");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, deleteError, isDeleted, history]);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    };
    return (
        <div className={styles.products}>
            <MetaData title={"All Products"} />
            <div className="row g-0">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <Navbar />
                    <div className={`${styles.table} container mt-3`}>
                        <div>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <>
                                        <Loader />
                                    </>
                                ) : (
                                    <>
                                        <tbody>
                                            {products?.map((product) => (
                                                <tr key={product?._id}>
                                                    <td>{product?._id}</td>
                                                    <td>
                                                        <img
                                                            style={{
                                                                height: "40px",
                                                                width: "40px",
                                                            }}
                                                            src={
                                                                product
                                                                    ?.images[0]
                                                                    .url
                                                            }
                                                            alt={product?.name}
                                                        />
                                                    </td>
                                                    <td>{product?.name}</td>
                                                    <td>{product?.price}</td>
                                                    <td>{product?.stock}</td>
                                                    <td
                                                        className={
                                                            styles.actions
                                                        }
                                                    >
                                                        <Link
                                                            to={`/admin/product/details/${product._id}`}
                                                        >
                                                            <AiOutlineEye
                                                                size={20}
                                                            />
                                                        </Link>
                                                        <Link
                                                            to={`/admin/product/${product._id}`}
                                                        >
                                                            <AiOutlineEdit
                                                                size={20}
                                                            />
                                                        </Link>
                                                        <button
                                                            onClick={() =>
                                                                deleteProductHandler(
                                                                    product._id
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
                                    </>
                                )}
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsList;
