import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };
    axios
      .post("https://reqres.in/api/login", data)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        auth.login();
        navigate("home");
      })
      .catch((err) => console.log(err));
  };

  const handleLoginResponse = (res) => {
    // console.log("JWT Token", res.credential);
    localStorage.setItem("token", res.credential);
    navigate("home");
  };
  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "658768477090-b341dm91tjhdq4fte7mjuv49kf33ihms.apps.googleusercontent.com",
      callback: handleLoginResponse,
    });

    google.accounts.id.renderButton(document.getElementById("loginInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);
  return (
    <div className="login">
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Email </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">Password </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div id="loginInDiv"></div>
    </div>
  );
}

export default Login;
