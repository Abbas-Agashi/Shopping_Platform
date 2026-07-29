import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const name = "C.U.B.E";

  const handleSearch = (value) => {
    onSearch(value);
    if (value.length > 0) {
      navigate('/shop'); // Auto-navigate to shop when searching
    }
  };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                <Link to="/">{name}</Link>
            </div>
            <div style={styles.links}>
                <Link to="/shop?category=Shirts">Shirts</Link>
                <Link to="/shop?category=Pants">Pants</Link>
                <Link to="/shop?category=Polos">Polos</Link>
                <Link to="/shop?category=Hoodies">Hoodies</Link>
                <Link to="/shop?category=Jerseys">Jerseys</Link>
                <Link to="/shop?category=Tank Tops">Tank Tops</Link>
                <Link to="/shop?category=Shackets">Shackets</Link>
                <Link to="/shop?category=Tees">Tees</Link>
            </div>
            <div style={styles.right}>
                <div style={styles.searchBox}>
                    <FaSearch style={styles.searchIcon} />
                    <input 
                        type="text" 
                        placeholder="Search Products..." 
                        onChange={(e) => onSearch(e.target.value)}
                        style={styles.searchInput}
                    />
                </div>
                <Link to="/cart" style={styles.cartLink}>
                    <FaShoppingCart />
                    <span style={styles.cartCount}>{cartCount}</span>
                </Link>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '25px 50px',
        borderBottom: '1px solid #EFEEE5',
        position: 'sticky',
        top: 0,
        background: '#ffffff',
        zIndex: 1000
    },
    logo: {
        fontSize: '25px',
        fontWeight: '500',
        letterSpacing: '6px'
    },
    links: {
        display: 'flex',
        gap: '25px',
        fontWeight: '450',
        fontSize: '19px',
        textTransform: 'uppercase',
        letterSpacing: '1px'
    },
    right: {
        display: 'flex',
        alignItems: 'center',
        gap: '25px'
    },
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #000000',
        padding: '15px 30px',
        borderRadius: '30px'
    },
    searchIcon: {
        marginRight: '10px',
        color: '#666'
    },
    searchInput: {
        border: 'none',
        outline: 'none',
        width: '200px',
        fontSize: '14px',
        background: '#fff'
    },
    cartLink: {
        position: 'relative',
        fontSize: '20px'
    },
    cartCount: {
        position: 'absolute',
        top: '-8px',
        right: '-10px',
        background: '#000',
        color: '#fff',
        fontSize: '12px',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

export default Navbar;
