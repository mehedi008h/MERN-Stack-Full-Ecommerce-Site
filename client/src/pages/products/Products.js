import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productAction";
import Product from "./Product";
import { Spinner } from "react-bootstrap";
import { BsFilter } from "react-icons/bs";

import styles from "./Products.module.scss";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import MetaData from "../../components/MetaData";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Products = ({ match }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([1, 1000]);
    const [category, setCategory] = useState("");
    const [rating, setRating] = useState(0);

    const categories = [
        "Eid Collection",
        "New Collection",
        "Featured",
        "Footwear",
        "Accessories",
        "Clothing",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Other",
    ];

    const alert = useAlert();
    const dispatch = useDispatch();

    const {
        loading,
        products,
        error,
        productsCount,
        resPerPage,
        filteredProductsCount,
    } = useSelector((state) => state.products);

    const keyword = match.params.keyword;

    useEffect(() => {
        if (error) {
            return alert.error(error);
        }

        dispatch(getProducts(keyword, currentPage, price, category, rating));
    }, [dispatch, alert, error, keyword, currentPage, price, category, rating]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber);
    }

    let count = productsCount;
    if (keyword) {
        count = filteredProductsCount;
    }
    return (
        <Fragment>
            <MetaData title={"All Products"} />
            <Navbar />
            {loading ? (
                <>
                    <div className={styles.spinner}>
                        <Spinner animation="border" />
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.products}>
                        <div
                            className="container mb-5"
                            style={{ marginTop: "30px" }}
                        >
                            <div className="row g-3">
                                <div className="col-md-3 pe-5">
                                    <div className={styles.filter}>
                                        <p>
                                            <BsFilter
                                                size={30}
                                                className="me-3"
                                            />
                                            Filter
                                        </p>

                                        <div
                                            style={{
                                                marginTop: "70px",
                                                paddingRight: "15px",
                                                paddingLeft: "15px",
                                            }}
                                        >
                                            <Range
                                                marks={{
                                                    1: `$1`,
                                                    1000: `$1000`,
                                                }}
                                                min={1}
                                                max={1000}
                                                defaultValue={[1, 1000]}
                                                tipFormatter={(value) =>
                                                    `$${value}`
                                                }
                                                tipProps={{
                                                    placement: "top",
                                                    visible: true,
                                                }}
                                                value={price}
                                                onChange={(price) =>
                                                    setPrice(price)
                                                }
                                            />

                                            <hr className="mt-5 text-primary" />

                                            <div className="mt-3">
                                                <h4 className="mb-3">
                                                    Categories
                                                </h4>

                                                <div
                                                    className={
                                                        styles.categories
                                                    }
                                                >
                                                    {categories.map(
                                                        (category) => (
                                                            <li
                                                                style={{
                                                                    cursor: "pointer",
                                                                    listStyleType:
                                                                        "none",
                                                                }}
                                                                key={category}
                                                                onClick={() =>
                                                                    setCategory(
                                                                        category
                                                                    )
                                                                }
                                                            >
                                                                {category}
                                                            </li>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            <hr className="my-3" />

                                            <div className="mt-5">
                                                <h4 className="mb-3">
                                                    Ratings
                                                </h4>

                                                <div className="pl-0">
                                                    {[5, 4, 3, 2, 1].map(
                                                        (star) => (
                                                            <li
                                                                style={{
                                                                    cursor: "pointer",
                                                                    listStyleType:
                                                                        "none",
                                                                    margin: "2px 0",
                                                                }}
                                                                key={star}
                                                                onClick={() =>
                                                                    setRating(
                                                                        star
                                                                    )
                                                                }
                                                            >
                                                                <div className="rating-outer">
                                                                    <div
                                                                        className="rating-inner"
                                                                        style={{
                                                                            width: `${
                                                                                star *
                                                                                20
                                                                            }%`,
                                                                        }}
                                                                    ></div>
                                                                </div>
                                                            </li>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <div className="row g-3">
                                        {products &&
                                            products.map((product) => (
                                                <Product
                                                    key={product._id}
                                                    product={product}
                                                />
                                            ))}
                                    </div>
                                    {resPerPage <= count && (
                                        <div className="d-flex justify-content-center mt-5">
                                            <Pagination
                                                activePage={currentPage}
                                                itemsCountPerPage={resPerPage}
                                                totalItemsCount={productsCount}
                                                onChange={setCurrentPageNo}
                                                nextPageText={"Next"}
                                                prevPageText={"Prev"}
                                                firstPageText={"First"}
                                                lastPageText={"Last"}
                                                itemClass="page-item"
                                                linkClass="page-link"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
            <Footer />
        </Fragment>
    );
};

export default Products;
