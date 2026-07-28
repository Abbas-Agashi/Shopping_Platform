import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, addReview } from '../services/api';
import { useCart } from '../context/CartContext';
import { FaStar } from 'react-icons/fa';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [size, setSize] = useState('');
    const [selectedImage, setSelectedImage] = useState(0);
    const [review, setReview] = useState({ name: '', rating: 5, comment: '' });
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await getProductById(id);
                setProduct(data);
                if (data.images && data.images.length > 0) setSelectedImage(0);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const submitReview = async (e) => {
        e.preventDefault();
        try {
            await addReview(id, review);
            const { data } = await getProductById(id);
            setProduct(data);
            setReview({ name: '', rating: 5, comment: '' });
            alert('Review submitted successfully!');
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit review');
        }
    };

    if (loading) return <div style={styles.loading}>Loading...</div>;
    if (!product) return <div style={styles.loading}>Product not found</div>;

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                {/* Images */}
                <div style={styles.imagesSection}>
                    <div style={styles.mainImage}>
                        <img src={product.images[selectedImage]} alt={product.name} style={styles.img} />
                    </div>
                    {product.images.length > 1 && (
                        <div style={styles.thumbnails}>
                            {product.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`Thumbnail ${idx}`}
                                    style={{
                                        ...styles.thumb,
                                        border: selectedImage === idx ? '2px solid #343434' : '2px solid transparent'
                                    }}
                                    onClick={() => setSelectedImage(idx)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Info */}
                <div style={styles.infoSection}>
                    <p style={styles.category}>{product.category}</p>
                    <h1 style={styles.name}>{product.name}</h1>
                    <p style={styles.price}>${product.price.toFixed(2)}</p>
                    <p style={styles.description}>{product.description}</p>

                    <div style={styles.sizeSelector}>
                        <label style={styles.label}>Select Size:</label>
                        <div style={styles.sizes}>
                            {product.sizes.map(s => (
                                <button
                                    key={s}
                                    style={{
                                        ...styles.sizeBtn,
                                        background: size === s ? '#343434' : '#fff',
                                        color: size === s ? '#fff' : '#343434',
                                        border: size === s ? '1px solid #343434' : '1px solid #ddd'
                                    }}
                                    onClick={() => setSize(s)}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => addToCart(product, size)}
                        style={{
                            ...styles.addBtn,
                            opacity: !size ? 0.5 : 1,
                            cursor: !size ? 'not-allowed' : 'pointer'
                        }}
                        disabled={!size}
                    >
                        Add to Cart
                    </button>

                    {/* Reviews */}
                    <div style={styles.reviewsSection}>
                        <h3 style={styles.reviewsTitle}>Customer Reviews ({product.numReviews})</h3>
                        {product.rating > 0 && (
                            <div style={styles.ratingSummary}>
                                <FaStar style={{ color: '#343434' }} />
                                <span>{product.rating.toFixed(1)} / 5</span>
                            </div>
                        )}
                        
                        <div style={styles.reviewsList}>
                            {product.reviews && product.reviews.length > 0 ? (
                                product.reviews.map((r, i) => (
                                    <div key={i} style={styles.reviewItem}>
                                        <div style={styles.reviewHeader}>
                                            <strong>{r.name}</strong>
                                            <div style={styles.reviewStars}>
                                                {[...Array(5)].map((_, idx) => (
                                                    <FaStar key={idx} style={{ color: idx < r.rating ? '#343434' : '#ddd' }} />
                                                ))}
                                            </div>
                                        </div>
                                        <p style={styles.reviewComment}>{r.comment}</p>
                                        <small style={styles.reviewDate}>{new Date(r.createdAt).toLocaleDateString()}</small>
                                    </div>
                                ))
                            ) : (
                                <p style={styles.noReviews}>No reviews yet. Be the first to review!</p>
                            )}
                        </div>

                        {/* Review Form */}
                        <form onSubmit={submitReview} style={styles.reviewForm}>
                            <h4 style={styles.formTitle}>Write a Review</h4>
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={review.name}
                                onChange={e => setReview({ ...review, name: e.target.value })}
                                required
                                style={styles.input}
                            />
                            <select
                                value={review.rating}
                                onChange={e => setReview({ ...review, rating: Number(e.target.value) })}
                                style={styles.input}
                            >
                                <option value="5">⭐⭐⭐⭐⭐ (5 Stars)</option>
                                <option value="4">⭐⭐⭐⭐ (4 Stars)</option>
                                <option value="3">⭐⭐⭐ (3 Stars)</option>
                                <option value="2">⭐⭐ (2 Stars)</option>
                                <option value="1">⭐ (1 Star)</option>
                            </select>
                            <textarea
                                placeholder="Your Review"
                                value={review.comment}
                                onChange={e => setReview({ ...review, comment: e.target.value })}
                                required
                                rows="4"
                                style={styles.textarea}
                            />
                            <button type="submit" style={styles.submitBtn}>Submit Review</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { maxWidth: '1400px', margin: '0 auto', padding: '50px' },
    loading: { textAlign: 'center', padding: '100px', fontSize: '20px' },
    content: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' },
    imagesSection: { display: 'flex', flexDirection: 'column', gap: '20px' },
    mainImage: { width: '100%', height: '600px', background: '#f9f9f9'},
    img: { width: '100%', height: '100%', objectFit: 'cover' },
    thumbnails: { display: 'flex', gap: '10px' },
    thumb: { width: '100px', height: '100px', objectFit: 'cover', cursor: 'pointer' },
    infoSection: { display: 'flex', flexDirection: 'column', gap: '20px' },
    category: { color: '#888', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px' },
    name: { fontSize: '36px', fontWeight: '700', letterSpacing: '1px' },
    price: { fontSize: '28px', fontWeight: '600' },
    description: { fontSize: '16px', lineHeight: '1.8', color: '#555' },
    sizeSelector: { marginTop: '20px' },
    label: { display: 'block', marginBottom: '10px', fontWeight: '600' },
    sizes: { display: 'flex', gap: '10px' },
    sizeBtn: { padding: '12px 25px', border: '1px solid #ddd', background: '#fff', fontSize: '16px', fontWeight: '600' , borderRadius: '10px', cursor: 'pointer'},
    addBtn: { background: '#343434', color: '#fff', padding: '18px', fontSize: '16px', fontWeight: '700', textTransform: 'uppercase', border: 'none', marginTop: '20px' , borderRadius: '10px'},
    reviewsSection: { marginTop: '60px', paddingTop: '40px', borderTop: '1px solid #eee' },
    reviewsTitle: { fontSize: '24px', fontWeight: '700', marginBottom: '20px' },
    ratingSummary: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '18px', marginBottom: '30px' },
    reviewsList: { display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' },
    reviewItem: { padding: '20px', background: '#f9f9f9' },
    reviewHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
    reviewStars: { display: 'flex', gap: '5px' },
    reviewComment: { fontSize: '15px', lineHeight: '1.6', color: '#555' },
    reviewDate: { display: 'block', marginTop: '10px', color: '#999', fontSize: '13px' },
    noReviews: { color: '#999', fontStyle: 'italic' },
    reviewForm: { background: '#f9f9f9', padding: '30px' },
    formTitle: { fontSize: '18px', fontWeight: '600', marginBottom: '20px' },
    input: { width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', fontSize: '14px', borderRadius: '5px' },
    textarea: { width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #ddd', fontSize: '14px', resize: 'vertical',borderRadius: '5px' },
    submitBtn: { background: '#343434', color: '#fff', padding: '15px 40px', border: 'none', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase' }
};

export default ProductDetails;
