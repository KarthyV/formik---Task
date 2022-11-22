import React, { useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "./api";
import { Link, useNavigate } from "react-router-dom";
import { MyContext } from "./context";
const formValidationSchema = yup.object({
  username: yup.string().min(6).required(),
  password: yup.string().required(),
  role: yup.string().required(),
});
const SignUp = () => {
  const navigate = useNavigate();
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(MyContext);
  const { values, handleChange, handleBlur, touched, handleSubmit, errors } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
        role: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        const res = await fetch(`${API}/users/signup`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const userRes = await res.json();
        if (res.status == 200 || res.status == 201) {
          setUser(userRes);
          setIsAuthenticated(true);
          localStorage.setItem("user", JSON.stringify(userRes));
          console.log(userRes);
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
            onBlur={handleBlur}
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
            onBlur={handleBlur}
            value={values.password}
            name="password"
          />
        </div>
        <div className="fieldBox">
          <h3>Role</h3>
          <div className="recipeTypeField">
            <label htmlFor="Admin">Admin</label>
            <input
              className="inputField"
              type="radio"
              name="role"
              value="Admin"
              onChange={handleChange}
              onBlur={handleBlur}
              id="Admin"
            />{" "}
            <label htmlFor="Normal">Normal</label>
            <input
              className="inputField"
              type="radio"
              name="role"
              onChange={handleChange}
              onBlur={handleBlur}
              value="Normal"
              id="Normal"
            />{" "}
            <label htmlFor="ReadOnly">ReadOnly</label>
            <input
              className="inputField"
              type="radio"
              name="role"
              onChange={handleChange}
              onBlur={handleBlur}
              value="ReadOnly"
              id="ReadOnly"
            />
          </div>
          <p>{errors.role && touched.role ? errors.role : null}</p>
        </div>
        <button type="submit">SignUp</button>
      </form>
      <p>
        <Link to="/login">Already have an account? Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
