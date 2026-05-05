import axios from 'axios'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Makepayment = () => {
  const location = useLocation();
  const { cart, product } = location.state || {};

  const items =
    cart && cart.length > 0
      ? cart
      : product
      ? [{ ...product, quantity: 1 }]
      : [];

  const img_url = "http://dumafidel.alwaysdata.net/static/images/";

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ AFTER hooks
  if (items.length === 0) {
    return <h3>No items to pay for</h3>;
  }

  const total = items.reduce(
    (sum, item) => sum + item.product_cost * (item.quantity || 1),
    0
  );

  const submit = async (e) => {
    e.preventDefault();
    setMessage("Please wait as we process...");

    try {
      const data = new FormData();
      data.append("phone", phone);
      data.append("amount", total);

      await axios.post(
        "http://dumafidel.alwaysdata.net/api/mpesa_payment",
        data
      );

      setMessage("Please complete payment on your phone 📱");
    } catch (error) {
      setMessage("");
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Make Payment - Lipa na Mpesa</h1>

      <div className="row justify-content-center mt-4">
        <div className="col-md-6 card shadow p-4">

          {/* Use items ONLY */}
          {items.map((item) => (
            <div key={item.id} className="mb-3">
              <p>{item.product_name}</p>
              <p>{item.quantity || 1} x {item.product_cost}</p>
            </div>
          ))}

          {/* Order summary */}
          <div className="card p-3 mb-3">
            <h4>Order Summary</h4>

            {items.map((item) => (
              <p key={item.id}>
                {item.product_name} x {item.quantity || 1}
              </p>
            ))}

            <h5>Total: Ksh {total}</h5>
          </div>

          <form onSubmit={submit}>
            {message}
            {error}

            <input
              type="tel"
              className="form-control"
              placeholder="Enter Phone (254XXX)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <br />

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={message === "Please wait as we process..."}
            >
              Make Payment
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Makepayment