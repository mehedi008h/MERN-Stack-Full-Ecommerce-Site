import React from "react";
import Navbar from "../../../components/admin/navbar/Navbar";
import Sidebar from "../../../components/admin/sidebar/Sidebar";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
    return (
        <div className={styles.dashboard}>
            <div className="row g-0">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <Navbar />
                    <h1>2</h1>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
