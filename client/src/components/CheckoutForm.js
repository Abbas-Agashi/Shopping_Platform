import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import { API_BASE_URL } from '../config';

const CheckoutForm = ({ onClose }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { cartItems, handleCheckout } = useCart();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Create Payment Intent
            const response = await fetch(`${API_BASE_URL}/payment/create-payment-intent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: total }),
            });

            const { clientSecret } = await response.json();

            // Confirm Payment
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                setError(result.error.message);
                setLoading(false);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    setSuccess(true);
                    handleCheckout();
                    setTimeout(() => {
                        onClose();
                    }, 3000);
                }
            }
        } catch (err) {
            setError('Payment failed. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Secure Checkout</h2>
            
            {success ? (
                <div style={styles.success}>
                    <div style={styles.checkmark}>✓</div>
                    <h3>Payment Successful!</h3>
                    <p>Your order will be delivered within 7 days.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.orderSummary}>
                        <h4>Order Summary</h4>
                        <p>Total Amount: <strong>${total}</strong></p>
                    </div>

                    <div style={styles.cardElement}>
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#424770',
                                        '::placeholder': { color: '#aab7c4' },
                                    },
                                    invalid: { color: '#9e2146' },
                                },
                            }}
                        />
                    </div>

                    {error && <div style={styles.error}>{error}</div>}

                    <button 
                        type="submit" 
                        disabled={!stripe || loading}
                        style={styles.submitBtn}
                    >
                        {loading ? 'Processing...' : `Pay $${total}`}
                    </button>

                    <div style={styles.testCards}>
                        <p><strong>Test Card Numbers:</strong></p>
                        <p>Success: <code>4242 4242 4242 4242</code></p>
                        <p>Decline: <code>4000 0000 0000 0002</code></p>
                        <p>Use any future expiry & any 3-digit CVC</p>
                    </div>
                </form>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '30px',
        background: '#fff',
        borderRadius: '8px',
        maxWidth: '500px',
        margin: '0 auto'
    },
    title: {
        fontSize: '24px',
        fontWeight: '700',
        marginBottom: '20px',
        textAlign: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    orderSummary: {
        background: '#f9f9f9',
        padding: '15px',
        borderRadius: '5px'
    },
    cardElement: {
        border: '1px solid #ddd',
        padding: '15px',
        borderRadius: '5px'
    },
    error: {
        color: '#dc3545',
        fontSize: '14px',
        textAlign: 'center'
    },
    submitBtn: {
        background: '#000',
        color: '#fff',
        padding: '15px',
        border: 'none',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        borderRadius: '5px'
    },
    testCards: {
        background: '#fff3cd',
        padding: '15px',
        borderRadius: '5px',
        fontSize: '13px',
        marginTop: '10px'
    },
    success: {
        textAlign: 'center',
        padding: '40px 20px'
    },
    checkmark: {
        width: '80px',
        height: '80px',
        background: '#28a745',
        color: '#fff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '40px',
        margin: '0 auto 20px'
    }
};

export default CheckoutForm;
