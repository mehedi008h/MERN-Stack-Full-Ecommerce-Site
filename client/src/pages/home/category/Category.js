import React from "react";
import { Link } from "react-router-dom";
import styles from "./Category.module.scss";

const Category = () => {
    const categorys = [
        {
            image: "https://res.cloudinary.com/mehedi08h/image/upload/v1648871045/shopx/21_odgu2m.jpg",
            title: "Mens's Fashion",
            link: <Link to="/">Mens</Link>,
        },
        {
            image: "https://res.cloudinary.com/mehedi08h/image/upload/v1648871046/shopx/20_vtlnkz.jpg",
            title: "Women's Fashion",
            link: <Link to="/">Women</Link>,
        },
        {
            image: "https://res.cloudinary.com/mehedi08h/image/upload/v1648871045/shopx/18_y8o95o.jpg",
            title: "Kid's Fashion",
            link: <Link to="/">Kids</Link>,
        },
        {
            image: "https://res.cloudinary.com/mehedi08h/image/upload/v1648871045/shopx/13_upzdtm.jpg",
            title: "ACCESSORIES'S",
            link: <Link to="/">Accessories</Link>,
        },
    ];
    return (
        <div className={styles.category}>
            <div className="container mb-5 mt-5">
                <div className="row g-3">
                    {categorys.map((item, index) => (
                        <div className="col-md-3 text-center" key={index}>
                            <div className={styles.item}>
                                <img src={item.image} alt={item.title} />

                                <div>
                                    <h4>{item.title}</h4>
                                    <p className="text-center">{item.link}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Category;
