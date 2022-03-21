import React, { useEffect } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import { Table } from "react-bootstrap";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import styles from "./ProductsList.module.scss";
import { clearErrors, getAdminProducts } from "../../../actions/productAction";
import Loader from "../../../components/loader/Loader";
import { Link } from "react-router-dom";

import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
const ProductsList = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, history]);
    return (
        <div className={styles.products}>
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
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
                                                        <Link>
                                                            <AiOutlineEye
                                                                size={20}
                                                            />
                                                        </Link>
                                                        <Link>
                                                            <AiOutlineEdit
                                                                size={20}
                                                            />
                                                        </Link>
                                                        <button>
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
