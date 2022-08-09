import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    axios
      .post("https://reqres.in/api/register", data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        auth.login();
        setSuccess(true);
      })
      .catch((err) => console.log(err));

    navigate("../home");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="register">
      <h2>Register</h2>
      <form onSubmit={handleRegisterSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
