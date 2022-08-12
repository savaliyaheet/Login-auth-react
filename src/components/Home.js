import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
function Home() {
  const auth = useContext(AuthContext);
  console.log(auth.token);
  // console.log(auth.user);
  return <div>Welcome to homepage, {auth.user.name}</div>;
}

export default Home;
