import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.product_cost * item.quantity,
    0
  );

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center mt-4">
          <h4>Your cart is empty 🛒</h4>
        </div>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="card p-3 mb-3 shadow-sm">

            <h5>{item.product_name}</h5>
            <p>Ksh {item.product_cost}</p>

            <div className="d-flex align-items-center gap-2">

              <button
                className="btn btn-sm btn-secondary"
                onClick={() => decreaseQty(item.id)}
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                className="btn btn-sm btn-secondary"
                onClick={() => increaseQty(item.id)}
              >
                +
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>

            </div>

          </div>
        ))
      )}

      <h4>Total: Ksh {total}</h4>

      <button
  className={`btn btn-success w-100 ${cart.length === 0 ? "disabled" : ""}`}
  disabled={cart.length === 0}
  onClick={() => navigate("/makepayment", { state: { cart } })}
>
  Checkout
</button>

      <button className="btn btn-secondary w-100 mt-2" onClick={clearCart}>
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;