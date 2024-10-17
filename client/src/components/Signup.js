import React from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import axios from 'axios';

const Signup = ({ onSignup }) => {
  const navigate = useNavigate();
  const serverURL = process.env.REACT_APP_URL;

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      gender: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().required('Password is required'),
      phone: Yup.string().required('Phone number is required'),
      gender: Yup.string().required('Gender is required'),
    }),
    onSubmit: async (values) => {
      try {
       
        const response = await axios.post(`${serverURL}/users`, {
          user_name: values.name,
          phone_number: values.phone,
          email: values.email,
          gender: values.gender,
          password: values.password,
        });
        onSignup(response.data); 
        navigate('/login');
      } catch (error) {
        console.error("Signup error:", error);
        alert("There was an error during signup. Please try again.");
      }
    },
  });

  return (
    <div style={{ backgroundColor: "white", width: "30%", margin: "50px auto", padding: "40px", borderRadius: "10px", boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)" }}>
      <h3 style={{ textAlign: "center", color: "darkcyan" }}>Sign Up</h3>
      <form onSubmit={formik.handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          placeholder="Enter your name"
        />
        {formik.touched.name && formik.errors.name ? <div style={{ color: 'red' }}>{formik.errors.name}</div> : null}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          placeholder="Enter your email"
        />
        {formik.touched.email && formik.errors.email ? <div style={{ color: 'red' }}>{formik.errors.email}</div> : null}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          placeholder="Enter your password"
        />
        {formik.touched.password && formik.errors.password ? <div style={{ color: 'red' }}>{formik.errors.password}</div> : null}

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          placeholder="Enter your phone number"
        />
        {formik.touched.phone && formik.errors.phone ? <div style={{ color: 'red' }}>{formik.errors.phone}</div> : null}

        <label htmlFor="gender">Gender:</label>
        <select
          id="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
        >
          <option value="">Select your gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        {formik.touched.gender && formik.errors.gender ? <div style={{ color: 'red' }}>{formik.errors.gender}</div> : null}

        <button type="submit" style={{ marginTop: "15px", backgroundColor: "darkcyan", color: "white", border: "none", padding: "10px", cursor: "pointer", borderRadius: "5px", fontSize: "16px", fontWeight: "bold" }} disabled={!(formik.isValid && formik.dirty)}>
          Sign Up
        </button>
      </form>
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Signup;
