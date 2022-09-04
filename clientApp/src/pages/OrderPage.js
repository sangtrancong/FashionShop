import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";

import { useDispatch, useSelector } from 'react-redux';

import { Link, useNavigate } from "react-router-dom";

import { fetchByUser, updatePayment } from "../redux/orderSlice";

import axios from 'axios';

import {
  HeaderMobileContrainer,
  HeaderDesktopContrainer,
  FooterContrainer,
  BreadcrumbContrainer,
} from "../containers";

import ConfigUtil from '../utils/ConfigUtil';

import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";

// This values are the props in the UI
const currency = "USD";
const style = { "layout": "vertical" };

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ amount, currency, showSpinner, items, orderid }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (<>
    {(showSpinner && isPending) && <div className="spinner" />}
    <PayPalButtons
      style={style}
      disabled={false}
      forceReRender={[amount, currency, style]}
      fundingSource={undefined}
      createOrder={(data, actions) => {
        return actions.order
          .create({
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: amount,
                },
                items: items || []
              },
            ],
          })
          .then((orderId) => {
            console.log('createOrder', orderId);
            // Your code here after create the order
            return orderId;
          });
      }}
      onApprove={function (data, actions) {
        return actions.order.capture().then(function () {
          // Your code here after capture the order
          console.log('onApprove', data);
          const config = {
            headers: {
              'content-type': 'application/json'
            }
          };
          axios.get(ConfigUtil.HOST_URL + '/api/orders/update-payment/' + orderid, config).then(() => 
              setTimeout(async function () {
                window.location.reload();
            }, 1000)
          );
        });
      }}
    />
  </>
  );
}

const OrderPage = () => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.order);
  const { allData = [], payment = false } = store;

  const userStore = useSelector(state => state.user);
  const { isLogin = false, profile = {} } = userStore;

  useEffect(() => {
    const userLogin = localStorage.getItem("userLogin");
    if (userLogin) {
      const user = JSON.parse(userLogin);
      dispatch(fetchByUser(user.userId));
    }
  }, []);

  useEffect(() => {
    if (payment) {
      const userLogin = localStorage.getItem("userLogin");
      if (userLogin) {
        const user = JSON.parse(userLogin);
        dispatch(fetchByUser(user.userId));
      }
    }
  }, [payment]);

  const convertVNDToUSD = (money) => {
    console.log('convertVNDToUSD', money)
    const input = parseFloat(money);
    if (Number.isNaN(input)) {
      return 0;
    }

    const sell = 24000;
    const output = input / sell;
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString().toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }

  return (
    <div>

      <HeaderMobileContrainer />

      <div className="site">

        <HeaderMobileContrainer />

        <HeaderDesktopContrainer />

        {/* site__body */}
        <div className="site__body">

          <BreadcrumbContrainer title="Đơn Hàng" />

          <div className="block">
            <div className="container">
              <table className="wishlist">
                <thead className="wishlist__head">
                  <tr className="wishlist__row">
                    <th className="wishlist__column wishlist__column--image">#</th>
                    <th className="wishlist__column wishlist__column--product">Sản Phẩm</th>
                    <th className="wishlist__column wishlist__column--stock">Trạng Thái</th>
                    <th className="wishlist__column wishlist__column--stock">Thanh Toán</th>
                    <th className="wishlist__column wishlist__column--stock">Tổng (VNĐ)</th>
                    <th className="wishlist__column wishlist__column--tocart" />
                    <th className="wishlist__column wishlist__column--remove" />
                  </tr>
                </thead>
                <tbody className="wishlist__body">
                  {
                    allData?.map((item, index) => {
                      const products = item?.orderDetails?.map((item) => item.product.name + " ");
                      const amount = convertVNDToUSD(item?.totalCost || 0);
                      const items = item?.orderDetails?.map((item) => ({
                        name: item.product.name,
                        description: item.product.description,
                        unit_amount: {
                          currency_code: 'USD',
                          value: item.price,
                        },
                        quantity: item.quantity,
                      }));

                      return <tr className="wishlist__row" key={index}>
                        <td className="wishlist__column wishlist__column--image">
                          {item?.id}
                        </td>
                        <td className="wishlist__column wishlist__column--product">
                          {products}
                        </td>
                        <td className="wishlist__column wishlist__column--stock">
                          <div className="badge badge-success">{item?.progress}</div>
                        </td>
                        <td className="wishlist__column wishlist__column--stock">
                          <div className={item?.payCost ? 'badge badge-success' : ''}>
                            {item?.payCost ? 'Đã Thanh Toán' :
                              <PayPalScriptProvider
                                options={{
                                  "client-id": "AQJriXpwX_BEkH-wSHVLql4ipLveWB-JmD70AA0T9VkAGBIpmlkJGfQkqX28JmOk9VqthW7NeDB6x0Tx",
                                  components: "buttons",
                                  currency: currency
                                }}
                              >
                                <ButtonWrapper
                                  amount={parseInt(amount)}
                                  currency={currency}
                                  showSpinner={false}
                                  item={items}
                                  orderid={item?.id}
                                />
                              </PayPalScriptProvider>
                            }
                          </div>

                        </td>
                        <td className="wishlist__column wishlist__column--stock">{item?.totalCost.toLocaleString('en-US')}</td>
                        <td className="wishlist__column wishlist__column--tocart">
                          {/* <button type="button" className="btn btn-primary btn-sm">Huỷ Đơn Hàng</button> */}
                        </td>
                        <td className="wishlist__column wishlist__column--remove"></td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <FooterContrainer />

      </div>
    </div>
  );

}

export default OrderPage;
