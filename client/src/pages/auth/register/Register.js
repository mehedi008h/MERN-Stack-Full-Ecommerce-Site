import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearErrors, register } from "../../../actions/userActions";
import Footer from "../../../components/footer/Footer";
import Navbar from "../../../components/header/Navbar";
import ButtonLoader from "../../../components/loader/ButtonLoader";
import MetaData from "../../../components/MetaData";
import styles from "./Register.module.scss";

const Register = ({ history }) => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = user;

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(
        "https://res.cloudinary.com/mehedi08h/image/upload/v1647280872/react-final/auth/logo_wyrs86.png"
    );

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isAuthenticated) {
            history.push("/");
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, isAuthenticated, error, history]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("password", password);
        formData.set("avatar", avatar);
        dispatch(register(formData));
    };

    const onChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };

            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({ ...user, [e.target.name]: e.target.value });
        }
    };

    return (
        <Fragment>
            <MetaData title={"Register"} />
            <Navbar />
            <div className={styles.login}>
                <div className={styles.login_container}>
                    <h3 className="text-center text-white mb-3">Register</h3>
                    <form
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                    >
                        <div className={styles.from_group}>
                            <label htmlFor="anme_field">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name ..."
                                name="name"
                                value={name}
                                onChange={onChange}
                            />
                        </div>
                        <div className={styles.from_group}>
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email ..."
                                name="email"
                                value={email}
                                onChange={onChange}
                            />
                        </div>
                        <div className={styles.from_group}>
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password ..."
                                name="password"
                                value={password}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="avatar_upload">Avatar</label>
                            <div className="d-flex align-items-center">
                                <div className="mt-3">
                                    <figure className="avatar mr-3 item-rtl">
                                        <img
                                            style={{
                                                height: "50px",
                                                width: "50px",
                                                borderRadius: "50%",
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
                                    <AiOutlineCloudUpload size={20} />
                                </div>
                            </div>
                        </div>
                        <div className={styles.from_group}>
                            <button>
                                {loading ? <ButtonLoader /> : "Register"}
                            </button>
                        </div>
                    </form>
                    <div className={styles.from_group}>
                        <p className="text-center text-white">
                            Already Have Account ?{" "}
                            <Link to="/login">Login</Link>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default Register;
