import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div style={styles.card}>
            <Link to={`/product/${product._id}`}>
                <div style={styles.imageContainer}>
                    <img src={product.images[0]} alt={product.name} style={styles.image} />
                </div>
                <div style={styles.info}>
                    <h3 style={styles.name}>{product.name}</h3>
                    <p style={styles.category}>{product.category}</p>
                    <p style={styles.price}>${product.price.toFixed(2)}</p>
                </div>
            </Link>
        </div>
    );
};

const styles = {
    card: {
        border: '1px solid #f0f0f0',
        transition: 'transform 0.3s, box-shadow 0.3s',
        cursor: 'pointer',
        borderRadius: '20px'
    },
    imageContainer: {
        width: '100%',
        height: '400px',
        overflow: 'hidden',
        background: '#f9f9f9',
        borderRadius: '20px'
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.3s'
    },
    info: {
        padding: '20px',
        textAlign: 'center'
    },
    name: {
        fontSize: '16px',
        fontWeight: '600',
        marginBottom: '5px'
    },
    category: {
        fontSize: '13px',
        color: '#888',
        marginBottom: '10px',
        textTransform: 'uppercase'
    },
    price: {
        fontSize: '16px',
        fontWeight: '700'
    }
};

export default ProductCard;
