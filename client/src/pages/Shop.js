import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const category = query.get('category');

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { data } = await getProducts(category ? { category } : {});
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category]);

    if (loading) return <div style={styles.loading}>Loading products...</div>;

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>{category ? category : 'All Products'}</h1>
            <p style={styles.count}>{products.length} products found</p>
            <div style={styles.grid}>
                {products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            {products.length === 0 && (
                <p style={styles.empty}>No products found in this category.</p>
            )}
        </div>
    );
};

const styles = {
    container: { maxWidth: '1400px', margin: '0 auto', padding: '50px' },
    title: { fontSize: '36px', fontWeight: '700', marginBottom: '10px', letterSpacing: '2px' },
    count: { color: '#666', marginBottom: '40px', fontSize: '16px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px' },
    loading: { textAlign: 'center', padding: '100px', fontSize: '20px' },
    empty: { textAlign: 'center', padding: '100px', fontSize: '18px', color: '#666' }
};

export default Shop;
