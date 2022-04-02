import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    getUserDetails,
    updateUser,
} from "../../../../actions/userActions";
import Navbar from "../../../../components/admin/navbar/Navbar";
import Sidebar from "../../../../components/admin/sidebar/Sidebar";
import MetaData from "../../../../components/MetaData";
import { UPDATE_USER_RESET } from "../../../../constants/userConstants";

import styles from "./UserDetails.module.scss";

const UserDetails = ({ history, match }) => {
    const [show, setShow] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, isUpdated } = useSelector((state) => state.user);
    const { user } = useSelector((state) => state.userDetails);
    const userId = match.params.id;

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("User updated successfully");
            dispatch({
                type: UPDATE_USER_RESET,
            });

            history.push(`/admin/user/details/${user._id}`);
            setShow(false);
        }
    }, [dispatch, alert, error, history, isUpdated, userId, user]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("role", role);

        dispatch(updateUser(user._id, formData));
    };
    return (
        <div className={styles.user_details}>
            <MetaData title={"User Details"} />
            <div className="row g-0">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <Navbar />
                    <div className="container mt-3 p-3">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div className={styles.user_information}>
                                    <div className="d-flex align-items-center justify-content-between ps-3 pt-3 pe-3">
                                        <h4>User Informations</h4>

                                        {/* User update modal button  */}
                                        <button
                                            onClick={() =>
                                                setShow(show ? false : true)
                                            }
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <hr />
                                    <div className="row g-3">
                                        <div className="col-md-6 p-3">
                                            <div className="text-center">
                                                {user && (
                                                    <img
                                                        style={{
                                                            height: "150px",
                                                            width: "150px",
                                                            borderRadius: "50%",
                                                        }}
                                                        src={user?.avatar?.url}
                                                        alt=""
                                                    />
                                                )}
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <p>
                                                <strong>Name :</strong>
                                                <span className="ms-3">
                                                    {user?.name}
                                                </span>
                                            </p>
                                            <p>
                                                <strong>Email :</strong>
                                                <span className="ms-3">
                                                    {user?.email}
                                                </span>
                                            </p>
                                            <p>
                                                <strong>Phone :</strong>
                                                <span className="ms-3">
                                                    {user?.phone}
                                                </span>
                                            </p>
                                            <p>
                                                <strong>Address :</strong>
                                                <span className="ms-3">
                                                    {user?.address}
                                                </span>
                                            </p>
                                            <p>
                                                <strong>Role :</strong>
                                                <span className="ms-3">
                                                    {user?.role}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h4 className="text-center">Chart</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* User update modal  */}
            {show && (
                <>
                    <div className={styles.modal}>
                        <h4 className="text-center">Update User Information</h4>

                        <form onSubmit={submitHandler}>
                            <div className={styles.from_group}>
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="name"
                                    id="name_field"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className={styles.from_group}>
                                <label htmlFor="email_field">Email</label>
                                <input
                                    type="email"
                                    id="email_field"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className={styles.from_group}>
                                <label htmlFor="role_field">Role</label>

                                <select
                                    id="role_field"
                                    name="role"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                </select>
                            </div>

                            <div className={styles.from_group}>
                                <button type="submit">Update</button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default UserDetails;
