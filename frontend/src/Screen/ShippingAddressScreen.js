import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!userInfo) {
    props.history.push("/signin");
  }
  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalCode, country })
    );
    props.history.push("/payment");
  };
  return (
    <div className="mx-auto w-100">
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="col-6 m-auto form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>
        <div className="form-group">
          <label htmlFor="fullName" className="d-block">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            className="form-control-lg d-block"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="address" className="d-block">
            Address
          </label>
          <input
            type="text"
            id="address"
            className="form-control-lg d-block"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="city" className="d-block">
            City
          </label>
          <input
            type="text"
            id="city"
            className="form-control-lg d-block"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="postalCode" className="d-block">
            Postal Code
          </label>
          <input
            type="text"
            id="postalCode"
            className="form-control-lg d-block"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="country" className="d-block">
            Country
          </label>
          <input
            type="text"
            id="country"
            className="form-control-lg d-block"
            placeholder="Enter country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          ></input>
        </div>
        <div className="form-group">
          <label />
          <button
            className="btn btn-primary"
            style={{ marginBottom: "6rem" }}
            type="submit"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
