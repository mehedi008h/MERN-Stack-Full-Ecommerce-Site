import React, { useState } from "react";
import {
    AiOutlineLogout,
    AiOutlineShoppingCart,
    AiOutlineUser,
} from "react-icons/ai";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";

import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [dropdown, setDropdown] = useState(false);
    const { user, loading } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    return (
        <nav className="navbar">
            <div className="container">
                <div>
                    <h3 className="text-white">ShopX</h3>
                </div>
                <div className="nav_links">
                    <ul className="d-flex align-items-center">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/products">Product</Link>
                        </li>
                        <li>About</li>
                        <li>Contact</li>
                    </ul>
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
                                <Spinner animation="border" className="mt-2" />
                            </>
                        ) : (
                            <>
                                {user ? (
                                    <>
                                        <li>
                                            <img
                                                style={{
                                                    height: "45px",
                                                    width: "45px",
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
                                                    to="/profile"
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
                                                <Link
                                                    to="/profile"
                                                    id="logout"
                                                    onClick={() =>
                                                        setDropdown(false)
                                                    }
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
                                {[
                                    "home",
                                    "about",
                                    "work",
                                    "skills",
                                    "contact",
                                ].map((item) => (
                                    <li key={item}>
                                        <a
                                            href={`#${item}`}
                                            onClick={() => setToggle(false)}
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
