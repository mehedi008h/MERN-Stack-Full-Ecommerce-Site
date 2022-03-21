import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineDashboard, MdOutlineFavoriteBorder } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { FiPlusSquare } from "react-icons/fi";

import styles from "./Sidebar.module.scss";
import { HiTemplate } from "react-icons/hi";
import { AiFillStar } from "react-icons/ai";

const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <div>
                <span>Main</span>
                <div className="mt-1">
                    <li>
                        <Link to="/admin">
                            <MdOutlineDashboard className="me-3" size={25} />
                            Dashboard
                        </Link>
                    </li>
                </div>
            </div>
            <div>
                <span>List</span>
                <div className="mt-1">
                    <li>
                        <Link to="/admin/products">
                            <HiTemplate className="me-3" size={25} /> Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/orders">
                            <MdOutlineFavoriteBorder
                                className="me-3"
                                size={25}
                            />
                            Orders
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/orders">
                            <BiUserCircle className="me-3" size={25} />
                            Users
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/orders">
                            <AiFillStar className="me-3" size={25} />
                            Reviews
                        </Link>
                    </li>
                </div>
            </div>
            <div>
                <span>Service</span>
                <div className="mt-1">
                    <li>
                        <Link to="/admin/product/new">
                            <FiPlusSquare className="me-3" size={25} />
                            Add Product
                        </Link>
                    </li>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
