import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const Modal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.content}>
                <FaCheckCircle style={styles.icon} />
                <h2 style={styles.title}>Order Confirmed!</h2>
                <p style={styles.message}>
                    Product has been successfully ordered and will be delivered within 7 days.
                </p>
                <button onClick={onClose} style={styles.btn}>Continue Shopping</button>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
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
    content: {
        background: '#fff',
        padding: '50px',
        borderRadius: '0px',
        textAlign: 'center',
        maxWidth: '500px',
        width: '90%'
    },
    icon: {
        fontSize: '60px',
        color: '#000',
        marginBottom: '20px'
    },
    title: {
        fontSize: '24px',
        fontWeight: '700',
        marginBottom: '15px',
        letterSpacing: '1px'
    },
    message: {
        fontSize: '16px',
        color: '#666',
        marginBottom: '30px',
        lineHeight: '1.6'
    },
    btn: {
        background: '#000',
        color: '#fff',
        padding: '15px 40px',
        border: 'none',
        fontSize: '14px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    }
};

export default Modal;

