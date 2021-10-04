import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentMethodScreen(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const history = useHistory();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/placeorder");
  };

  return (
    <div className="mx-auto w-100">
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="col-5 m-auto form" onSubmit={submitHandler}>
        <div>
          <br />
          <h1>Payment Method</h1>
        </div>
        <div>
          <div className="custom-control custom-radio">
            <input
              type="radio"
              id="paypal"
              className="custom-control-input"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="paypal" className="custom-control-label">
              PayPal
            </label>
          </div>
        </div>
        <br />
        <div className="form-group">
          <button className="btn btn-primary" type="submit">
            Continue
          </button>
          <br />
          <button
            className="btn btn-primary"
            onClick={() => {
              history.goBack();
            }}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
