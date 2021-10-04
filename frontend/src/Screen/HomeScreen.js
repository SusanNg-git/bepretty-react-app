import React, { useEffect } from "react";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { Link, useParams } from "react-router-dom";

export default function HomeScreen() {
  const { pageNumber = 1 } = useParams();
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  // const { loading, error, products } = productList;
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    // dispatch(listProducts({}));
    dispatch(listProducts({ pageNumber }));
  }, [dispatch, pageNumber]);

  return (
    <div className="m-auto w-100">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : products.length === 0 ? (
        <div className="m-auto w-75">
          <MessageBox>No Product Found</MessageBox>
        </div>
      ) : (
        <div>
          <div className="row justify-content-center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
          <div className="row justify-content-center pagination">
            {[...Array(pages).keys()].map((x) => (
              <Link
                className={x + 1 === page ? "active" : ""}
                key={x + 1}
                to={`/pageNumber/${x + 1}`}
              >
                {x + 1}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
