import React, { Fragment } from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/header/Navbar";

const Home = () => {
    return (
        <Fragment>
            <Navbar />
            <div>
                <h1>Home</h1>
            </div>
            <Footer />
        </Fragment>
    );
};

export default Home;
