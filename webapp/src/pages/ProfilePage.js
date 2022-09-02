import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from "react-router-dom";

import { findByUser, updateProfile, changePass } from "../redux/userSlice";

import { useTranslation } from 'react-i18next';

import {
  HeaderMobileContrainer,
  HeaderDesktopContrainer,
  FooterContrainer,
  BreadcrumbContrainer,
} from "../containers";

const ProfilePage = () => {

  const { t } = useTranslation();

  const dispatch = useDispatch();
  const store = useSelector(state => state.user);
  const { isSuccess = false, isChangePass = false, selectedItem = {}, user = {}, error } = store;
  const { messages = {} } = selectedItem;

  const navigate = useNavigate();

  const [userid, setUserId] = useState(0);
  const [password, setPassword] = useState("");
  const [passwordNew, setPasswordNew] = useState("");

  const [allValues, setAllValues] = useState({});

  const [message, setMessage] = useState("");
  const [messagePass, setMessagePass] = useState("");

  const handleChangeValue = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = {
      accountId: userid,
      address: allValues?.address || '',
      birthday: allValues?.birthday || '' ,
      fullname: allValues?.fullname || '',
      phone: allValues?.phone || '',
    }

    dispatch(updateProfile(params));
  };

  const handleChangePass = (e) => {
    e.preventDefault();

    const params = {
      accountId: userid,
      password: password || '',
      passwordNew: passwordNew || '' ,
    }

    dispatch(changePass(params));
  };

  useEffect(() => {
    const userLogin = localStorage.getItem("userLogin");
    if (userLogin) {
      const user = JSON.parse(userLogin);
      setUserId(user?.userId || user?.id);
      dispatch(findByUser(user?.userId || user?.id));
    }
  }, []);

  useEffect(() => {
    if (user) {
      setAllValues(user);
    }
  }, [user]);

  useEffect(() => {
    if (isSuccess && error === '') {
      setMessage("Cập nhật dữ liệu thành công!");
    } else {
      if (!isSuccess && error !== '') {
        setMessage("Có lỗi xảy ra vui lòng thử lại!");
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isChangePass && error === '') {
      setMessagePass("Cập nhật dữ liệu thành công!");
    } else {
      if (!isChangePass) {
        setMessagePass("Có lỗi xảy ra vui lòng thử lại!");
      }
    }
  }, [isChangePass]);

  return (
    <div>

      <HeaderMobileContrainer />

      <div className="site">

        <HeaderDesktopContrainer />

        <div className="site__body">

          <BreadcrumbContrainer title="Tài Khoản" />

          <div className="block">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6 d-flex mt-4 mt-md-0">
                  <div className="card flex-grow-1 mb-0">
                    <div className="card-body">
                      <h3 className="card-title">Tài Khoản</h3>
                      <form onSubmit={((e) => handleSubmit(e))} method="post">
                        <div className="form-group">
                          <label htmlFor="inputFullname">Họ và Tên</label>
                          <input
                            id="inputFullname"
                            type="text"
                            name="fullname"
                            placeholder="Họ và Tên..."
                            className={`${allValues?.fullname?.length <= 0 || messages?.fullname ? 'form-control is-invalid' : 'form-control'}`}
                            value={allValues?.fullname}
                            onChange={(e) => handleChangeValue(e)}
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
                            className={`${allValues?.email?.length <= 0 || messages?.email ? 'form-control is-invalid' : 'form-control'}`}
                            value={allValues?.email}
                            onChange={(e) => handleChangeValue(e.target.value)}
                            disabled
                          />
                          <span id="inputEmail-error" class="error invalid-feedback">{t(messages?.email)}</span>
                        </div>
                        <div className="form-group">
                          <label htmlFor="inputFullname">Số Điện Thoại</label>
                          <input
                            id="inputPhone"
                            type="text"
                            name="phone"
                            placeholder="098767777"
                            className={`${allValues?.phone?.length <= 0 || messages?.phone ? 'form-control is-invalid' : 'form-control'}`}
                            value={allValues?.phone}
                            onChange={(e) => handleChangeValue(e)}
                          />
                          <span id="inputFullname-error" class="error invalid-feedback">{t(messages?.phone)}</span>
                        </div>
                        <div className="form-group">
                          <label htmlFor="inputAddress">Địa Chỉ</label>
                          <input
                            id="inputAddress"
                            type="text"
                            name="address"
                            placeholder="123 Đinh Bộ Lĩnh..."
                            className={`${allValues?.address?.length <= 0 || messages?.address ? 'form-control is-invalid' : 'form-control'}`}
                            value={allValues?.address}
                            onChange={(e) => handleChangeValue(e)}
                          />
                          <span id="inputAddress-error" class="error invalid-feedback">{t(messages?.address)}</span>
                        </div>
                        <div className="form-group">
                          <label htmlFor="inputBirthday">Ngày Sinh</label>
                          <input
                            id="inputBirthday"
                            type="date"
                            name="birthday"
                            placeholder="yyyy-MM-dd"
                            className={`${allValues?.birthday?.length <= 0 || messages?.birthday ? 'form-control is-invalid' : 'form-control'}`}
                            value={allValues?.birthday}
                            onChange={(e) => handleChangeValue(e)}
                          />
                          <span id="inputBirthday-error" class="error invalid-feedback">{t(messages?.birthday)}</span>
                        </div>
                        <span>{message}</span><br />
                        <button
                          type="submit"
                          className="btn btn-primary mt-4"
                        >
                          Cập Nhật
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 d-flex mt-4 mt-md-0">
                  <div className="card flex-grow-1 mb-0">
                    <div className="card-body">
                      <h3 className="card-title">Mật Khẩu</h3>
                      <form onSubmit={((e) => handleChangePass(e))} method="post">
                        <div className="form-group">
                          <label htmlFor="inputPassword">Mật Khẩu Cũ</label>
                          <input
                            id="inputPassword"
                            type="password"
                            name="password"
                            placeholder="Mật khẩu Cũ"
                            className={`${messages?.password ? 'form-control is-invalid' : 'form-control'}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <span id="inputPassword-error" class="error invalid-feedback">{t(messages?.password)}</span>
                        </div>
                        <div className="form-group">
                          <label htmlFor="inputPasswordNew">Mật Khẩu Mới</label>
                          <input
                            id="inputPasswordNew"
                            type="password"
                            name="passwordnew"
                            placeholder="Mật khẩu Mới"
                            className={`${messages?.passwordnew ? 'form-control is-invalid' : 'form-control'}`}
                            value={passwordNew}
                            onChange={(e) => setPasswordNew(e.target.value)}
                          />
                          <span id="inputPasswordNew-error" class="error invalid-feedback">{t(messages?.passwordnew)}</span>
                        </div>
                        <span>{messagePass}</span><br />
                        <button
                          type="submit"
                          className="btn btn-primary mt-4"
                        >
                          Đổi Mật Khẩu
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

export default ProfilePage;
