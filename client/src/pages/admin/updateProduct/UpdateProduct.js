import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    clearErrors,
    getProductDetails,
    updateProduct,
} from "../../../actions/productAction";
import ButtonLoader from "../../../components/loader/ButtonLoader";
import Sidebar from "../../../components/sidebar/Sidebar";
import { UPDATE_PRODUCT_RESET } from "../../../constants/productsConstants";

import styles from "./UpdateProduct.module.scss";

const UpdateProduct = ({ history }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [seller, setSeller] = useState("");
    const [type, setType] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [images, setImages] = useState([]);

    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Electronics",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "Food",
        "Books",
        "Clothes/Shoes",
        "Beauty/Health",
        "Sports",
        "Outdoor",
        "Home",
    ];
    const types = ["New", "Latests"];
    const sizes = ["30", "32", "34", "36"];
    const colors = ["White", "Black", "Green", "Blue", "Yellow", "Pink"];

    const alert = useAlert();
    const dispatch = useDispatch();
    let { id } = useParams();

    const { detailsLoading, error, product } = useSelector(
        (state) => state.productDetails
    );
    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.product);

    useEffect(() => {
        if (product && product._id !== id) {
            dispatch(getProductDetails(id));
        } else {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setCategory(product.category);
            setSeller(product.seller);
            setStock(product.stock);
            setType(product.type);
            setSize(product.size);
            setColor(product.color);
            setOldImages(product.images);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            history.push("/admin/products");
            alert.success("Product updated successfully");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [dispatch, alert, error, isUpdated, history, updateError, product, id]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("price", price);
        formData.set("description", description);
        formData.set("category", category);
        formData.set("stock", stock);
        formData.set("seller", seller);
        formData.set("type", type);
        formData.set("size", size);
        formData.set("color", color);

        images.forEach((image) => {
            formData.append("images", image);
        });

        dispatch(updateProduct(product._id, formData));
    };

    const onChange = (e) => {
        const files = Array.from(e.target.files);

        setImagesPreview([]);
        setImages([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((oldArray) => [
                        ...oldArray,
                        reader.result,
                    ]);
                    setImages((oldArray) => [...oldArray, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };
    return (
        <div className={styles.new_product}>
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10" style={{ marginTop: "75px" }}>
                    <div className={styles.product_input}>
                        <div className={styles.form}>
                            <h4>Update Product</h4>
                            <form onSubmit={submitHandler}>
                                {/* name section  */}
                                <div className={styles.from_group}>
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    />
                                </div>

                                {/* descriptio section  */}
                                <div className={styles.from_group}>
                                    <label htmlFor="description_field">
                                        Description
                                    </label>
                                    <textarea
                                        id="description_field"
                                        rows="8"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    ></textarea>
                                </div>

                                {/* category & stock section  */}
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className={styles.from_group}>
                                            <label htmlFor="category_field">
                                                Category
                                            </label>
                                            <select
                                                id="category_field"
                                                value={category}
                                                onChange={(e) =>
                                                    setCategory(e.target.value)
                                                }
                                            >
                                                {categories.map((category) => (
                                                    <option
                                                        key={category}
                                                        value={category}
                                                    >
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className={styles.from_group}>
                                            <label htmlFor="stock_field">
                                                Stock
                                            </label>
                                            <input
                                                type="number"
                                                id="stock_field"
                                                value={stock}
                                                onChange={(e) =>
                                                    setStock(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/* seller name & price section  */}
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className={styles.from_group}>
                                            <label htmlFor="seller_field">
                                                Seller Name
                                            </label>
                                            <input
                                                type="text"
                                                id="seller_field"
                                                value={seller}
                                                onChange={(e) =>
                                                    setSeller(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className={styles.from_group}>
                                            <label htmlFor="price_field">
                                                Price
                                            </label>
                                            <input
                                                type="text"
                                                id="price_field"
                                                value={price}
                                                onChange={(e) =>
                                                    setPrice(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* types, sizes & color section  */}
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className={styles.from_group}>
                                            <label htmlFor="type_field">
                                                Types
                                            </label>
                                            <select
                                                id="type_field"
                                                value={type}
                                                onChange={(e) =>
                                                    setType(e.target.value)
                                                }
                                            >
                                                {types.map((type) => (
                                                    <option
                                                        key={type}
                                                        value={type}
                                                    >
                                                        {type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className={styles.from_group}>
                                            <label htmlFor="size_field">
                                                Size
                                            </label>
                                            <select
                                                id="size_field"
                                                value={size}
                                                onChange={(e) =>
                                                    setSize(e.target.value)
                                                }
                                            >
                                                {sizes.map((size) => (
                                                    <option
                                                        key={size}
                                                        value={size}
                                                    >
                                                        {size}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className={styles.from_group}>
                                            <label htmlFor="color_field">
                                                Color
                                            </label>
                                            <select
                                                id="color_field"
                                                value={color}
                                                onChange={(e) =>
                                                    setColor(e.target.value)
                                                }
                                            >
                                                {colors.map((color) => (
                                                    <option
                                                        key={color}
                                                        value={color}
                                                    >
                                                        {color}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* image section  */}

                                <div className={styles.from_group}>
                                    <label>Images</label>

                                    <div className="image_file ms-2">
                                        <input
                                            type="file"
                                            name="product_images"
                                            id="customFile"
                                            onChange={onChange}
                                            multiple
                                        />
                                        <AiOutlineCloudUpload size={20} />
                                    </div>

                                    <div>
                                        {oldImages &&
                                            oldImages.map((img) => (
                                                <img
                                                    key={img}
                                                    src={img.url}
                                                    alt={img.url}
                                                    className="mt-3 mr-2"
                                                    width="55"
                                                    height="52"
                                                />
                                            ))}

                                        {imagesPreview.map((img) => (
                                            <img
                                                src={img}
                                                key={img}
                                                alt="Images Preview"
                                                className="mt-3 mr-2"
                                                width="55"
                                                height="52"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.from_group}>
                                    <button type="submit">
                                        {loading ? (
                                            <ButtonLoader />
                                        ) : (
                                            "Update Product"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
