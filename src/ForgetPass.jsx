import React, { useState } from "react";

const ForgetPass = () => {
  const [username, setUsername] = useState("");
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
        <button>Submit</button>
      </form>
    </>
  );
};

export default ForgetPass;
