import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import bg from "../../assets/bg.avif";
import logo from "../../assets/logo.jpg";

import { Spin } from "antd";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import "./Login.css";
import { login } from "../../redux/auth/action";
import { checkAuth } from "../../utils/checkAuth";

const Login = () => {
  const { loading, token } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  let initialData = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [showPass, setShowPass] = useState(false);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  useEffect(() => {
    const checkIfAuthenticated = async () => {
      const isAuthenticated = await checkAuth();
      if (isAuthenticated) {
        navigate(-1);
      }
    };

    checkIfAuthenticated();
  }, [navigate]);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <div className="login">
      {loading ? (
        <div className="loader">
          <Spin size="large" />
        </div>
      ) : (
        ""
      )}
      <div className="loginLeft">
        <div className="loginHeader">
          <img src={logo} />
          <p>Welcome to Cyethack </p>
        </div>
        <div className="loginInput">
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <input
              required
              type="email"
              placeholder="Email*"
              name="email"
              value={formData.email}
              onChange={(e) => handleFormChange(e)}
              maxLength={150}
            />
            <div>
              <input
                required
                type={showPass ? "text" : "password"}
                placeholder="Password*"
                name="password"
                value={formData.password}
                onChange={(e) => handleFormChange(e)}
                maxLength={128}
              />
              {formData.password.length ? (
                <div>
                  {showPass ? (
                    <AiOutlineEye onClick={() => setShowPass(!showPass)} />
                  ) : (
                    <AiOutlineEyeInvisible
                      onClick={() => setShowPass(!showPass)}
                    />
                  )}
                </div>
              ) : null}
            </div>
            <input type="submit" value="Login" />
          </form>
        </div>

        <div className="loginRedirect">
          Don't have an account?<Link to="/signup">Sign Up</Link>
        </div>
      </div>
      <div className="loginRight">
        <img src={bg} />
      </div>
    </div>
  );
};
export default Login;