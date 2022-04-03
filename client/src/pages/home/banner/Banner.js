import React from "react";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

import styles from "./Banner.module.scss";

const Banner = () => {
    return (
        <div className={styles.banner}>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className={styles.swiper1}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className={styles.slider_text}>
                                        <p>SPRING / SUMMER COLLECTION 2022</p>
                                        <h1>Get up to 30% off New Arrivals</h1>
                                        <div>
                                            <Link to="/products">Shop now</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className={styles.slider_image}>
                                        {/* <img
                                            src="https://res.cloudinary.com/mehedi08h/image/upload/v1648962832/shopx/banner/pngwing.com_1_tnmrcd.png"
                                            alt=""
                                        /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.swiper2}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className={styles.slider_text}>
                                        <p>SPRING / SUMMER COLLECTION 2022</p>
                                        <h1>Get up to 30% off New Arrivals</h1>
                                        <div>
                                            <Link to="/products">Shop now</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className={styles.slider_image}>
                                        {/* <img
                                            src="https://res.cloudinary.com/mehedi08h/image/upload/v1648963108/shopx/banner/khaled-ghareeb-n84s3jgzhKk-unsplash-removebg-preview_s3czdz.png"
                                            alt=""
                                        /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;
