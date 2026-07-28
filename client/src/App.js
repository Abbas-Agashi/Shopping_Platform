import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Support from './pages/Support';
import Policy from './pages/Policy';
import './App.css';

function App() {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <CartProvider>
            <Router>
                <div className="App">
                    <Navbar onSearch={setSearchTerm} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/support" element={<Support />} />
                        <Route path="/policy" element={<Policy />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </CartProvider>
    );
}

export default App;
