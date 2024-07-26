import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useCart } from './context/cartContext';
import './Productdetails.css'; 
import './Home.css'

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching the product data:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return ( 
    <div className="loading-container">
    <div className="loading-spinner"></div>
    <div className="loading-message">Loading...</div>
  </div>

)
  return (
    <div className="container">
      <nav className="navbar">
        <div className="brand"> License Over the Counter Pharmacy</div>
        <ul className="nav-links">
        <li>
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li>
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li>
            <Link to="/products" className="nav-link">Drugs</Link>
          </li>
          <li>
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li>
            <Link to="/cart" className="nav-link">Cart</Link>
          </li>
        </ul>
      </nav>
      {/* Product Details */}
      <div className="product-details">
        <h1 className="product-title">{product.title}</h1>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
        <img src={product.image} alt={product.title} className="product-image" />
        <input className='quantity-box' type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" />
        <button onClick={() => addToCart(product, quantity)} className='add-to-cart-btn'>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
