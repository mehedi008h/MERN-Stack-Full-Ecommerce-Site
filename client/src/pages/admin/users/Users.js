import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import { Table } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    allUsers,
    clearErrors,
    deleteUser,
} from "../../../actions/userActions";
import Loader from "../../../components/loader/Loader";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import { DELETE_USER_RESET } from "../../../constants/userConstants";
import styles from "./Users.module.scss";
import Navbar from "../../../components/admin/navbar/Navbar";
import MetaData from "../../../components/MetaData";

const Users = ({ history }) => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, users } = useSelector((state) => state.allUsers);
    const { isDeleted } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(allUsers());

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("User deleted successfully");
            history.push("/admin/users");
            dispatch({ type: DELETE_USER_RESET });
        }
    }, [dispatch, alert, error, isDeleted, history]);

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    };
    return (
        <div className={styles.users}>
            <MetaData title={"All Users"} />
            <div className="row g-0">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <Navbar />
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
                                                    <button
                                                        onClick={() =>
                                                            deleteUserHandler(
                                                                user._id
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
