import { useFormik } from "formik";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "./api";
import { MyContext } from "./context";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(MyContext);

  const { values, handleChange, handleBlur, touched, handleSubmit, errors } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      onSubmit: async (values) => {
        const res = await fetch(`${API}/users/login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const userRes = await res.json();
        console.log(userRes);
        if (res.status == 200 || res.status == 201) {
          setUser(userRes);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(userRes));
          navigate("/");
        } else {
          alert(userRes.message);
        }
      },
    });
  return (
    <div className="login_formContainer">
      <form onSubmit={handleSubmit}>
        <div className="fieldBox">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            onChange={handleChange}
            value={values.username}
            name="username"
          />
        </div>
        <div className="fieldBox">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            value={values.password}
            name="password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        <Link to="/signup">Don't have an account? Click Here!</Link>
      </p>
    </div>
  );
};

export default Login;
