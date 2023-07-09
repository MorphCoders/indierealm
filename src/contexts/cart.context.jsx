import { createContext, useState, useEffect } from "react";

const addItemsToCart = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems;
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const clearItemsFromCart = (cartItems, cartItemToRemove) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addCartItems: () => {},
  clearCartItems: () => {},
  cartCount: 0,
  cartTotal: 0,
});

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (accumulator, currentItem) => accumulator + currentItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (accumulator, currentItem) =>
        accumulator + currentItem.quantity * currentItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addCartItems = (productToAdd) => {
    setCartItems(addItemsToCart(cartItems, productToAdd));
  };

  const clearCartItems = (cartItemToClear) => {
    setCartItems(clearItemsFromCart(cartItems, cartItemToClear));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addCartItems,
    clearCartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};