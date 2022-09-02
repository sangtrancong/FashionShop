import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from "react-router-dom";

import { loadItem, addItem, removeItem, deleteItem } from "../redux/cartSlice";

import {
  HeaderMobileContrainer,
  HeaderDesktopContrainer,
  FooterContrainer,
  BreadcrumbContrainer,
} from "../containers/";

import axios from 'axios';
import ConfigUtil from '../utils/ConfigUtil';

const CartPage = () => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.cart);
  const { allData = [] } = store;

  const [totalBills, setTotalBills] = useState(0);
  const [totalShip, setTotalShip] = useState(0);
  const [totalVAT, setTotalVAT] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [promotion, setPromotion] = useState('');
  const [totalPromotion, setTotalPromotion] = useState(0);

  useEffect(() => {
    dispatch(loadItem());
  }, []);

  useEffect(() => {
    const dt = allData?.reduce((total, item) => total + (item.product.attribute.discount > 0 ? item.product.attribute.discount * item.quantity : item.product.attribute.price * item.quantity), 0);
    setTotalBills(dt);
    setTotalVAT(dt * 0.1);
    setTotalShip(25000);
    setTotalPay(totalBills + totalShip + totalVAT);
  }, [allData, totalBills, totalShip, totalVAT]);

  const handleQuantityAdd = (e, product) => {
    e.preventDefault();
    dispatch(addItem(product));
  }

  const handleQuantitySub = (e, product) => {
    e.preventDefault();
    dispatch(removeItem(product));
  }

  const handleQuantityRemove = (e, product) => {
    e.preventDefault();
    dispatch(deleteItem(product));
  }

  const handlePromotion = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        'content-type': 'application/json'
      }
    };
    axios.get(ConfigUtil.HOST_URL + '/api/promotions/expire/' + promotion, config).then((res) => {
      console.log('data', res)
      const { status, data } = res;
      if (status === 200 && data?.status === 'SUCCESS') {
        const pt = data.data;

        let newpromotion = {
          code: promotion,
          promotionId: pt.id,
          promotion: promotion,
        };
        
        if (pt?.couponType === '%') {
          setTotalPromotion((totalPay * pt?.couponAmount) / 100)
          newpromotion = {
            ...newpromotion,
            promotion: (totalPay * pt?.couponAmount) / 100,
          };
          
        } else {
          setTotalPromotion(pt?.couponAmount);

          newpromotion = {
            ...newpromotion,
            promotion: pt?.couponAmount,
          };
        }
        localStorage.setItem('promotion', JSON.stringify(newpromotion));
      } else {
        localStorage.removeItem('promotion');
      }
    }
    );
  }

  return (
    <div>

      <HeaderMobileContrainer />

      <div className="site">

        <HeaderDesktopContrainer />

        <div className="site__body">

          <BreadcrumbContrainer title="Giỏ Hàng" />

          <div className="cart block">
            <div className="container">
              <table className="cart__table cart-table">
                <thead className="cart-table__head">
                  <tr className="cart-table__row">
                    <th className="cart-table__column cart-table__column--image">#</th>
                    <th className="cart-table__column cart-table__column--product">Sản Phẩm</th>
                    <th className="cart-table__column cart-table__column--price">Giá Bán</th>
                    <th className="cart-table__column cart-table__column--quantity">Số Lượng</th>
                    <th className="cart-table__column cart-table__column--total">Thành Tiền</th>
                    <th className="cart-table__column cart-table__column--remove" />
                  </tr>
                </thead>
                <tbody className="cart-table__body">
                  {
                    allData?.map((item, index) => {
                      const { product = {}, quantity = 1 } = item;
                      return <tr className="cart-table__row" key={index}>
                        <td className="cart-table__column cart-table__column--image">
                          <Link to={"/product/" + product.id}><img src={ConfigUtil.HOST_URL+product?.image} alt={product?.name} /></Link>
                        </td>
                        <td className="cart-table__column cart-table__column--product">
                          <Link to={"/product/" + product.id} className="cart-table__product-name">{product?.name}</Link>
                          <ul className="cart-table__options">
                            <li>SKU: {product?.sku}</li>
                            <li>Danh Mục: {product?.category?.name}</li>
                            <li>Thương Hiệu: {product?.brand?.name}</li>
                          </ul>
                        </td>
                        <td className="cart-table__column cart-table__column--price" data-title="Price">
                          {product?.attribute?.discount && product?.attribute?.discount > 0 ? product?.attribute?.discount?.toLocaleString('en-US') : product?.attribute?.price?.toLocaleString('en-US')}
                        </td>
                        <td className="cart-table__column cart-table__column--quantity" data-title="Quantity">
                          <div className="input-number"><input className="form-control input-number__input" type="number" min={1} value={quantity} />
                            <div className="input-number__add" onClick={(e) => handleQuantityAdd(e, product)} />
                            <div className="input-number__sub" onClick={(e) => handleQuantitySub(e, product)} />
                          </div>
                        </td>
                        <td className="cart-table__column cart-table__column--total" data-title="Total">
                          {product?.attribute?.discount && product?.attribute?.discount > 0 ? (product?.attribute?.discount * quantity)?.toLocaleString('en-US') : (product?.attribute?.price * quantity)?.toLocaleString('en-US')}
                        </td>
                        <td className="cart-table__column cart-table__column--remove">
                          <button
                            type="button"
                            className="btn btn-light btn-sm btn-svg-icon"
                            onClick={(e) => handleQuantityRemove(e, product)}
                          >
                            <svg width="12px" height="12px">
                              <use xlinkHref="images/sprite.svg#cross-12" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    })
                  }

                </tbody>
              </table>
              <div className="cart__actions">
                <form className="cart__coupon-form">
                  <label htmlFor="input-coupon-code" className="sr-only">Password</label>
                  <input type="text" className="form-control" id="input-coupon-code" placeholder="Mã Giảm Giá..." value={promotion} onChange={(e) => setPromotion(e.target.value)} />
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    onClick={(e) => handlePromotion(e)}
                    disabled={allData?.length === 0}
                  >
                    Áp Dụng
                  </button>
                </form>
                <div className="cart__buttons">
                  <Link to={'/shop'} className="btn btn-primary cart__update-button">Tiếp Tục Mua Hàng</Link>
                </div>
              </div>
              <div className="row justify-content-end pt-5">
                <div className="col-12 col-md-7 col-lg-6 col-xl-5">
                  <div className="card">
                    <div className="card-body">
                      <h3 className="card-title">Đơn Hàng</h3>
                      <table className="cart__totals">
                        <thead className="cart__totals-header">
                          <tr>
                            <th>Hoá Đơn</th>
                            <td>{totalBills?.toLocaleString('en-US')} VNĐ</td>
                          </tr>
                        </thead>
                        <tbody className="cart__totals-body">
                          <tr>
                            <th>Phí Giao Hàng</th>
                            <td>{totalShip?.toLocaleString('en-US')} VNĐ</td>
                          </tr>
                          <tr>
                            <th>Thuế (10%)</th>
                            <td>{totalVAT?.toLocaleString('en-US')} VNĐ</td>
                          </tr>
                          {
                            promotion && <tr>
                              <th>Giảm Giá ({promotion})</th>
                              <td>- {totalPromotion?.toLocaleString('en-US')} VNĐ</td>
                            </tr>
                          }
                        </tbody>
                        <tfoot className="cart__totals-footer">
                          <tr>
                            <th>Thành Tiền</th>
                            <td>{(totalPay - totalPromotion)?.toLocaleString('en-US')} VNĐ</td>
                          </tr>
                        </tfoot>
                      </table>
                      {
                        allData?.length > 0 && 
                          <Link to={'/checkout'}
                          className="btn btn-primary btn-xl btn-block cart__checkout-button"
                        >
                          Thanh Toán
                        </Link>
                      }
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

export default CartPage;
