import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { Table } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allUsers, clearErrors } from "../../../actions/userActions";
import Loader from "../../../components/loader/Loader";
import Sidebar from "../../../components/sidebar/Sidebar";
import styles from "./Users.module.scss";

const Users = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, users } = useSelector((state) => state.allUsers);

    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, history]);
    console.log(users);
    return (
        <div className={styles.users}>
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
                                            <th>ID</th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Role</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {users?.map((user) => (
                                            <tr key={user?._id}>
                                                <td>{user?._id}</td>
                                                <td>
                                                    <img
                                                        style={{
                                                            height: "40px",
                                                            width: "40px",
                                                        }}
                                                        src={user?.avatar.url}
                                                        alt={user?.name}
                                                    />
                                                </td>
                                                <td>{user?.name}</td>
                                                <td>{user?.email}</td>
                                                <td>{user?.role}</td>
                                                <td className={styles.actions}>
                                                    <Link
                                                        to={`/admin/user/details/${user._id}`}
                                                    >
                                                        <AiOutlineEye
                                                            size={20}
                                                        />
                                                    </Link>
                                                    <Link
                                                        to={`/admin/user/${user._id}`}
                                                    >
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
                                </Table>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
