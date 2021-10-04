import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export default function Product(props) {
  const { product } = props;
  return (
    <div>
      <div key={product._id} className="col-3 card card-product">
        <div style={{ height: "65%" }}>
          <Link to={`/product/${product._id}`}>
            <img
              className="m-auto d-block"
              style={{ maxHeight: "100%" }}
              src={product.image}
              alt={product.name}
            />
          </Link>
        </div>
        <div className="card-body">
          <Link to={`/product/${product._id}`}>
            <h6>{product.name}</h6>
          </Link>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <div className="price">${product.price.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
