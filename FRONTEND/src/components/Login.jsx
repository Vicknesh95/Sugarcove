import { React, useState, useContext } from "react";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";
import RegisterModal from "./RegisterModal";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email cannot be empty";
    if (!password) newErrors.password = "Password cannot be empty";
    if (password && password.length < 8)
      newErrors.password = "Password must be atleast 8 characters long";
    if (password && password.length > 20)
      newErrors.password = "Password must be no longer than 20 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = async () => {
    if (!validate()) return;
    try {
      const response = await fetch(
        import.meta.env.VITE_SERVER + "/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (!response.ok) {
        throw new Error("fetch error");
      }
      const data = await response.json();
      localStorage.setItem("accessToken", data.access);
      userCtx.setAccessToken(data.access);
      const decoded = jwtDecode(data.access);
      userCtx.setRole(decoded.role);
      userCtx.setUserId(decoded.id);
      navigate("/");
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {showUpdateModal && (
        <RegisterModal setShowUpdateModal={setShowUpdateModal} />
      )}
      <div className="login-container">
        <div>
          <label>Email</label>
          <input
            type="text"
            className="LoginInput"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            className="LoginInput"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <button onClick={login}>Login</button>
        <button onClick={() => setShowUpdateModal(true)}>Register</button>
      </div>
    </>
  );
};

export default Login;
