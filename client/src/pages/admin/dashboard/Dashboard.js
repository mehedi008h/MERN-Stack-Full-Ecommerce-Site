import React from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
    return (
        <div className={styles.dashboard}>
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <h1>2</h1>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
