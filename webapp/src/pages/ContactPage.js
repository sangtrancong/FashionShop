import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from "react-router-dom";

import { loadItem, saveItems } from "../redux/cartSlice";

import {
  HeaderMobileContrainer,
  HeaderDesktopContrainer,
  FooterContrainer,
  BreadcrumbContrainer,
} from "../containers";

const ContactPage = () => {

  return (
    <div>

      <HeaderMobileContrainer />

      <div className="site">

        <HeaderMobileContrainer />

        <HeaderDesktopContrainer />

        {/* site__body */}
        <div className="site__body">

          <BreadcrumbContrainer title="Liên Hệ" />

          <div className="block">
            <div className="container">
              <div className="card mb-0">
                <div className="card-body contact-us">
                  <div className="contact-us__container">
                    <div className="row">
                      <div className="col-12 col-lg-6 pb-4 pb-lg-0">
                        <h4 className="contact-us__header card-title">Địa Chỉ Văn Phòng</h4>
                        <div className="contact-us__address">
                          <p>Tầng 12, Toà nhà VietJet Plaza, 60A Trường Sơn, P.2, Q.Tân Bình, Tp.HCM, Việt Nam<br />
                          Điện Thoại: (800) 060-0730</p>
                          <p><strong>Thời Gian</strong><br />Thứ 2 đến Thứ 7: 8am-8pm</p>
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <h4 className="contact-us__header card-title">Liên Hệ</h4>
                        <form>
                          <div className="form-row">
                            <div className="form-group col-md-6">
                              <label htmlFor="form-name">Họ và Tên</label>
                              <input type="text" id="form-name" className="form-control" placeholder="Họ và Tên" />
                            </div>
                            <div className="form-group col-md-6">
                              <label htmlFor="form-email">Email</label>
                              <input type="email" id="form-email" className="form-control" placeholder="Email" />
                            </div>
                          </div>
                          <div className="form-group"><label htmlFor="form-subject">Tiêu Đề</label>
                            <input type="text" id="form-subject" className="form-control" placeholder="Tiêu Đề" />
                          </div>
                          <div className="form-group"><label htmlFor="form-message">Nội Dung</label>
                          <textarea id="form-message" className="form-control" rows={4} defaultValue={""} /></div>
                          <button type="submit" className="btn btn-primary">Gủi Yêu Cầu</button>
                        </form>
                      </div>
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

export default ContactPage;
