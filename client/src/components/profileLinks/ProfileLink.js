import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
import styles from "./ProfileLink.module.scss";
import { AiOutlineEdit, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdFavoriteBorder } from "react-icons/md";

const ProfileLink = () => {
    const { user, loading } = useSelector((state) => state.auth);
    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <div className={styles.profile_links}>
                        <div className="text-center mt-3">
                            {user && (
                                <img src={user.avatar.url} alt={user?.name} />
                            )}

                            <h4 className="mt-3">{user?.name}</h4>
                            <p>{user?.email}</p>
                        </div>
                        <hr className="text-primary" />

                        <div className={`mt-3 ${styles.links}`}>
                            <Link to="/me">
                                <AiOutlineUser className="me-3" size={25} />{" "}
                                Profile
                            </Link>
                            <Link to="/me/update">
                                <AiOutlineEdit className="me-3" size={25} />{" "}
                                Edit Profile
                            </Link>
                            <Link to="/me/password">
                                <RiLockPasswordLine
                                    className="me-3"
                                    size={25}
                                />
                                Password
                            </Link>
                            <Link to="/me/password">
                                <MdFavoriteBorder className="me-3" size={25} />
                                My Order
                            </Link>
                            <button>
                                <AiOutlineLogout className="me-3" size={25} />
                                Logout
                            </button>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

export default ProfileLink;
