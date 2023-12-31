// Auth.js
import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

import "./Auth.css";
import MainNavigation from "../../Components/Navigation/MainNavigation";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
  };

  return (
    <div className="auth-container">
      <MainNavigation />
      {isLogin ? <Login /> : <SignUp />}
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button onClick={toggleForm}>{isLogin ? "Sign up" : "Login"}</button>
      </p>
    </div>
  );
};

export default Auth;
