import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from "react-router-dom";

import { login } from "../redux/userSlice";

const LoginPage = () => {

    const dispatch = useDispatch();
    const store = useSelector(state => state.user);
    const { isLogin = false, error } = store;

    const navigate = useNavigate();

    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("password");
    const [message, setMessage] = useState("Vui lòng điền thông tin đăng nhập!");

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = {
          username,
          password,
          grant_type: "password",
        }
    
        dispatch(login(params));
    };

    useEffect(() => {
        if (isLogin) {
            navigate("/dashboard");
        }

        if (!isLogin && error?.code === 'ERR_BAD_REQUEST') {
            setMessage("Tên đăng nhập hoặc mật khẩu không đúng!");
        }
    }, [isLogin]);

    useEffect(() => {
        if (!isLogin && error?.code === 'ERR_BAD_REQUEST') {
            setMessage("Tên đăng nhập hoặc mật khẩu không đúng!");
        }
    }, [isLogin, error]);

    return (
        <div class="hold-transition login-page">
            <div className="login-box">
                <div className="login-logo">
                    <a href="../../index2.html"><b>Web</b>ADMIN</a>
                </div>
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Thông Tin Đăng Nhập</p>
                        <form onSubmit={((e) => handleSubmit(e))} method="post">
                            <div className="input-group mb-3">
                                <input 
                                    id="exampleInputEmail"
                                    name="username"
                                    type="text"
                                    placeholder="Email..."
                                    className={`${username.length <= 0 ? 'form-control is-invalid' : 'form-control'}`}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    id="exampleInputPassword"
                                    name="password"
                                    type="password"
                                    placeholder="Mật khẩu..."
                                    className={`${password.length <= 0 ? 'form-control is-invalid' : 'form-control'}`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <p className="mb-3">
                                <span className="badge-danger">{message || ''}</span>
                            </p>
                            <div className="row">
                                <div className="col-12">
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-block"
                                    >
                                        Đăng Nhập
                                    </button>
                                </div>
                            </div>
                        </form>
                        {/* <div className="social-auth-links text-center mb-3">
                            <p>- OR -</p>
                            <a href="#" className="btn btn-block btn-primary">
                                <i className="fab fa-facebook mr-2" /> Sign in using Facebook
                            </a>
                            <a href="#" className="btn btn-block btn-danger">
                                <i className="fab fa-google-plus mr-2" /> Sign in using Google+
                            </a>
                        </div>
                        <p className="mb-1">
                            <a href="forgot-password.html">I forgot my password</a>
                        </p>
                        <p className="mb-0">
                            <a href="register.html" className="text-center">Register a new membership</a>
                        </p> */}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default LoginPage;
