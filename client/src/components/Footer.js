import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.content}>
                <div style={styles.section}>
                    <h4 style={styles.heading}>CUBE</h4>
                    <p style={styles.text}>Modern fashion for the urban era.</p>
                </div>
                <div style={styles.section}>
                    <h4 style={styles.heading}>Shop</h4>
                    <Link to="/shop?category=Shirts" style={styles.link}>Shirts</Link>
                    <Link to="/shop?category=Pants" style={styles.link}>Pants</Link>
                    <Link to="/shop?category=Hoodies" style={styles.link}>Hoodies</Link>
                </div>
                <div style={styles.section}>
                    <h4 style={styles.heading}>Support</h4>
                    <Link to="/support" style={styles.link}>Contact Us</Link>
                    <Link to="/policy" style={styles.link}>Returns & Exchange</Link>
                </div>
            </div>
            <div style={styles.bottom}>
                <p>&copy; 2024 Cube Clothing. All rights reserved.</p>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        background: '#000',
        color: '#fff',
        padding: '60px 50px 20px',
        marginTop: '80px'
    },
    content: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '40px',
        maxWidth: '1400px',
        margin: '0 auto',
        borderBottom: '1px solid #333',
        paddingBottom: '40px'
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px'
    },
    heading: {
        fontSize: '20px',
        fontWeight: '500',
        letterSpacing: '2px',
        marginBottom: '10px'
    },
    link: {
        color: '#aaa',
        fontSize: '18px',
        transition: 'color 0.3s'
    },
    text: {
        color: '#aaa',
        fontSize: '18px',
        lineHeight: '1.8'
    },
    bottom: {
        textAlign: 'center',
        paddingTop: '20px',
        color: '#666',
        fontSize: '13px'
    }
};

export default Footer;
