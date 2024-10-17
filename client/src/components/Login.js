import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

const Login = () => {
  const serverURL = process.env.REACT_APP_URL;
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const styles = {
    container: {
      backgroundColor: "white",
      width: "90%",
      maxWidth: "400px",
      margin: "50px auto",
      padding: "40px",
      borderRadius: "10px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      transition: "box-shadow 0.3s",
    },
    title: {
      textAlign: "center",
      fontWeight: "bold",
      color: "darkcyan",
      textTransform: "uppercase",
      fontSize: "1.5em",
    },
    form: {
      display: "flex",
      flexDirection: "column",
    },
    label: {
      marginTop: "15px",
      fontWeight: "bold",
      color: "#333",
    },
    input: {
      marginTop: "5px",
      padding: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      transition: "border 0.3s",
      fontSize: "1em",
    },
    button: {
      marginTop: "15px",
      backgroundColor: "darkcyan",
      color: "white",
      border: "none",
      padding: "10px",
      cursor: "pointer",
      borderRadius: "5px",
      fontSize: "1em",
      fontWeight: "bold",
      transition: "background-color 0.3s",
    },
    link: {
      marginTop: "20px",
      textAlign: "center",
      fontSize: "0.9em",
    },
    error: {
      color: "red",
      fontSize: "0.8em",
    },
    generalError: {
      color: "red",
      fontSize: "1em",
      textAlign: "center",
      marginTop: "10px",
    },
  };

  const formik = useFormik({
    initialValues: {
      phone_number: '',
      password: '',
    },
    validationSchema: Yup.object({
      phone_number: Yup.string().required('phone_number number is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      setErrorMessage('');
      try {
        const res = await axios.post(`${serverURL}/login`, values);

        console.log('Login successful:', res.data);
        navigate('/'); 
      } catch (error) {
        console.error('Login failed:', error);
        setErrorMessage(error.response?.data?.message || 'Login failed! Please try again.');
      }
    },
  });

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Login</h3>
      <form onSubmit={formik.handleSubmit} style={styles.form}>
        {errorMessage && <div style={styles.generalError}>{errorMessage}</div>}

        <label htmlFor="phone_number" style={styles.label}>Number:</label>
        <input
          type="tel"
          id="phone_number"
          name="phone_number"
          autoComplete="off"
          placeholder="Enter your Number"
          style={styles.input}
          value={formik.values.phone_number}
          onChange={formik.handleChange}
          onFocus={(e) => e.target.style.border = "1px solid darkcyan"}
          onBlur={(e) => e.target.style.border = "1px solid #ccc"}
        />
        {formik.touched.phone_number && formik.errors.phone_number ? (
          <div style={styles.error}>{formik.errors.phone_number}</div>
        ) : null}

        <label htmlFor="password" style={styles.label}>Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          autoComplete="off"
          placeholder="Enter your Password"
          style={styles.input}
          value={formik.values.password}
          onChange={formik.handleChange}
          onFocus={(e) => e.target.style.border = "1px solid darkcyan"}
          onBlur={(e) => e.target.style.border = "1px solid #ccc"}
        />
        {formik.touched.password && formik.errors.password ? (
          <div style={styles.error}>{formik.errors.password}</div>
        ) : null}

        <button type="submit" style={styles.button} disabled={!(formik.isValid && formik.dirty)}>
          Login
        </button>
      </form>
      <div style={styles.link}>
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Login;
