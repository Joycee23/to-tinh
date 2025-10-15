import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (password === "anhyeuem") {
      navigate("/loveheart");
    } else {
      alert("Mật khẩu không đúng! Hãy thử lại nhé 💔");
    }
  };

  return (
    <div className="login-container">
      <div className="hearts-background">
        <div className="heart heart1">❤️</div>
        <div className="heart heart2">💕</div>
        <div className="heart heart3">💖</div>
        <div className="heart heart4">💗</div>
        <div className="heart heart5">💝</div>
        <div className="heart heart6">❤️</div>
      </div>
      
      <div className="login-box">
        <div className="romantic-header">
          <h1 className="main-title">Dành Cho Em</h1>
          <p className="subtitle">Một điều đặc biệt đang chờ em...</p>
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <div className="input-wrapper">
              <span className="input-icon">🔐</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mật khẩu của Trái Tim..."
                required
                className="password-input"
              />
            </div>
          </div>
          
          <button type="submit" className="login-btn">
            <span>Đồng Ý</span>
            <span className="btn-icon">💝</span>
          </button>
        </form>
        
        <div className="romantic-footer">
          <p className="hint">Mật Khẩu Phải Ghi Liền Không Dấu Nhoo 💕</p>
        </div>
      </div>
    </div>
  );
};

export default Login;