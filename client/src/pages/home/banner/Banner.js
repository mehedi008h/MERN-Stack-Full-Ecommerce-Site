import React from "react";
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
                    <div className={styles.swiper}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className={styles.slider_text}>
                                        <p>SPRING / SUMMER COLLECTION 2022</p>
                                        <h1>
                                            Get up to 30% off <br /> New
                                            Arrivals
                                        </h1>
                                        <button>Shop now</button>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className={styles.slider_image}>
                                        <img src="" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={styles.swiper}>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className={styles.slider_text}>
                                        <p>SPRING / SUMMER COLLECTION 2022</p>
                                        <h1>
                                            Get up to 30% off <br /> New
                                            Arrivals
                                        </h1>
                                        <button>Shop now</button>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className={styles.slider_image}>
                                        <img src="" alt="" />
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
