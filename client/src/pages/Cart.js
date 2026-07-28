import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaTrash } from 'react-icons/fa';
import StripeWrapper from '../components/StripeWrapper';
import Modal from '../components/Modal';

const Cart = () => {
    const { cartItems, removeFromCart, updateQty, handleCheckout, isModalOpen, setIsModalOpen } = useCart();
    const [showPayment, setShowPayment] = useState(false);
    const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

    const handleBuyNow = () => {
        setShowPayment(true);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Shopping Cart</h1>
            
            {cartItems.length === 0 ? (
                <div style={styles.empty}>
                    <p>Your cart is empty.</p>
                    <a href="/shop" style={styles.link}>Continue Shopping →</a>
                </div>
            ) : (
                <div style={styles.content}>
                    <div style={styles.items}>
                        {cartItems.map((item) => (
                            <div key={`${item._id}-${item.selectedSize}`} style={styles.item}>
                                <img src={item.images[0]} alt={item.name} style={styles.itemImage} />
                                <div style={styles.itemInfo}>
                                    <h3 style={styles.itemName}>{item.name}</h3>
                                    <p style={styles.itemSize}>Size: {item.selectedSize}</p>
                                    <p style={styles.itemPrice}>${item.price.toFixed(2)}</p>
                                </div>
                                <div style={styles.itemQty}>
                                    <button onClick={() => updateQty(item, item.selectedSize, item.qty - 1)} style={styles.qtyBtn}>-</button>
                                    <span style={styles.qtyValue}>{item.qty}</span>
                                    <button onClick={() => updateQty(item, item.selectedSize, item.qty + 1)} style={styles.qtyBtn}>+</button>
                                </div>
                                <p style={styles.itemTotal}>${(item.price * item.qty).toFixed(2)}</p>
                                <button onClick={() => removeFromCart(item, item.selectedSize)} style={styles.removeBtn}>
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <div style={styles.summary}>
                        <h3 style={styles.summaryTitle}>Order Summary</h3>
                        <div style={styles.summaryRow}>
                            <span>Subtotal</span>
                            <span>${total}</span>
                        </div>
                        <div style={styles.summaryRow}>
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div style={styles.summaryTotal}>
                            <span>Total</span>
                            <span>${total}</span>
                        </div>
                        <button onClick={handleBuyNow} style={styles.checkoutBtn}>Proceed to Payment</button>
                    </div>
                </div>
            )}
            
            {/* Payment Modal */}
            {showPayment && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <button onClick={() => setShowPayment(false)} style={styles.closeBtn}>✕</button>
                        <StripeWrapper onClose={() => setShowPayment(false)} />
                    </div>
                </div>
            )}
            
            {/* Success Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

const styles = {
    container: { maxWidth: '1400px', margin: '0 auto', padding: '50px' },
    title: { fontSize: '36px', fontWeight: '700', marginBottom: '40px', letterSpacing: '2px' },
    empty: { textAlign: 'center', padding: '100px' },
    link: { color: '#000', fontWeight: '600', marginTop: '20px', display: 'inline-block' },
    content: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '60px' },
    items: { display: 'flex', flexDirection: 'column', gap: '20px' },
    item: { display: 'grid', gridTemplateColumns: '100px 1fr auto auto auto', gap: '20px', alignItems: 'center', padding: '20px', border: '1px solid #eee' },
    itemImage: { width: '100px', height: '100px', objectFit: 'cover' },
    itemInfo: { display: 'flex', flexDirection: 'column', gap: '5px' },
    itemName: { fontSize: '16px', fontWeight: '600' },
    itemSize: { fontSize: '14px', color: '#888' },
    itemPrice: { fontSize: '14px', color: '#888' },
    itemQty: { display: 'flex', alignItems: 'center', gap: '15px' },
    qtyBtn: { width: '35px', height: '35px', border: '1px solid #ddd', background: '#fff', fontSize: '18px' },
    qtyValue: { fontSize: '16px', fontWeight: '600', minWidth: '30px', textAlign: 'center' },
    itemTotal: { fontSize: '18px', fontWeight: '700', minWidth: '100px', textAlign: 'right' },
    removeBtn: { background: 'none', border: 'none', color: '#999', fontSize: '18px' },
    summary: { background: '#f9f9f9', padding: '30px', height: 'fit-content' },
    summaryTitle: { fontSize: '20px', fontWeight: '700', marginBottom: '25px' },
    summaryRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '15px' },
    summaryTotal: { display: 'flex', justifyContent: 'space-between', marginBottom: '25px', paddingTop: '20px', borderTop: '1px solid #ddd', fontSize: '18px', fontWeight: '700' },
    checkoutBtn: { width: '100%', background: '#000', color: '#fff', padding: '18px', border: 'none', fontSize: '16px', fontWeight: '700', textTransform: 'uppercase' },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 2000
    },
    modalContent: {
        background: '#fff',
        padding: '40px',
        borderRadius: '8px',
        maxWidth: '600px',
        width: '90%',
        position: 'relative',
        maxHeight: '90vh',
        overflow: 'auto'
    },
    closeBtn: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#666'
    }
};

export default Cart;
