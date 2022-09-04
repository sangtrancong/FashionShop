import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from "react-router-dom";

import { register, cleanUp } from "../redux/userSlice";

import { useTranslation } from 'react-i18next';

import {
  HeaderMobileContrainer,
  HeaderDesktopContrainer,
  FooterContrainer,
  BreadcrumbContrainer,
} from "../containers";

const RegisterPage = () => {

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const store = useSelector(state => state.user);
  const { isSuccess = false, selectedItem = {} } = store;
  const { data = {}, messages = {} } = selectedItem;

  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = {
      fullname: fullname,
      email: email,
      password: password,
    }

    dispatch(register(params));
  };

  useEffect(() => {
    dispatch(cleanUp());
  }, []);

  useEffect(() => {
    if (data?.status === 'SUCCESS') {
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div>

      <HeaderMobileContrainer />

      <div className="site">

        <HeaderDesktopContrainer />

        <div className="site__body">

          <BreadcrumbContrainer title="Đăng Ký" />

          <div className="block">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6 d-flex mt-4 mt-md-0">
                  <div className="card flex-grow-1 mb-0">
                    <div className="card-body">
                      <h3 className="card-title">Đăng Ký</h3>
                      <form onSubmit={((e) => handleSubmit(e))} method="post">
                        <div className="form-group">
                          <label htmlFor="inputFullname">Họ và Tên</label>
                          <input
                            id="inputFullname"
                            type="text"
                            name="fullname"
                            placeholder="Họ và Tên..."
                            className={`${fullname.length <= 0 || fullname?.email ? 'form-control is-invalid' : 'form-control'}`}
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
                          />
                          <span id="inputFullname-error" class="error invalid-feedback">{t(messages?.fullname)}</span>
                        </div>
                        <div className="form-group">
                          <label htmlFor="inputEmail">Email</label>
                          <input
                            id="inputEmail"
                            type="email"
                            name="email"
                            placeholder="Địa chỉ email..."
                            className={`${email.length <= 0 || messages?.email ? 'form-control is-invalid' : 'form-control'}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <span id="inputEmail-error" class="error invalid-feedback">{t(messages?.email)}</span>
                        </div>
                        <div className="form-group">
                          <label htmlFor="inputPassword">Mật Khẩu</label>
                          <input
                            id="inputPassword"
                            type="password"
                            name="password"
                            placeholder="Mật khẩu"
                            className={`${password.length <= 0 || password?.email ? 'form-control is-invalid' : 'form-control'}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <span id="inputPassword-error" class="error invalid-feedback">{t(messages?.password)}</span>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-primary mt-4"
                          disabled={fullname.length === 0 || email.length === 0 || password.length === 0}
                        >
                          Đăng Ký
                        </button>
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

export default RegisterPage;
