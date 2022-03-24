import React from "react";
import ProfileLink from "../../components/profileLinks/ProfileLink";
import styles from "./Profile.module.scss";

const Profile = () => {
    return (
        <div className={styles.profile}>
            <div className="container" style={{ marginTop: "85px" }}>
                <div className="row g-3">
                    <div className="col-md-3">
                        <ProfileLink />
                    </div>
                    <div className="col-md-9">2</div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
