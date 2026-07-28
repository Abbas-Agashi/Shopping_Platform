import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51TQ9uXKdZjbHeEPhkghC9C4yedbr4Cy5M2Mdvpl15WTqmmcrlNdBkCIdUuvwofXLtezh1VOdW6zi07GolDFtnrGs00UNPa3Aen');

const StripeWrapper = ({ onClose }) => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm onClose={onClose} />
        </Elements>
    );
};

export default StripeWrapper;
