import "./App.css";
import { NavLink, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Register from "./components/Register";
import Home from "./components/Home";
import AuthContext from "./context/AuthProvider";
import { useContext } from "react";

function App() {
  const auth = useContext(AuthContext);
  console.log(auth.token);
  return (
    <div className="App">
      <Nav />

      {auth.token ? (
        <Routes>
          <Route path="home" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<Home />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
