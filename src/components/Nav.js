import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

function Nav() {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      <nav className="nav">
        <div className="nav__left">
          <NavLink to={auth.token ? "home" : "/"}>Home</NavLink>
        </div>
        {localStorage.getItem("token") ? (
          <div className="nav__right">
            <button
              onClick={() => {
                auth.logout();
                navigate("");
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="nav__right">
            <NavLink to="login">Login</NavLink>
            <NavLink to="register">Register</NavLink>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Nav;
