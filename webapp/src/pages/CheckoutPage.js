import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from "react-router-dom";

import { loadItem, saveItems } from "../redux/cartSlice";

import {
  HeaderMobileContrainer,
  HeaderDesktopContrainer,
  FooterContrainer,
  BreadcrumbContrainer,
} from "../containers/";

const CheckoutPage = () => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.cart);
  const { allData = [], error = '' } = store;

  const userStore = useSelector(state => state.user);
  const { isLogin = false, profile = {} } = userStore;

  const navigate = useNavigate();

  const [allValues, setAllValues] = useState({
    accountId: 0,
    fullname: '',
    email: '',
    phone: '',
    address: '',
  });

  const [totalBills, setTotalBills] = useState(0);
  const [totalShip, setTotalShip] = useState(0);
  const [totalVAT, setTotalVAT] = useState(0);
  const [totalPay, setTotalPay] = useState(0);

  const [promotion, setPromotion] = useState('');
  const [promotionId, setPromotionId] = useState(0);
  const [totalPromotion, setTotalPromotion] = useState(0);

  const [checkoutTerms, setCheckoutTerms] = useState(false);

  useEffect(() => {
    dispatch(loadItem());

    const promotion = localStorage.getItem("promotion");
    if (promotion) {
      const pro = JSON.parse(promotion);
      setPromotion(pro?.code);
      setTotalPromotion(pro?.promotion);
      setPromotionId(pro?.promotionId);
    }
  }, []);

  useEffect(() => {
    if (error && error === 'SUCCESS') {
      localStorage.removeItem('cartItems');
      localStorage.removeItem('promotion');
      navigate("/order");
    }
  }, [error]);

  useEffect(() => {
    const userLogin = localStorage.getItem("userLogin");
    if (userLogin) {
      const user = JSON.parse(userLogin);
      setAllValues({
        accountId: user.userId,
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        address: user.address,
        payment: 'PAYPAL',
      })
    }
  }, []);

  useEffect(() => {
    const dt = allData?.reduce((total, item) => total + (item.product.attribute.discount > 0 ? item.product.attribute.discount * item.quantity : item.product.attribute.price * item.quantity), 0);
    setTotalBills(dt);
    setTotalVAT(dt * 0.1);
    setTotalShip(25000);
    setTotalPay(totalBills + totalShip + totalVAT);
  }, [allData, totalBills, totalShip, totalVAT]);

  const handleChangeValue = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let products = [];
    if (allData) {
      for (let i = 0; i < allData?.length; i++) {
        const p = allData[i];
        const newItem = {
          productId: p?.product?.id,
          price: p?.product?.attribute?.discount && p?.product?.attribute?.discount > 0 ? p?.product?.attribute?.discount : p?.product?.attribute?.price,
          quantity: p?.quantity || 1,
          attributeType: p?.product?.attribute?.attribute?.type,
          attributeName: p?.product?.attribute?.attribute?.name,
        }
        products.push(newItem);
      }

      const params = {
        totalCost: (totalPay - totalPromotion),
        promotionId: promotionId,
        accountId: allValues.accountId || 0,
        fullname: allValues.fullname || '',
        email: allValues.email || '',
        phone: allValues.phone || '',
        address: allValues.address || '',
        payment: allValues.payment || 'PAYPAL',
        products: products,
      }

      dispatch(saveItems(params));

    }
  }

  return (
    <div>

      <HeaderMobileContrainer />

      <div className="site">

        <HeaderMobileContrainer />

        <HeaderDesktopContrainer />

        {/* site__body */}
        <div className="site__body">

          <BreadcrumbContrainer title="Thanh Toán" />

          <div className="checkout block">
            <div className="container">
              <div className="row">

                {
                  !isLogin && <div className="col-12 mb-3">
                    <div className="alert alert-lg alert-primary">Bạn đã có tài khoản? <Link to={'/login'}>Đăng Nhập</Link> hoặc <Link to={'/register'}>Đăng Ký Ngay</Link></div>
                  </div>
                }

                <div className="col-12 col-lg-6 col-xl-7">
                  <div className="card mb-lg-0">
                    <div className="card-body">
                      <h3 className="card-title">Thông Tin</h3>
                      <div className="form-row">
                        <div className="form-group col-md-12">
                          <label htmlFor="checkout-first-name">Họ Và Tên</label>
                          <input
                            type="text"
                            className="form-control"
                            id="fullname"
                            name="fullname"
                            placeholder="Nguyễn Văn Nam"
                            value={allValues?.fullname}
                            onChange={(e) => handleChangeValue(e)}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="checkout-street-address">Địa Chỉ</label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          placeholder="123 Đinh Bộ Lĩnh..."
                          value={allValues?.address}
                          onChange={(e) => handleChangeValue(e)}
                        />
                      </div><div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="checkout-email">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="abc@gmail.com"
                            value={allValues?.email}
                            onChange={(e) => handleChangeValue(e)}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="checkout-phone">Số Điện Thoại</label>
                          <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            placeholder="034220123"
                            value={allValues?.phone}
                            onChange={(e) => handleChangeValue(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-divider" />
                    <div className="card-body">
                      <h3 className="card-title">Giao Hàng</h3>
                      <div className="form-group">
                        <label htmlFor="checkout-comment">Địa chỉ nhận hàng</label>
                        <textarea id="checkout-comment" className="form-control" rows={4} defaultValue={allValues?.address} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-6 col-xl-5 mt-4 mt-lg-0">
                  <div className="card mb-0">
                    <div className="card-body">
                      <h3 className="card-title">Hoá Đơn</h3>
                      <table className="checkout__totals">
                        <thead className="checkout__totals-header">
                          <tr>
                            <th>Sản Phẩm</th>
                            <th>Thành Tiền</th>
                          </tr>
                        </thead>
                        <tbody className="checkout__totals-products">
                          {
                            allData?.map((item, index) => {
                              const { product = {}, quantity = 1 } = item;
                              return <tr>
                                <td>{product?.name} × {quantity}</td>
                                <td>{(product?.attribute?.discount > 0 ? product?.attribute?.discount * quantity : product?.attribute?.price * quantity).toLocaleString('en-US')} VNĐ</td>
                              </tr>
                            })
                          }
                        </tbody>
                        <tbody className="checkout__totals-subtotals">
                          <tr>
                            <th>Hoá Đơn</th>
                            <td>{totalBills?.toLocaleString('en-US') || 0} VNĐ</td>
                          </tr>
                          <tr>
                            <th>Phí Giao Hàng</th>
                            <td>{totalShip?.toLocaleString('en-US')} VNĐ</td>
                          </tr>
                          <tr>
                            <th>Thuế (10%)</th>
                            <td>{totalVAT?.toLocaleString('en-US') || 0} VNĐ</td>
                          </tr>
                          {
                            promotion && <tr>
                              <th>Giảm Giá ({promotion})</th>
                              <td>- {totalPromotion?.toLocaleString('en-US')} VNĐ</td>
                            </tr>
                          }
                        </tbody>
                        <tfoot className="checkout__totals-footer">
                          <tr>
                            <th>Thành Tiền</th>
                            <td>{(totalPay - totalPromotion)?.toLocaleString('en-US') || 0} VNĐ</td>
                          </tr>
                        </tfoot>
                      </table>
                      <div className="payment-methods">
                        <ul className="payment-methods__list">
                          <li className="payment-methods__item">
                            <label className="payment-methods__item-header">
                              <span className="payment-methods__item-radio input-radio">
                                <span className="input-radio__body">
                                  <input
                                    className="input-radio__input"
                                    name="payment"
                                    type="radio"
                                    value="MONEY"
                                    onChange={(e) => handleChangeValue(e)}
                                    checked
                                  />
                                  <span className="input-radio__circle" /></span>
                              </span>
                              <span className="payment-methods__item-title">Thanh Toán Tiền Mặt</span>
                            </label>
                          </li>
                          <li className="payment-methods__item">
                            <label className="payment-methods__item-header">
                              <span className="payment-methods__item-radio input-radio">
                                <span className="input-radio__body">
                                  <input
                                    className="input-radio__input"
                                    name="payment"
                                    type="radio"
                                    value="PAYPAL"
                                    onChange={(e) => handleChangeValue(e)}
                                  />
                                  <span className="input-radio__circle" /></span>
                              </span>
                              <span className="payment-methods__item-title">PayPal</span>
                            </label>
                          </li>
                        </ul>
                      </div>
                      <div className="checkout__agree form-group">
                        <div className="form-check">
                          <span className="form-check-input input-check">
                            <span className="input-check__body">
                              <input 
                                className="input-check__input"
                                type="checkbox" id="checkout-terms"
                                checked={checkoutTerms}
                                onChange={() => setCheckoutTerms(!checkoutTerms)}
                              />
                              <span className="input-check__box" />
                              <svg className="input-check__icon" width="9px" height="7px">
                                <use xlinkHref="images/sprite.svg#check-9x7" />
                              </svg>
                            </span>
                          </span>
                          <label className="form-check-label" htmlFor="checkout-terms">
                            Tôi xác nhận đồng ý với <a target="_blank" href="terms-and-conditions.html">điều khoản</a>*
                          </label>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-xl btn-block"
                        onClick={(e) => handleSubmit(e)}
                        disabled={allValues?.fullname?.length === 0 || allValues?.email?.length === 0 
                          || allValues?.phone?.length === 0 || allValues?.address?.length === 0 || !checkoutTerms}
                      >
                        Xác Nhận
                      </button>
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

export default CheckoutPage;
