import React, { useState } from "react";
import './login_register.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const LoginRegister = () => {
    const [action, setAction] = useState('');
    const navigate = useNavigate();

    const registerLink = () => {
        setAction(' active');
    };

    const loginLink = () => {
        setAction('');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        // Ở đây bạn có thể thêm logic xác thực đăng nhập
        // Nếu đăng nhập thành công:
        navigate('/home');
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Xử lý logic đăng ký
    };

    return (
        <div className="login_register-page">
            <div className={`wrapper${action}`}>
            <div className="form-box login">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                        <FaUser className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <FaLock className="icon"/>
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" />Remember me</label>
                        <a href="#">Forgot password</a>
                    </div>

                    <button type="submit">Login</button>
                    <div className="register-link">
                        <p>
                            Don't have an account <a href="#" onClick={registerLink}>Register</a>
                        </p>
                    </div>
                </form>
            </div>

            <div className="form-box register">
                <form onSubmit={handleRegister}>
                    <h1>Registration</h1>
                    <div className="input-box">
                        <input type="username" placeholder="Username" required />
                        <FaUser className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder="Email" required />
                        <FaEnvelope className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required />
                        <FaLock className="icon"/>
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" />I agree to the terms & conditions</label>
                    </div>

                    <button type="submit">Register</button>
                    <div className="register-link">
                        <p>
                            Already have an account <a href="#" onClick={loginLink}>Login</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
        </div>
    );
};

export default LoginRegister;