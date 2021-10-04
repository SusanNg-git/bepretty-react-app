import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

export default function ProductCreateScreen(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push("/productlist");
    }
  }, [dispatch, successCreate, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProduct({
        name,
        price,
        image,
        category,
        brand,
        countInStock,
        description,
      })
    );
  };

  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };
  return (
    <div className="col-sm-10 col-md-7 m-auto">
      <form className="form mx-auto" onSubmit={submitHandler}>
        <div className="my-2">
          <h1>Create Product</h1>
        </div>
        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
        {/* {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : ( */}
        <>
          <div className="form-group">
            <label htmlFor="name" className="d-block">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="form-control-lg d-block"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="price" className="d-block">
              Price
            </label>
            <input
              id="price"
              type="text"
              className="form-control-lg d-block"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="image" className="d-block">
              Image
            </label>
            <input
              id="image"
              type="text"
              className="form-control-lg d-block"
              placeholder="Enter image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="imageFile" className="d-block">
              Image File
            </label>
            <input
              type="file"
              id="imageFile"
              className="form-control-lg d-block"
              label="Choose Image"
              onChange={uploadFileHandler}
            ></input>
            {loadingUpload && <LoadingBox></LoadingBox>}
            {errorUpload && (
              <MessageBox variant="danger">{errorUpload}</MessageBox>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="category" className="d-block">
              Category
            </label>
            <input
              id="category"
              type="text"
              className="form-control-lg d-block"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="brand" className="d-block">
              Brand
            </label>
            <input
              id="brand"
              type="text"
              className="form-control-lg d-block"
              placeholder="Enter brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="countInStock" className="d-block">
              Count In Stock
            </label>
            <input
              id="countInStock"
              type="text"
              className="form-control-lg d-block"
              placeholder="Enter countInStock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="description" className="d-block">
              Description
            </label>
            <textarea
              id="description"
              rows="3"
              type="text"
              className="form-control-lg d-block"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div style={{ marginBottom: "6rem" }}>
            <label></label>
            <button className="btn btn-primary" type="submit">
              Create
            </button>
          </div>
        </>
        {/* )} */}
      </form>
    </div>
  );
}
