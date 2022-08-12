import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import jwt_decode from "jwt-decode";

function Register() {
  const clientID =
    "658768477090-b341dm91tjhdq4fte7mjuv49kf33ihms.apps.googleusercontent.com";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      })
      .catch((err) => console.log(err));

    navigate("../home");
    setEmail("");
    setPassword("");
  };

  function handleCallbackResponse(res) {
    // console.log("Encoded JWT token", res.credential);
    const userObj = jwt_decode(res.credential);
    console.log(userObj);
    auth.userAdd(jwt_decode(res.credential));
    localStorage.setItem("token", res.credential);
    navigate("../home");
  }

  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id: clientID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

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
      <div id="signInDiv"> </div>
    </div>
  );
};

export default Register;

//You have created a new client application that uses libraries for user authentication or authorization that will soon be deprecated. New clients must use the new libraries instead; existing clients must also migrate before these libraries are deprecated. See the [Migration Guide](https://developers.google.com/identity/gsi/web/guides/gis-migration) for more information.
