import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails } from "../../../actions/productAction";
import Sidebar from "../../../components/sidebar/Sidebar";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";

import styles from "./ProductDetails.module.scss";

const ProductDetails = ({ match }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, product } = useSelector(
        (state) => state.productDetails
    );
    const { name, images } = product;
    let imageLength = images.length;
    useEffect(() => {
        dispatch(getProductDetails(match.params.id));

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, match.params.id]);
    return (
        <div className={styles.product_details}>
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <div className="container mt-3">
                        <div class="row">
                            <div className="col-md-6">
                                <h3>{name}</h3>
                                <div>
                                    <p>{product.category}</p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div>
                                    <Swiper
                                        style={{
                                            "--swiper-navigation-color": "#fff",
                                            "--swiper-pagination-color": "#fff",
                                        }}
                                        loop={true}
                                        spaceBetween={10}
                                        navigation={true}
                                        thumbs={{ swiper: thumbsSwiper }}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className={styles.image_preivew}
                                    >
                                        {images.map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    style={{
                                                        height: "300px",
                                                        width: "450px",
                                                        objectFit: "cover",
                                                    }}
                                                    src={image.url}
                                                    alt={image._id}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        loop={true}
                                        spaceBetween={10}
                                        slidesPerView={imageLength}
                                        freeMode={true}
                                        watchSlidesProgress={true}
                                        modules={[FreeMode, Navigation, Thumbs]}
                                        className={styles.image_container}
                                    >
                                        {images.map((image, index) => (
                                            <SwiperSlide key={index}>
                                                <img
                                                    style={{
                                                        height: "50px",
                                                        width: "70px",
                                                        objectFit: "cover",
                                                    }}
                                                    src={image.url}
                                                    alt={image._id}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
