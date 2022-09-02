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

const AboutPage = () => {

  return (
    <div>

      <HeaderMobileContrainer />

      <div className="site">

        <HeaderMobileContrainer />

        <HeaderDesktopContrainer />

        {/* site__body */}
        <div className="site__body">

          <BreadcrumbContrainer title="Giới Thiệu" />

          <div className="block about-us">
            <div className="about-us__image" />
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12 col-xl-10">
                  <div className="about-us__body">
                    <h1 className="about-us__title">Giới Thiệu</h1>
                    <div className="about-us__text typography">
                      <p>Fashion Shop là nền tảng thương mại điện tử hàng đầu tại Việt Nam.</p>
                      <p>Ra mắt năm 2022, nền tảng thương mại Fashion shop được xây dựng nhằm cung cấp cho người dùng những trải nghiệm 
                        dễ dàng, an toàn và nhanh chóng khi mua sắm trực tuyến thông qua hệ thống hỗ trợ thanh toán và vận 
                        hành vững mạnh.</p>
                      <p>Chúng tôi có niềm tin mạnh mẽ rằng trải nghiệm mua sắm trực tuyến phải đơn giản, dễ dàng và mang đến 
                        cảm xúc vui thích. Niềm tin này truyền cảm hứng và thúc đẩy chúng tôi mỗi ngày tại FashionShop.</p>
                    </div>
                    <div className="about-us__team">
                      <h2 className="about-us__team-title">Liên Hệ</h2>
                      <div className="about-us__team-subtitle text-muted">Nếu bạn có thắc mắc vui lòng liên hệ <br /><Link to='/contact'>tại đây</Link> để được giải đáp.</div>
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

export default AboutPage;
