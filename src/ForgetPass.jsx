import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "./api";

const ForgetPass = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username);
    const res = await fetch(`${API}/users/forget-password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email }),
    });
    const data = await res.json();
    if (res.status == 200) {
      navigate(`/reset-password/${data.user._id}`);
    }
  };
  return (
    <>
      <form className="forget_form">
        <h3>Forget Password</h3>
        <div className="fieldBox">
          <label>Enter Username</label>
          <input
            type="text"
            value={username}
            name="username"
            className="forget_pass"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="fieldBox">
          <label>Enter Email for Verification</label>
          <input
            type="text"
            value={email}
            name="username"
            className="forget_pass"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </>
  );
};

export default ForgetPass;
