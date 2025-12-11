import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axios";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth", {
        username,
        password,
      });

      if (response) {
        sessionStorage.setItem("accessToken", response.data.accessToken);
        sessionStorage.setItem("userId", response.data.user.id);
      }

      toast.success("Login successful!");
      setTimeout(() => navigate("/home"), 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      toast.error(errorMessage);
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <button
            type="button"
            className="register-button"
            onClick={handleRegister}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
