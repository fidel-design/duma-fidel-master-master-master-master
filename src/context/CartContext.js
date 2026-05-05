import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [products, setProducts] = useState([]);

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

  const increaseQty = (id) => {
  setCart(prev =>
    prev.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

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
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
  toast.warning("Item removed");

  const clearCart = () => setCart([]);
  toast.info("Cart cleared");

  return (
   <CartContext.Provider value={{
  cart,
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  search,
  setSearch,
  sort,
  setSort,
  products,
  setProducts
}}>
      {children}
    </CartContext.Provider>
  );
};