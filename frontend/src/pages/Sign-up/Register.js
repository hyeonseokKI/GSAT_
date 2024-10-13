import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState('');
  const [usernameCheckMessage, setUsernameCheckMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleUsernameCheck = () => {
    axios.post('http://localhost:8080/api/check-username', { username: formData.username })
      .then(_response => {
        setUsernameCheckMessage('Username is available');
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          setUsernameCheckMessage(error.response.data.error);
        } else {
          setUsernameCheckMessage('An error occurred');
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    axios.post('http://localhost:8080/api/register', formData)
      .then(_response => {
        setMessage('User registered successfully');
      })
      .catch(error => {
        if (error.response && error.response.data && error.response.data.error) {
          setMessage(error.response.data.error);
        } else {
          setMessage('An error occurred');
        }
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <button type="button" onClick={handleUsernameCheck}>Check Username</button>
          {usernameCheckMessage && <p>{usernameCheckMessage}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Register;
