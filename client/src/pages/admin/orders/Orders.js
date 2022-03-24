import React, { useEffect } from "react";
import { allOrders, clearErrors } from "../../../actions/orderActions";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Orders.module.scss";
import Loader from "../../../components/loader/Loader";
import { Table } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";

const Orders = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector((state) => state.allOrders);

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, history]);

    return (
        <div className={styles.orders}>
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10" style={{ marginTop: "75px" }}>
                    <div className={`${styles.table} container mt-3`}>
                        {loading ? (
                            <>
                                <Loader />
                            </>
                        ) : (
                            <>
                                <Table responsive>
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>No of Items</th>
                                            <th>Amount</th>
                                            <th>Address</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {orders?.map((order) => (
                                            <tr key={order?._id}>
                                                <td>{order?._id}</td>
                                                <td>
                                                    {order.orderItems.length}
                                                </td>
                                                <td>{order?.totalPrice}</td>
                                                <td>
                                                    {order?.shippingInfo.city}
                                                </td>
                                                <td>{order?.orderStatus}</td>
                                                <td className={styles.actions}>
                                                    <Link
                                                        to={`/admin/user/details/${order._id}`}
                                                    >
                                                        <AiOutlineEye
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
                                </Table>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
