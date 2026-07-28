import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addToCart = (product, size) => {
        const exist = cartItems.find((x) => x._id === product._id && x.selectedSize === size);
        if (exist) {
            setCartItems(cartItems.map((x) => x._id === product._id && x.selectedSize === size ? { ...exist, qty: exist.qty + 1 } : x));
        } else {
            setCartItems([...cartItems, { ...product, selectedSize: size, qty: 1 }]);
        }
    };

    const removeFromCart = (product, size) => {
        setCartItems(cartItems.filter((x) => !(x._id === product._id && x.selectedSize === size)));
    };

    const updateQty = (product, size, qty) => {
        if (qty < 1) return;
        setCartItems(cartItems.map((x) => x._id === product._id && x.selectedSize === size ? { ...x, qty } : x));
    };

    const clearCart = () => setCartItems([]);

    const handleCheckout = () => {
        setIsModalOpen(true);
        clearCart();
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQty, isModalOpen, setIsModalOpen, handleCheckout }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
