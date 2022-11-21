import React, { useContext } from "react";
import { useFormik } from "formik";
import { MyContext } from "./context";
import { API } from "./api";
import { useNavigate } from "react-router-dom";

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
        setIsAuthenticated(true);
        setUser(userRes);
        localStorage.setItem("user", userRes);
        navigate("/");
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
            type="text"
            placeholder="Enter your password"
            onChange={handleChange}
            value={values.password}
            name="password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
