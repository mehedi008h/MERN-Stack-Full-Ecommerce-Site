import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
    clearErrors,
    loadUser,
    updateProfile,
} from "../../../actions/userActions";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/header/Navbar";
import ButtonLoader from "../../../components/loader/ButtonLoader";
import MetaData from "../../../components/MetaData";
import ProfileLink from "../../../components/profileLinks/ProfileLink";
import { UPDATE_PROFILE_RESET } from "../../../constants/userConstants";
import styles from "./UpdateProfile.module.scss";

const UpdateProfile = ({ history }) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(
        "https://res.cloudinary.com/mehedi08h/image/upload/v1647280872/react-final/auth/logo_wyrs86.png"
    );

    const alert = useAlert();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { error, isUpdated, loading } = useSelector((state) => state.user);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setAddress(user.address);
            setPhone(user.phone);
            setAvatarPreview(user.avatar.url);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("User updated successfully");
            dispatch(loadUser());

            history.push("/me");

            dispatch({
                type: UPDATE_PROFILE_RESET,
            });
        }
    }, [dispatch, user, alert, error, history, isUpdated]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("address", address);
        formData.set("phone", phone);
        formData.set("avatar", avatar);
        console.log(formData);
        dispatch(updateProfile(formData));
    };

    const onChange = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
    };
    return (
        <Fragment>
            <MetaData title={"Update Profile"} />
            <Navbar />
            <div className={styles.update_profile}>
                <div className="container mt-5 mb-3">
                    <div className="row g-3">
                        <div className="col-md-3">
                            <ProfileLink />
                        </div>
                        <div className="col-md-9">
                            <div className={styles.form_container}>
                                <h4 className="text-center mt-3">
                                    Update Profile
                                    <form
                                        className={styles.form}
                                        onSubmit={submitHandler}
                                        encType="multipart/form-data"
                                    >
                                        <div className={styles.from_group}>
                                            <label htmlFor="email_field">
                                                Name
                                            </label>
                                            <input
                                                className="from_input"
                                                name="name"
                                                value={name}
                                                onChange={(e) =>
                                                    setName(e.target.value)
                                                }
                                                type="text"
                                            />
                                        </div>
                                        <div className={styles.from_group}>
                                            <label htmlFor="email_field">
                                                Address
                                            </label>
                                            <input
                                                className="from_input"
                                                name="address"
                                                value={address}
                                                onChange={(e) =>
                                                    setAddress(e.target.value)
                                                }
                                                type="text"
                                            />
                                        </div>
                                        <div className={styles.from_group}>
                                            <label htmlFor="email_field">
                                                Phone
                                            </label>
                                            <input
                                                className="from_input"
                                                name="phone"
                                                value={phone}
                                                onChange={(e) =>
                                                    setPhone(e.target.value)
                                                }
                                                type="number"
                                            />
                                        </div>

                                        <div className={styles.from_group}>
                                            <label htmlFor="avatar_upload">
                                                Avatar
                                            </label>
                                            <div className="d-flex align-items-center">
                                                <div className="mt-3">
                                                    <figure className="avatar mr-3 item-rtl">
                                                        <img
                                                            style={{
                                                                height: "50px",
                                                                width: "50px",
                                                                borderRadius:
                                                                    "50%",
                                                            }}
                                                            src={avatarPreview}
                                                            alt="Avatar Preview"
                                                        />
                                                    </figure>
                                                </div>
                                                <div className="image_file ms-2">
                                                    <input
                                                        type="file"
                                                        name="avatar"
                                                        id="customFile"
                                                        accept="iamges/*"
                                                        onChange={onChange}
                                                    />
                                                    <AiOutlineCloudUpload
                                                        size={20}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.from_group}>
                                            <button>
                                                {loading ? (
                                                    <ButtonLoader />
                                                ) : (
                                                    "Update"
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default UpdateProfile;
