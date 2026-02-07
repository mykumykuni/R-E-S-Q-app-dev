import React, { useState } from 'react';
import './Login.css';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Login Attemted with:', { email, password});
	  // login logic dri 
  }

    return (
     <main classname="login-container">
	<section className = "login-card">
         <header>
           <h1>Welcome Back</h1>
           <p>Please enter your details to login</p>
	 </header>
    )












