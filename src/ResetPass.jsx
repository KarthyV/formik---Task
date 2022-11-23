import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "./api";
import { MyContext } from "./context";

const ResetPass = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const { id } = useParams();
  const { setUser, setIsAuthenticated } = useContext(MyContext);

  const handleVerification = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await fetch(`${API}/users/verify-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token }),
    });
    console.log(res);
    if (res.status == 200) {
      setVerified(true);
    }
  };
  const handleChangePassword = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const res = await fetch(`${API}/users/change-password/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password }),
    });
    console.log(res);
    if (res.status == 200) {
      const data = await res.json();
      alert("Password updated successfully");
      setUser(data);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(userRes));
      navigate("/");
    }
  };
  return (
    <div className="resetForm">
      {!verified && (
        <div className="token_form">
          <label>Paste the Link Here!</label>
          <input
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <button onClick={handleVerification}>Verify Link</button>
        </div>
      )}
      {verified && (
        <div className="form_changePass">
          <form>
            <h3>Change Password</h3>
            <div className="fieldBox">
              <label>New Password</label>
              <input
                type="text"
                value={password}
                name="password"
                className="forget_pass"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button onClick={handleChangePassword}>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ResetPass;
