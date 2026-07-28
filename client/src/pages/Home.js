import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return <div style={styles.loading}>Loading...</div>;

    return (
        <div>
            {/* Hero Section */}
            <div style={styles.hero}>
                <div style={styles.heroContent}>
                    <h1 style={styles.heroTitle}>CUBE COLLECTION</h1>
                    <p style={styles.heroSubtitle}>Modern Fashion for the Urban Era</p>
                    <Link to="/shop" style={styles.heroBtn}>Shop Now</Link>
                </div>
            </div>

            {/* Featured Products */}
            <div style={styles.container}>
                <h2 style={styles.sectionTitle}>Trending Now</h2>
                <div style={styles.grid}>
                    {products.slice(0, 4).map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            </div>

            {/* Categories Section */}
            <div style={styles.categories}>
                <h2 style={styles.sectionTitle}>Shop by Category</h2>
                <div style={styles.catGrid}>
                    {['Hoodies', 'Shirts', 'Pants', 'Jerseys', 'Polos', 'Tank Tops', 'Shackets', 'Tees'].map(cat => (
                        <Link key={cat} to={`/shop?category=${cat}`} style={styles.catCard}>
                            <h3>{cat}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    loading: { textAlign: 'center', padding: '100px', fontSize: '20px' },
    hero: {
        height: '100vh',
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: '#fff',
        marginBottom: '30px'
    },
    heroContent: { maxWidth: '1000px' },
    heroTitle: { fontSize: '64px', fontWeight: '900', letterSpacing: '8px', marginBottom: '20px' },
    heroSubtitle: { fontSize: '20px', fontWeight: '300', marginBottom: '40px', letterSpacing: '2px' },
    heroBtn: {
        background: '#EFEEE5',
        color: '#000',
        padding: '18px 70px',
        fontSize: '16px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        borderRadius: '15px'
    },
    container: { maxWidth: '1400px', margin: '0 auto', padding: '0 50px' },
    sectionTitle: { fontSize: '32px', fontWeight: '700', marginBottom: '40px', textAlign: 'center', letterSpacing: '2px' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px', marginBottom: '100px' },
    categories: { background: '#f9f9f9', padding: '80px 50px', marginBottom: '80px' },
    catGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', maxWidth: '1400px', margin: '0 auto' },
    catCard: {
        background: '#fff',
        padding: '60px 20px',
        textAlign: 'center',
        border: '1px solid #eee',
        transition: 'transform 0.3s',
        borderRadius: '20px'
    }
};

export default Home;
