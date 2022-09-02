import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from "react-router-dom";

import { fetchAllData } from "../redux/homeSlice";
import { setQuery } from "../redux/querySlice";

import { Slide } from 'react-slideshow-image';

import { FooterContrainer } from "../containers/";

import Slider from "../components/slider";

import ConfigUtil from '../utils/ConfigUtil';

import { logout } from "../redux/userSlice";

const HomePage = () => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.home);
  const { allData = [], metadata = {} } = store;

  const storeCart = useSelector(state => state.cart);

  const query = useSelector(state => state.query);

  const navigate = useNavigate();

  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);

  const [productHots, setProductHots] = useState([]);
  const [productRatings, setProductRatings] = useState([]);
  const [productComments, setProductComments] = useState([]);
  const [productBestsellers, setProductBestsellers] = useState([]);

  const [fullname, setFullname] = useState('');
  const [keyword, setKeyword] = useState('');

  const productFeature = productHots[0];

  let productFeatureAttribute = productFeature?.colorAttributes[0]
  if (!productFeatureAttribute) {
    productFeatureAttribute = productFeature?.sizeAttributes[0];
  }
  const productFeaturePrice = productFeatureAttribute?.discount.toLocaleString('en-US') || productFeatureAttribute?.price.toLocaleString('en-US');

  useEffect(() => {
    dispatch(fetchAllData());
    const userLogin = localStorage.getItem("userLogin");
    if (userLogin) {
      const user = JSON.parse(userLogin);
      setFullname(user.fullname);
    }
  }, []);

  useEffect(() => {
    if (metadata) {
      if (metadata?.categorys) {
        setCategoryList(JSON.parse(metadata?.categorys));
      }
      if (metadata?.brands) {
        setBrandList(JSON.parse(metadata?.brands));
      }
      if (metadata?.productRatings) {
        setProductRatings(JSON.parse(metadata?.productRatings));
      }
      if (metadata?.productComments) {
        setProductComments(JSON.parse(metadata?.productComments));
      }
      if (metadata?.productPromotions) {
        setProductBestsellers(JSON.parse(metadata?.productPromotions));
      }
      if (metadata?.productHot) {
        setProductHots(JSON.parse(metadata?.productHot));
      }
    }
  }, [metadata]);

  const handleCategoryFilter = (e, item) => {
    e.preventDefault();

    const params = {
      ...query,
      categoryIds: [
        ...query.categoryIds,
        item.id
      ],
    }
    setQuery(params);
  };

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
    <div>
      <div className="site">
        <header className="site__header d-lg-block d-none">
          <div className="site-header">
            {/* .topbar */}
            <div className="site-header__topbar topbar">
              <div className="topbar__container container">
                <div className="topbar__row">
                  {/* <div className="topbar__item topbar__item--link"><a className="topbar-link" href="about-us.html">Về chúng tôi</a></div>
                  <div className="topbar__item topbar__item--link"><a className="topbar-link" href="contact-us.html">Liên hệ</a></div>
                  <div className="topbar__item topbar__item--link"><a className="topbar-link" href="#">Địa chỉ</a></div>
                  <div className="topbar__item topbar__item--link"><a className="topbar-link" href="track-order.html">Theo dõi đơn hàng</a></div>
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
              <div className="site-header__logo"><Link to="/home"><img style={{maxWidth:'250px'}} src='/images/logos/logo.png'/></Link></div>
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
                    <div className="nav-panel__departments">
                      {/* .departments */}
                      <div className="departments departments--opened departments--fixed" data-departments-fixed-by=".block-slideshow">
                        <div className="departments__body">
                          <div className="departments__links-wrapper">
                            <ul className="departments__links">
                              {
                                categoryList?.map((item, index) => {
                                  return <li className="departments__item" key={index}>
                                    <a onClick={(e) => handleCategoryFilter(e, item)}>{item.name}</a>
                                  </li>
                                })
                              }
                            </ul>
                          </div>
                        </div>
                        <button className="departments__button">
                          <svg className="departments__button-icon" width="18px" height="14px">
                            <use xlinkHref="images/sprite.svg#menu-18x14" />
                          </svg>
                          Danh Mục Sản Phẩm
                        </button>
                      </div>{/* .departments / end */}
                    </div>{/* .nav-links */}
                    <div className="nav-panel__nav-links nav-links">
                      <ul className="nav-links__list">
                        <li className="nav-links__item"><Link to={'/home'} ><span>Trang Chủ </span></Link></li>
                        <li className="nav-links__item"><Link to={'/about'} ><span>Giới Thiệu</span></Link></li>
                        <li className="nav-links__item"><Link to={'/shop'} ><span>Cửa Hàng</span></Link></li>
                        <li className="nav-links__item"><Link to={'/cart'} ><span>Giỏ Hàng</span></Link></li>
                        <li className="nav-links__item"><Link to={'/order'} ><span>Đơn Hàng</span></Link></li>
                        <li className="nav-links__item"><Link to={'/contact'} ><span>Liên Hệ</span></Link></li>
                      </ul>
                    </div>{/* .nav-links / end */}
                    <div className="nav-panel__indicators">
                      <div className="indicator indicator--trigger--click">
                        <Link to="/cart" className="indicator__button">
                          <span className="indicator__area">
                            <svg width="20px" height="20px">
                              <use xlinkHref="images/sprite.svg#cart-20" />
                            </svg>
                            <span className="indicator__value">{storeCart?.allData?.length || 0}</span>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>{/* desktop site__header / end */}
        {/* site__body */}
        <div className="site__body">
          {/* .block-slideshow */}
          <div className="block-slideshow block-slideshow--layout--with-departments block">
            <div className="container">
              <div className="row">
                <div className="col-12 col-lg-9 offset-lg-3">
                  <Slider />
                </div>
              </div>
            </div>
          </div>{/* .block-slideshow / end */}
          {/* .block-features */}
          <div className="block block-features block-features--layout--classic">
            <div className="container">
              <div className="block-features__list">
                <div className="block-features__item">
                  <div className="block-features__icon"><svg width="48px" height="48px">
                    <use xlinkHref="images/sprite.svg#fi-free-delivery-48" />
                  </svg></div>
                  <div className="block-features__content">
                    <div className="block-features__title">Miễn Phí Giao Hàng</div>
                    <div className="block-features__subtitle">Với đơn hàng nội thành</div>
                  </div>
                </div>
                <div className="block-features__divider" />
                <div className="block-features__item">
                  <div className="block-features__icon"><svg width="48px" height="48px">
                    <use xlinkHref="images/sprite.svg#fi-24-hours-48" />
                  </svg></div>
                  <div className="block-features__content">
                    <div className="block-features__title">Hỗ trợ 24/7</div>
                    <div className="block-features__subtitle">Luôn được hỗ trợ</div>
                  </div>
                </div>
                <div className="block-features__divider" />
                <div className="block-features__item">
                  <div className="block-features__icon"><svg width="48px" height="48px">
                    <use xlinkHref="images/sprite.svg#fi-payment-security-48" />
                  </svg></div>
                  <div className="block-features__content">
                    <div className="block-features__title">An toàn 100%</div>
                    <div className="block-features__subtitle">Thanh toán an toàn</div>
                  </div>
                </div>
                <div className="block-features__divider" />
                <div className="block-features__item">
                  <div className="block-features__icon"><svg width="48px" height="48px">
                    <use xlinkHref="images/sprite.svg#fi-tag-48" />
                  </svg></div>
                  <div className="block-features__content">
                    <div className="block-features__title">Nhiều Ưu Đãi</div>
                    <div className="block-features__subtitle">Giảm giá lên đến 50%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>{/* .block-features / end */}

          {/* .block-banner */}
          <div className="block block-banner">
            <div className="container"><a href="#" className="block-banner__body">
              <div className="block-banner__image block-banner__image--desktop" style={{ backgroundImage: 'url("images/banners/banner-clothes.jpg")' }} />
              <div className="block-banner__image block-banner__image--mobile" style={{ backgroundImage: 'url("images/banners/banner-clothes.jpg")' }} />
              <div className="block-banner__title">STROYKAI</div>
              <div className="block-banner__text">Nền tảng thương mại điện tử hàng đầu tại Việt Nam.</div>
              <div className="block-banner__button">
                <Link to="/shop" className="btn btn-sm btn-primary">Xem Cửa Hàng</Link>
              </div>
            </a></div>
          </div>{/* .block-banner / end */}
          {/* .block-products */}
          <div className="block block-products block-products--layout--large-first">
            <div className="container">
              <div className="block-header">
                <h3 className="block-header__title">Sản Phẩm mới nhất</h3>
                <div className="block-header__divider" />
              </div>
              <div className="block-products__body">
                <div className="block-products__featured">
                  <div className="block-products__featured-item">
                    <div className="product-card">
                      <div className="product-card__image">
                        <Link to={`/product/${productFeature?.id}`} >
                          <img src={ConfigUtil.HOST_URL + productFeature?.image} width={320} height={400} alt={productFeature?.name} />
                        </Link>
                      </div>
                      <div className="product-card__info">
                        <div className="product-card__name">
                          <Link to={`/product/${productFeature?.id}`} >
                            {productFeature?.name}
                          </Link>
                        </div>
                      </div>
                      <div className="product-card__actions">
                        <div className="product-card__prices">
                          {productFeaturePrice} VNĐ
                        </div>
                        <div className="product-card__buttons">
                          <Link to={`/product/${productFeature?.id}`} className="btn btn-primary product-card__addtocart" >
                            Xem Chi Tiết
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block-products__list">
                  {
                    allData?.map((item, index) => {
                      let attribute = item?.colorAttributes[0];
                      if (!attribute) {
                        attribute = item?.sizeAttributes[0];
                      }
                      const price =  attribute?.price.toLocaleString('en-US');

                      return <div className="block-products__list-item" key={index}>
                        <div className="product-card">
                          <div className="product-card__badges-list">
                            <div className="product-card__badge product-card__badge--hot">New</div>
                          </div>
                          <div className="product-card__image">
                            <Link to={`/product/${item?.id}`} >
                              <img src={ConfigUtil.HOST_URL + item?.image} width={200} height={200} alt={item?.name} />
                            </Link>
                          </div>
                          <div className="product-card__info">
                            <div className="product-card__name">
                              <Link to={`/product/${item?.id}`} >{item.name}</Link>
                            </div>
                          </div>
                          <div className="product-card__actions">
                            <div className="product-card__prices">{price} VNĐ</div>
                          </div>
                        </div>
                      </div>
                    })
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="block block-product-columns d-lg-block d-none">
            <div className="container">
              <div className="row">
                <div className="col-4">
                  <div className="block-header">
                    <h3 className="block-header__title">Sản phẩm hot nhất</h3>
                    <div className="block-header__divider" />
                  </div>
                  <div className="block-product-columns__column">
                    {
                      productRatings?.map((item, index) => {
                        let attribute = item?.colorAttributes[0];
                        if (!attribute) {
                          attribute = item?.sizeAttributes[0];
                        }
                        const price = attribute?.discount.toLocaleString('en-US') || attribute?.price.toLocaleString('en-US');

                        return <div className="block-product-columns__item" key={index} >
                          <div className="product-card product-card--layout--horizontal">
                            <div className="product-card__badges-list">
                              <div className="product-card__badge product-card__badge--new">Hot</div>
                            </div>
                            <div className="product-card__image">
                              <Link to={`/product/${item?.id}`} >
                                <img src={ConfigUtil.HOST_URL + item?.image} width={200} height={100} alt={item?.name} />
                              </Link>
                            </div>
                            <div className="product-card__info">
                              <div className="product-card__name">
                                <Link to={`/product/${item?.id}`} >
                                  {item?.name}
                                </Link>
                              </div>
                            </div>
                            <div className="product-card__actions">
                              <div className="product-card__prices">{price} VNĐ</div>
                            </div>
                          </div>
                        </div>
                      })
                    }

                  </div>
                </div>
                <div className="col-4">
                  <div className="block-header">
                    <h3 className="block-header__title">Sản phẩm được quan tâm nhất</h3>
                    <div className="block-header__divider" />
                  </div>
                  <div className="block-product-columns__column">
                    {
                      productComments?.map((item, index) => {
                        let attribute = item?.colorAttributes[0];
                        if (!attribute) {
                          attribute = item?.sizeAttributes[0];
                        }
                        const price =  attribute?.price.toLocaleString('en-US');

                        return <div className="block-product-columns__item" key={index}>
                          <div className="product-card product-card--layout--horizontal">
                            {/* <div className="product-card__badges-list">
                              <div className="product-card__badge product-card__badge--sale">Sale</div>
                            </div> */}
                            <div className="product-card__image">
                              <Link to={`/product/${item?.id}`} >
                                <img src={ConfigUtil.HOST_URL + item?.image} width={200} height={100} alt={item?.name} />
                              </Link>
                            </div>
                            <div className="product-card__info">
                              <div className="product-card__name">
                                <Link to={`/product/${item?.id}`} >
                                  {item?.name}
                                </Link>
                              </div>
                            </div>
                            <div className="product-card__actions">
                              <div className="product-card__prices"><span className="product-card__new-price">{price} VNĐ</span> </div>
                            </div>
                          </div>
                        </div>
                      })
                    }
                  </div>
                </div>
                <div className="col-4">
                  <div className="block-header">
                    <h3 className="block-header__title">Sản phẩm bán chạy</h3>
                    <div className="block-header__divider" />
                  </div>
                  <div className="block-product-columns__column">
                    {
                      productBestsellers?.map((item, index) => {
                        let attribute = item?.colorAttributes[0];
                        if (!attribute) {
                          attribute = item?.sizeAttributes[0];
                        }
                        const price = attribute?.price.toLocaleString('en-US');

                        return <div className="block-product-columns__item" key={index}>
                          <div className="product-card product-card--layout--horizontal">
                            <div className="product-card__image">
                              <Link to={`/product/${item?.id}`} >
                                <img src={ConfigUtil.HOST_URL + item?.image} width={200} height={100} alt={item?.name} />
                              </Link>
                            </div>
                            <div className="product-card__info">
                              <div className="product-card__name">
                                <Link to={`/product/${item?.id}`} >
                                  {item?.name}
                                </Link>
                              </div>
                            </div>
                            <div className="product-card__actions">
                              <div className="product-card__prices">{price} VNĐ</div>
                            </div>
                          </div>
                        </div>
                      })
                    }

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

export default HomePage;
