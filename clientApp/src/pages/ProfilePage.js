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
      setMessage("C???p nh???t d??? li???u th??nh c??ng!");
    } else {
      if (!isSuccess && error !== '') {
        setMessage("C?? l???i x???y ra vui l??ng th??? l???i!");
      }
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isChangePass && error === '') {
      setMessagePass("C???p nh???t d??? li???u th??nh c??ng!");
    } else {
      if (!isChangePass) {
        setMessagePass("C?? l???i x???y ra vui l??ng th??? l???i!");
      }
    }
  }, [isChangePass]);

  return (
    <div>

      <HeaderMobileContrainer />

      <div className="site">

        <HeaderDesktopContrainer />

        <div className="site__body">

          <BreadcrumbContrainer title="T??i Kho???n" />

          <div className="block">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6 d-flex mt-4 mt-md-0">
                  <div className="card flex-grow-1 mb-0">
                    <div className="card-body">
                      <h3 className="card-title">T??i Kho???n</h3>
                      <form onSubmit={((e) => handleSubmit(e))} method="post">
                        <div className="form-group">
                          <label htmlFor="inputFullname">H??? v?? T??n</label>
                          <input
                            id="inputFullname"
                            type="text"
                            name="fullname"
                            placeholder="H??? v?? T??n..."
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
                            placeholder="?????a ch??? email..."
                            className={`${allValues?.email?.length <= 0 || messages?.email ? 'form-control is-invalid' : 'form-control'}`}
                            value={allValues?.email}
                            onChange={(e) => handleChangeValue(e.target.value)}
                            disabled
                          />
                          <span id="inputEmail-error" class="error invalid-feedback">{t(messages?.email)}</span>
                        </div>
                        <div className="form-group">
                          <label htmlFor="inputFullname">S??? ??i???n Tho???i</label>
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
                          <label htmlFor="inputAddress">?????a Ch???</label>
                          <input
                            id="inputAddress"
                            type="text"
                            name="address"
                            placeholder="123 ??inh B??? L??nh..."
                            className={`${allValues?.address?.length <= 0 || messages?.address ? 'form-control is-invalid' : 'form-control'}`}
                            value={allValues?.address}
                            onChange={(e) => handleChangeValue(e)}
                          />
                          <span id="inputAddress-error" class="error invalid-feedback">{t(messages?.address)}</span>
                        </div>
                        <div className="form-group">
                          <label htmlFor="inputBirthday">Ng??y Sinh</label>
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
                          C???p Nh???t
                        </button>
                      </form>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 d-flex mt-4 mt-md-0">
                  <div className="card flex-grow-1 mb-0">
                    <div className="card-body">
                      <h3 className="card-title">M???t Kh???u</h3>
                      <form onSubmit={((e) => handleChangePass(e))} method="post">
                        <div className="form-group">
                          <label htmlFor="inputPassword">M???t Kh???u C??</label>
                          <input
                            id="inputPassword"
                            type="password"
                            name="password"
                            placeholder="M???t kh???u C??"
                            className={`${messages?.password ? 'form-control is-invalid' : 'form-control'}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <span id="inputPassword-error" class="error invalid-feedback">{t(messages?.password)}</span>
                        </div>
                        <div className="form-group">
                          <label htmlFor="inputPasswordNew">M???t Kh???u M???i</label>
                          <input
                            id="inputPasswordNew"
                            type="password"
                            name="passwordnew"
                            placeholder="M???t kh???u M???i"
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
                          ?????i M???t Kh???u
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
