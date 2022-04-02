import React, { Fragment } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/header/Navbar";
import Banner from "./banner/Banner";
import Category from "./category/Category";

const Home = () => {
    return (
        <Fragment>
            <Navbar />
            <Banner />
            <Category />
            <Footer />
        </Fragment>
    );
};

export default Home;
