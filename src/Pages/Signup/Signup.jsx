import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import bg from "../../assets/bg.avif";
import logo from "../../assets/logo.jpg";

import { Spin } from "antd";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Signup = () => {
  const { loading } = useSelector((store) => store.auth);

  let initialData = {
    name: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialData);
  const [showPass, setShowPass] = useState(false);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.replace(/\s/g, ""),
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

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
              type="name"
              placeholder="Username*"
              name="name"
              value={formData.name}
              onChange={(e) => handleFormChange(e)}
              maxLength={80}
            />
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
          Already have an account?<Link to="/login">Login</Link>
        </div>
      </div>
      <div className="loginRight">
        <img src={bg} />
      </div>
    </div>
  );
};
export default Signup;
