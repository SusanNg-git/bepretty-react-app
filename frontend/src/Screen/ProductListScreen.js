import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deleteProduct, listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_DELETE_RESET } from "../constants/productConstants";

export default function ProductListScreen(props) {
  const { pageNumber = 1 } = useParams();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts({ pageNumber }));
  }, [dispatch, props.history, successDelete, pageNumber]);

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product._id));
    }
  };

  return (
    <div className="m-auto w-100">
      <div className="row justify-content-between mx-3">
        <h1>Products</h1>
        <div className="form">
          <button
            type="button"
            className="btn btn-primary px-3"
            onClick={() => props.history.push(`/productcreate`)}
          >
            Create Product
          </button>
        </div>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : products.length === 0 ? (
        <div className="m-auto w-75">
          <MessageBox>No Product Found</MessageBox>
        </div>
      ) : (
        <>
          <table className="table-g" style={{ width: "90%" }}>
            <thead>
              <tr>
                <th>Date Created</th>
                <th>ID</th>
                <th>Brand</th>
                <th className="w-25">Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Count in Stock</th>
                <th>Update Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.createdAt.substring(0, 10)}</td>
                  <td>{product._id}</td>
                  <td>{product.brand}</td>
                  <td className="text-left w-70">{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price.toLocaleString()}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.updatedAt.substring(0, 10)}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-info my-2"
                      onClick={() =>
                        props.history.push(`/product/${product._id}/edit`)
                      }
                    >
                      Edit
                    </button>{" "}
                    <button
                      type="button"
                      className="btn btn-danger my-2"
                      onClick={() => deleteHandler(product)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row justify-content-center pagination">
            {pages > 1
              ? [...Array(pages).keys()].map((x) => (
                  <Link
                    className={x + 1 === page ? "active" : ""}
                    key={x + 1}
                    to={`/productlist/pageNumber/${x + 1}`}
                  >
                    {x + 1}
                  </Link>
                ))
              : ""}
          </div>
        </>
      )}
    </div>
  );
}
