import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { motion } from "framer-motion";

import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="navbar">
      <div className="container d-flex align-items-center justify-content-between">
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
            <li>
              <AiOutlineShoppingCart size={25} />
            </li>
            <li>Profile</li>
            <li>
              <Link to="/login">Login</Link>
            </li>
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
                {["home", "about", "work", "skills", "contact"].map((item) => (
                  <li key={item}>
                    <a href={`#${item}`} onClick={() => setToggle(false)}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
