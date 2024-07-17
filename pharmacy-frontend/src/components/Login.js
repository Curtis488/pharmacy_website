import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting login form with:", { email, password }); // Debugging statement
    try {
      const res = await axios.post('http://localhost:3000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      const tokenPayload = JSON.parse(atob(res.data.token.split('.')[1]));
      if (tokenPayload.user.role === 'admin') {
        navigate('/admin-orders');
      } else {
        navigate('/home');
      }
    } catch (err) {
      console.error('Login failed', err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <div className="login-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
