import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from "react-router-dom";

import { login, google } from "../redux/userSlice";

import {
  HeaderMobileContrainer,
  HeaderDesktopContrainer,
  FooterContrainer,
  BreadcrumbContrainer,
} from "../containers";

import { GoogleLogin, GoogleLogout } from "react-google-login";

import { gapi } from 'gapi-script';

const CLIENT_ID = "875563004528-j22iv43qq1nlnh375nt92nei0qb8oo15.apps.googleusercontent.com";

const LoginPage = () => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.user);
  const { isLogin = false, error } = store;

  const navigate = useNavigate();

  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password");
  const [message, setMessage] = useState("");

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: CLIENT_ID,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

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
      navigate("/home");
    }
  }, [isLogin]);

  useEffect(() => {
    if (!isLogin && error?.code === 'ERR_BAD_REQUEST') {
      setMessage("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  }, [isLogin, error]);


  // Success Handler
  const responseGoogleSuccess = (response) => {
    console.log('responseGoogleSuccess', response);

    const { name = "", email = "" } =  response?.profileObj;

    const params = {
      fullname: name,
      email: email,
    }

    dispatch(google(params));
  };

  // Error Handler
  const responseGoogleError = (response) => {
    console.log('responseGoogleError', response);
  };

  return (
    <div>

      <HeaderMobileContrainer />

      <div className="site">

        <HeaderDesktopContrainer />

        <div className="site__body">

          <BreadcrumbContrainer title="Đăng Nhập" />

          <div className="block">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6 d-flex" >
                  <div className="card flex-grow-1 mb-md-0">
                    <div className="card-body">
                      <h3 className="card-title">Đăng Nhập</h3>
                      <form onSubmit={((e) => handleSubmit(e))} method="post">
                        <div className="form-group">
                          <label>Tên đăng nhập</label>
                          <input
                            type="email"
                            name="username"
                            placeholder="Tên đăng nhập..."
                            className={`${username.length <= 0 ? 'form-control is-invalid' : 'form-control'}`}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label>Mật khẩu</label>
                          <input
                            type="password"
                            name="password"
                            placeholder="Mật khẩu..."
                            className={`${password.length <= 0 ? 'form-control is-invalid' : 'form-control'}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {/* <small className="form-text text-muted"><a href="#">Forgotten Password</a></small> */}
                        </div>
                        {
                          message && (<><span style={{ color: 'red' }}>{message}</span><br /></>)
                        }

                        <Link to='/forgotpass'>
                          Quên Mật Khẩu
                        </Link>

                        <br />

                        <button
                          type="submit"
                          className="btn btn-primary mt-4"
                          disabled={username.length === 0 || password.length === 0}
                        >
                          Đăng Nhập
                        </button>

                        <br /><br />

                        <hr />

                        <GoogleLogin
                          clientId={CLIENT_ID}
                          buttonText="Sign In with Google"
                          onSuccess={responseGoogleSuccess}
                          onFailure={responseGoogleError}
                          isSignedIn={false}
                          cookiePolicy={"single_host_origin"}
                        />
                      </form>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

        <FooterContrainer />

      </div>
    </div>
  );

}

export default LoginPage;
