import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [products, setProducts] = useState([]);

  // ADD TO CART
  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);

      if (existing) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      toast.success("Added to cart 🛒");
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // INCREASE
  const increaseQty = (id) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // DECREASE
  const decreaseQty = (id) => {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  // REMOVE ITEM
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
    toast.warning("Item removed");
  };

  // CLEAR CART FIXED
  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared 🧹");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        search,
        setSearch,
        sort,
        setSort,
        products,
        setProducts
      }}
    >
      {children}
    </CartContext.Provider>
  );
};