import React from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "./Fashion.module.scss";

const Fashion = ({ products, type }) => {
    const scrollRef = React.useRef(null);

    let data;

    switch (type) {
        case "mens":
            data = {
                title: "Mens's Fashion",
                link: "See all",
            };
            break;
        case "womens":
            data = {
                title: "Womens's Fashion",
                link: "See all",
            };
            break;
        case "kids":
            data = {
                title: "Kids's Fashion",
                link: "See all",
            };
            break;
        default:
            break;
    }
    const scroll = (direction) => {
        const { current } = scrollRef;

        if (direction === "left") {
            current.scrollLeft -= 300;
        } else {
            current.scrollLeft += 300;
        }
    };
    return (
        <div className={styles.fashion}>
            <div className="container mt-5 mb-5">
                <div className="d-flex align-items-center justify-content-between">
                    <h4 className="ms-3">{data.title}</h4>
                    <span>
                        <Link to={"/products"}>{data.link}</Link>
                    </span>
                </div>

                {/* product section  */}

                <div className={styles.products_container}>
                    <div
                        className={styles.products_container_branch}
                        ref={scrollRef}
                    >
                        {products?.map((product, index) => (
                            <div className={styles.item} key={index}>
                                <img
                                    src={product?.images[0].url}
                                    alt={product?.name}
                                />
                                <p className="text-center mt-3">
                                    <Link to={`/product/${product?._id}`}>
                                        {product?.name}
                                    </Link>
                                </p>
                                <p>$ {product?.price}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.app__gallery_images_arrows}>
                        <BsArrowLeftShort
                            className={styles.gallery__arrow_icon}
                            onClick={() => scroll("left")}
                        />
                        <BsArrowRightShort
                            className={styles.gallery__arrow_icon}
                            onClick={() => scroll("right")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Fashion;
