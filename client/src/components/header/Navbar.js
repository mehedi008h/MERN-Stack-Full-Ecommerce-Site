import React, { useEffect, useState } from "react";
import {
    AiOutlineLogout,
    AiOutlineShoppingCart,
    AiOutlineUser,
} from "react-icons/ai";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

import "./Navbar.scss";
import { Link, Route } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userActions";
import Announcement from "../announcement/Announcement";
import Search from "./Search";
import Links from "../Links/Links";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const { user, loading } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);

    // Sticky Menu Area
    useEffect(() => {
        window.addEventListener("scroll", isSticky);
        return () => {
            window.removeEventListener("scroll", isSticky);
        };
    });

    /* Method that will fix header after a specific scrollable */
    const isSticky = (e) => {
        const header = document.querySelector(".links");
        const scrollTop = window.scrollY;
        scrollTop >= 150
            ? header.classList.add("is-sticky")
            : header.classList.remove("is-sticky");
    };

    const alert = useAlert();
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(logout());
        alert.success("Logged out successfully.");
    };
    return (
        <div className="nav_container">
            <Announcement />
            <nav className="navbar">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <img
                            style={{ height: "50px" }}
                            src="https://res.cloudinary.com/mehedi08h/image/upload/v1648446111/shopx/logo2_diozsh.png"
                            alt=""
                        />
                    </div>
                    <div className="search">
                        <Route
                            render={({ history }) => (
                                <Search history={history} />
                            )}
                        />

                        {/* <ul className="d-flex align-items-center">
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/products">Product</Link>
                            </li>
                            <li>About</li>
                            <li>Contact</li>
                        </ul> */}
                    </div>
                    <div className="nav_links">
                        <ul className="d-flex align-items-center">
                            <li className="cart">
                                <Link to="/cart">
                                    <AiOutlineShoppingCart
                                        className="icon"
                                        size={25}
                                    />
                                    <span>{cartItems?.length}</span>
                                </Link>
                            </li>
                            {loading ? (
                                <>
                                    <Spinner
                                        animation="border"
                                        className="mt-2"
                                    />
                                </>
                            ) : (
                                <>
                                    {user ? (
                                        <>
                                            <li>
                                                <img
                                                    style={{
                                                        height: "50px",
                                                        width: "50px",
                                                        borderRadius: "50%",
                                                        border: "2px solid black",
                                                    }}
                                                    src={user?.avatar?.url}
                                                    alt={user?.name}
                                                />
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => {
                                                        dropdown
                                                            ? setDropdown(false)
                                                            : setDropdown(true);
                                                    }}
                                                >
                                                    {user?.name}
                                                </button>
                                            </li>
                                            {dropdown && (
                                                <div className="dropdown">
                                                    <Link
                                                        to="/me"
                                                        onClick={() =>
                                                            setDropdown(false)
                                                        }
                                                    >
                                                        <AiOutlineUser
                                                            size={20}
                                                            className="me-3"
                                                        />
                                                        Profile
                                                    </Link>
                                                    {user?.role === "admin" && (
                                                        <>
                                                            <Link
                                                                to="/admin"
                                                                onClick={() =>
                                                                    setDropdown(
                                                                        false
                                                                    )
                                                                }
                                                            >
                                                                <MdOutlineDashboard
                                                                    size={20}
                                                                    className="me-3"
                                                                />
                                                                Dashboard
                                                            </Link>
                                                        </>
                                                    )}
                                                    <Link
                                                        to="/profile"
                                                        id="logout"
                                                        onClick={logoutHandler}
                                                    >
                                                        <AiOutlineLogout
                                                            size={20}
                                                            className="me-3"
                                                        />
                                                        Logout
                                                    </Link>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <>
                                            <li>
                                                <Link to="/login">Login</Link>
                                            </li>
                                        </>
                                    )}
                                </>
                            )}
                        </ul>
                    </div>
                    <div className="app__navbar-menu">
                        <HiMenuAlt3 onClick={() => setToggle(true)} />

                        {toggle && (
                            <motion.div
                                whileInView={{ x: [300, 0] }}
                                transition={{ duration: 0.85, ease: "easeOut" }}
                            >
                                <HiX onClick={() => setToggle(false)} />
                                <ul>
                                    <li>
                                        <Link
                                            to="/"
                                            onClick={() => setToggle(false)}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/products"
                                            onClick={() => setToggle(false)}
                                        >
                                            Products
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/contact"
                                            onClick={() => setToggle(false)}
                                        >
                                            Contact
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/about"
                                            onClick={() => setToggle(false)}
                                        >
                                            About
                                        </Link>
                                    </li>
                                </ul>
                            </motion.div>
                        )}
                    </div>
                </div>
            </nav>
            <div className="links">
                <Links />
            </div>
        </div>
    );
};

export default Navbar;
