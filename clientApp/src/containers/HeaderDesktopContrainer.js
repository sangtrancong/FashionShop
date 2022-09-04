import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from "react-router-dom";

import { logout } from "../redux/userSlice";

const HeaderDesktopContrainer = ({
  title,
  link,
}) => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.cart);
  const { allData = [] } = store;

  const [fullname, setFullname] = useState('');
  const [keyword, setKeyword] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const userLogin = localStorage.getItem("userLogin");
    if (userLogin) {
      const user = JSON.parse(userLogin);
      setFullname(user.fullname);
    }
  }, [])

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("userLogin");
    navigate("/login");

    dispatch(logout());
  }

  const handleProfile = (e) => {
    e.preventDefault();
    navigate("/profile");
  }

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/shop/" + keyword);
  }

  return (
    <header className="site__header d-lg-block d-none">
      <div className="site-header">
        {/* .topbar */}
        <div className="site-header__topbar topbar">
          <div className="topbar__container container">
            <div className="topbar__row">
              {/* <div className="topbar__item topbar__item--link"><a className="topbar-link" href="about-us.html">About Us</a></div>
              <div className="topbar__item topbar__item--link"><a className="topbar-link" href="contact-us.html">Contacts</a></div>
              <div className="topbar__item topbar__item--link"><a className="topbar-link" href="#">Store
                Location</a></div>
              <div className="topbar__item topbar__item--link"><a className="topbar-link" href="track-order.html">Track Order</a></div>
              <div className="topbar__item topbar__item--link"><a className="topbar-link" href="blog-classic.html">Blog</a></div> */}
              <div className="topbar__spring" />
              {
                fullname && <div className="topbar__item topbar__item--link">
                  <button className="topbar-link" type="button" onClick={(e) => handleProfile(e)}>{`Xin chào, ${fullname}`}</button>
                  <button className="topbar-link" type="button" onClick={(e) => handleLogout(e)}>Đăng Xuất</button>
                </div>
              }
              {
                !fullname && <div className="topbar__item topbar__item--link">
                  <Link to="/login" className="topbar-link mr-3" type="button">Đăng Nhập</Link>
                  <Link to="/register" className="topbar-link" type="button">Đăng Ký</Link>
                </div>
              }
            </div>
          </div>
        </div>{/* .topbar / end */}
        <div className="site-header__middle container">
          <div className="site-header__logo"><Link to="/home">
          <img style={{maxWidth:'250px'}} src='/images/logos/logo.png'/>
            </Link></div>
          <div className="site-header__search">
            <div className="search">
              <form className="search__form" action="#">
                <input className="search__input" name="search"
                  placeholder="Bạn muốn mua gì..." aria-label="Site search" type="text" autoComplete="off"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button className="search__button" type="submit" onClick={(e) => handleSearch(e)}>
                  <svg width="20px" height="20px"><use xlinkHref="images/sprite.svg#search-20" /></svg>
                </button>
                <div className="search__border" />
              </form>
            </div>
          </div>
          <div className="site-header__phone">
            <div className="site-header__phone-title">Liên Hệ</div>
            <div className="site-header__phone-number">(800) 060-0730</div>
          </div>
        </div>
        <div className="site-header__nav-panel">
          <div className="nav-panel">
            <div className="nav-panel__container container">
              <div className="nav-panel__row">
                <div className="nav-panel__nav-links nav-links">
                  <ul className="nav-links__list">
                    <li className="nav-links__item"><Link to="/home"><span>Trang Chủ</span></Link></li>
                    <li className="nav-links__item"><Link to="/about"><span>Giới Thiệu</span></Link></li>
                    <li className="nav-links__item"><Link to="/shop"><span>Cửa Hàng</span></Link></li>
                    <li className="nav-links__item"><Link to="/cart"><span>Giỏ Hàng</span></Link></li>
                    <li className="nav-links__item"><Link to="/order"><span>Đơn Hàng</span></Link></li>
                    <li className="nav-links__item"><Link to="/checkout"><span>Thanh Toán</span></Link></li>
                    <li className="nav-links__item"><Link to="/contact"><span>Liên Hệ</span></Link></li>
                  </ul>
                </div>{/* .nav-links / end */}
                <div className="nav-panel__indicators">
                  {/* <div className="indicator"><a href="wishlist.html" className="indicator__button"><span className="indicator__area"><svg width="20px" height="20px">
                    <use xlinkHref="images/sprite.svg#heart-20" />
                  </svg> <span className="indicator__value">0</span></span></a></div> */}
                  <div className="indicator indicator--trigger--click">
                    <Link to="/cart" className="indicator__button">
                      <span className="indicator__area">
                        <svg width="20px" height="20px">
                          <use xlinkHref="images/sprite.svg#cart-20" />
                        </svg>
                        <span className="indicator__value">{allData?.length || 0}</span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

}

export default HeaderDesktopContrainer;
