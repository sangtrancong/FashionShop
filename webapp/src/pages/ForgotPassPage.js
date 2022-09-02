import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from "react-router-dom";

import { forgotpass, cleanUp } from "../redux/userSlice";

import { useTranslation } from 'react-i18next';

import {
  HeaderMobileContrainer,
  HeaderDesktopContrainer,
  FooterContrainer,
  BreadcrumbContrainer,
} from "../containers";

const ForgotPassPage = () => {

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const store = useSelector(state => state.user);
  const { status = false, isSuccess = false, selectedItem = {} } = store;
  const { data = {}, messages = {} } = selectedItem;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = {
      email: email,
    }

    dispatch(forgotpass(params));
  };

  useEffect(() => {
    dispatch(cleanUp());
  }, []);

  useEffect(() => {
    if (status === 'SUCCESS') {
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div>

      <HeaderMobileContrainer />

      <div className="site">

        <HeaderDesktopContrainer />

        <div className="site__body">

          <BreadcrumbContrainer title="Quên Mật Khẩu" />

          <div className="block">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6 d-flex mt-4 mt-md-0">
                  <div className="card flex-grow-1 mb-0">
                    <div className="card-body">
                      <h3 className="card-title">Quên Mật Khẩu</h3>
                      <form onSubmit={((e) => handleSubmit(e))} method="post">
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
                        <button
                          type="submit"
                          className="btn btn-primary mt-4"
                          disabled={email.length === 0}
                        >
                          Gửi Yêu Cầu
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

export default ForgotPassPage;
