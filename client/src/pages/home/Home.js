import React, { Fragment, useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../actions/productAction";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/header/Navbar";
import Loader from "../../components/loader/Loader";
import MetaData from "../../components/MetaData";
import Banner from "./banner/Banner";
import Category from "./category/Category";
import Fashion from "./fashion/Fashion";

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    // filter products by types

    const mens = products.filter((item) => item.type === "Men");
    const womens = products.filter((item) => item.type === "Women");
    const kids = products.filter((item) => item.type === "Kids");

    useEffect(() => {
        dispatch(getAdminProducts());

        if (error) {
            return alert.error(error);
        }
    }, [dispatch, alert, error]);
    return (
        <Fragment>
            <MetaData title={"Home"} />
            <Navbar />
            <Banner />
            <Category />
            {loading ? (
                <>
                    <Loader />
                </>
            ) : (
                <>
                    <Fashion products={mens} type="mens" />
                    <Fashion products={womens} type="womens" />
                    <Fashion products={kids} type="kids" />
                </>
            )}

            <Footer />
        </Fragment>
    );
};

export default Home;
