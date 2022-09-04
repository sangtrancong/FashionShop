import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router';
import { Link, useNavigate } from "react-router-dom";

import { fetchById, fetchByOrder } from "../redux/shopSlice";
import { setItem, deleteItem } from "../redux/cartSlice";

import {
  HeaderMobileContrainer,
  HeaderDesktopContrainer,
  FooterContrainer,
  BreadcrumbContrainer,
} from "../containers";

import axios from 'axios'
import ConfigUtil from '../utils/ConfigUtil';

const ProductPage = () => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.shop);
  const { selectedItem = {} } = store;
  const { data = {}, metadata = {}, } = selectedItem;

  const navigate = useNavigate();

  const { id = 0 } = useParams();

  const [colorList, setColorList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [price, setPrice] = useState(0);
  const [attribute, setAttribute] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [accountBuy, setAccountBuy] = useState(true);
  const [productRelateds, setProductRelateds] = useState([]);
  const [comments, setComments] = useState([]);
  const [ratings, setRatings] = useState([]);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const [user, setUser] = useState({
    userid: 0,
    isLogin: false,
    fullname: '',
    email: '',
  });

  useEffect(() => {
    dispatch(fetchById(id));
  }, []);

  useEffect(() => {
    dispatch(fetchByOrder({ userid: user.userid, productid: id }));
  }, [user]);

  useEffect(() => {
    if (data) {
      if (data?.colorAttributes) {
        setColorList(data?.colorAttributes);
      }
      if (data?.sizeAttributes) {
        setSizeList(data?.sizeAttributes);
      }

      let attributes = data?.colorAttributes;
      if (!attributes || attributes.length === 0) {
        attributes = data?.sizeAttributes;
      }
      if (attributes && attributes.length > 0) {
        setAttribute(attributes[0]);
        setPrice(attributes[0]?.price);
      } else {
        setAttribute({});
        setPrice(0);
      }
    }

    const userLogin = localStorage.getItem("userLogin");
    if (userLogin) {
      const user = JSON.parse(userLogin);
      setUser({
        userid: user.userId,
        isLogin: true,
        fullname: user.fullname,
        email: user.email,
      });
    }
  }, [data]);

  useEffect(() => {
    if (metadata) {
      if (metadata?.productRelated) {
        setProductRelateds(JSON.parse(metadata?.productRelated));
      }
      if (metadata?.comments) {
        setComments(JSON.parse(metadata?.comments));
      }
      if (metadata?.ratings) {
        setRatings(JSON.parse(metadata?.ratings));
      }
      if (metadata?.accountBuy) {
        setAccountBuy(metadata?.accountBuy === 'SUCCESS' || false);
      }

    }
  }, [metadata]);

  const handleSelectAttribute = (e, item) => {
    e.preventDefault();
    if (item && item.status === true && item.quantity > 0) {
      setPrice(item.price)
      setAttribute(item);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    if (quantity === 0) {
      dispatch(deleteItem(data));
    } else {
      let params = {
        ...data,
        quantity: quantity,
        attribute: attribute,
      };
      dispatch(setItem(params));

      navigate("/cart/");
    }
  };

  const handleQuantityAdd = (e) => {
    e.preventDefault();
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  }

  const handleQuantitySub = (e) => {
    e.preventDefault();
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  }

  const handleSubmitComment = (e) => {
    e.preventDefault();

    const params = {
      accountId: user.userid,
      productId: parseInt(id),
      rating: parseInt(rating),
      comment: comment,
    }

    const config = {
      headers: {
          'content-type': 'application/json'
      }
    };
    return axios.post(ConfigUtil.HOST_URL + '/api/orders/commentandrating', params, config).then((res) => {
      window.location.reload();
      // setTimeout(function () {
      //   navigate("/product/" + id);
      // }, 0);
    });
  };

  return (
    <div>

      <div className="site">
        <HeaderMobileContrainer />

        <HeaderDesktopContrainer />

        <div className="site__body">

          <BreadcrumbContrainer title="Sản Phẩm" />

          <div className="block">
            <div className="container">
              <div className="product product--layout--standard" data-layout="standard">
                <div className="product__content">
                  {/* .product__gallery */}
                  <div className="product__gallery">
                    <img src={ConfigUtil.HOST_URL + data?.image} width={535} height={602} />
                  </div>
                  {/* .product__info */}
                  <div className="product__info">
                    <h1 className="product__name">{data?.name}</h1>
                    <div className="product__description">{data?.description}</div>
                    <ul className="product__meta">
                      <li className="product__meta-availability">Tình Trạng: <span className="text-success">Còn Hàng</span></li>
                      <li>Brand: <span className="text-success">{data?.brand?.name}</span></li>
                      <li>SKU: <span className="text-success">{data?.sku}</span></li>
                    </ul>
                  </div>
                  <div className="product__sidebar">
                    <div className="product__prices">{price.toLocaleString('en-US')} VNĐ</div>
                    <form className="product__options">
                      <div className="form-group product__option"><label className="product__option-label">Màu Sắc</label>
                        <div className="input-radio-color">
                          <div className="input-radio-color__list">
                            {
                              colorList?.map((item, index) => {
                                return <label key={index}
                                  className={item?.status === true && item?.attribute?.status === true && item?.quantity > 0 ? 'input-radio-color__item input-radio-color__item--white' : 'input-radio-color__item input-radio-color__item--disabled'}
                                  style={{ color: item?.attribute?.name }}
                                  data-toggle="tooltip"
                                  title={item?.attribute?.name}
                                  onClick={(e) => handleSelectAttribute(e, item)}
                                >
                                  <input
                                    type="radio"
                                    name="color"
                                    disabled={item?.status === true && item?.attribute?.status === true && item?.quantity > 0 ? '' : 'disabled'}
                                  />
                                  <span style={{ borderRadius: attribute?.id === item?.id && item?.status === true && item?.attribute?.status === true && item?.quantity > 0 ? '15px' : '0px' }} />
                                </label>;
                              })
                            }
                          </div>
                        </div>
                      </div>
                      <div className="form-group product__option"><label className="product__option-label">Kích Thước</label>
                        <div className="input-radio-label">
                          <div className="input-radio-label__list">
                            {
                              sizeList?.map((item, index) => {
                                return <label key={index} onClick={(e) => handleSelectAttribute(e, item)}>
                                  <input type="radio" name={item?.attribute?.name} />
                                  <span style={{ background: attribute?.id === item?.id ? '#ffd333' : '' }}>{item?.attribute?.name}</span>
                                </label>;
                              })
                            }
                          </div>
                        </div>
                      </div>
                      <div className="form-group product__option">
                        <label className="product__option-label" htmlFor="product-quantity">Số Lượng</label>
                        <div className="product__actions">
                          <div className="product__actions-item">
                            <div className="input-number product__quantity">
                              <input
                                id="product-quantity"
                                className="input-number__input form-control form-control-lg"
                                type="number"
                                min={1}
                                value={quantity}
                              />
                              <div className="input-number__add" onClick={(e) => handleQuantityAdd(e)} />
                              <div className="input-number__sub" onClick={(e) => handleQuantitySub(e)} />
                            </div>
                          </div>
                          <div className="product__actions-item product__actions-item--addtocart">
                            <button
                              className="btn btn-primary btn-lg"
                              onClick={handleAddToCart}
                            >
                              Mua Hàng
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="product-tabs">
                <div className="product-tabs__list">
                  <a href="#tab-description" className="product-tabs__item product-tabs__item--active">Mô Tả Sản Phẩm</a>
                </div>
                <div className="product-tabs__content">
                  <div className="product-tabs__pane product-tabs__pane--active" id="tab-description">
                    <div className="typography">
                      <p dangerouslySetInnerHTML={{__html:data?.detail}}></p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-tabs">
                <div className="product-tabs__list">
                  <a href="#tab-description" className="product-tabs__item product-tabs__item--active">Đánh Giá Sản Phẩm</a>
                </div>
                <div className="product-tabs__content">
                  <div className="product-tabs__pane product-tabs__pane--active" id="tab-comment">
                    <div className="typography">
                      <ol class="comments-list comments-list--level--0">
                        {
                          comments?.map((item, index) => {
                            return item?.status && <li class="comments-list__item">
                              <div class="comment">
                                <div class="comment__content">
                                  <div class="comment__header">
                                    <div class="comment__author">{item?.account?.fullname}</div>
                                  </div>
                                  <div class="comment__text">{item?.comment}</div>
                                </div>
                              </div>
                            </li>
                          })
                        }
                      </ol>
                    </div>
                  </div>

                  <div className="product-tabs__pane product-tabs__pane--active" id="tab-rating">
                    <div className="typography">
                      <ol class="comments-list comments-list--level--0">
                        {
                          ratings?.map((item, index) => {
                            return item?.status && <li class="comments-list__item">
                              <div class="comment">
                                <div class="comment__content">
                                  <div class="comment__header">
                                    <div class="comment__author">{item?.account?.fullname}</div>
                                  </div>
                                  <div class="comment__text">{item?.rating} *</div>
                                </div>
                              </div>
                            </li>
                          })
                        }
                      </ol>
                    </div>
                  </div>

                  {user && user.isLogin && accountBuy &&
                    <section className="post__section">
                      <h4 className="post__section-title">Đánh Giá Sản Phẩm</h4>
                      <form onSubmit={((e) => handleSubmitComment(e))} method="post">
                        <div className="form-row">
                          <div className="form-group col-md-4">
                            <label htmlFor="comment-first-name">Họ Và Tên</label>
                            <input type="text" className="form-control" value={user?.fullname} disabled />
                          </div>
                          <div className="form-group col-md-4">
                            <label htmlFor="comment-email">Email</label>
                            <input type="email" className="form-control" value={user?.email} disabled />
                          </div>
                          <div className="form-group col-md-4">
                            <label htmlFor="comment-first-name">Đánh Giá</label>
                            <select
                              id="inputRoleName"
                              name="rating"
                              className="form-control custom-select"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value='0'>Chọn đánh giá</option>
                              <option value='5'>5 *</option>
                              <option value='4'>4 *</option>
                              <option value='3'>3 *</option>
                              <option value='2'>2 *</option>
                              <option value='1'>1 *</option>
                            </select>
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="comment-content">Nội Dung</label>
                          <textarea className="form-control" id="comment-content" rows={5} defaultValue={comment} onChange={(e) => setComment(e.target.value)} />
                        </div>
                        <div className="form-group mt-4">
                          <button 
                            type="submit" className="btn btn-primary btn-lg"
                            disabled={comment.length < 10}
                          >
                            Gửi Bình Luận</button>
                          </div>
                      </form>
                    </section>
                  }
                </div>
              </div>
            </div>
          </div>

          {/* <div className="block block-products-carousel" data-layout="grid-5">
            <div className="container">
              <div className="block-header">
                <h3 className="block-header__title">Sản Phẩm Liên Quan</h3>
                <div className="block-header__divider" />
                <div className="block-header__arrows-list">
                </div>
              </div>
              <div className="block-products__body">
                <div className="block-products__list">
                  {
                    productRelateds?.map((item, index) => {
                      let attribute = item?.colorAttributes[0];
                      if (!attribute) {
                        attribute = item?.sizeAttributes[0];
                      }
                      const priceAtt = attribute?.discount.toLocaleString('en-US') || attribute?.price.toLocaleString('en-US');

                      return <div className="block-products__list-item" key={index} >
                        <div className="product-card">
                          <div className="product-card__image">
                            <img src={ConfigUtil.HOST_URL + item?.image} width={64} height={30} />
                          </div>
                          <div className="product-card__info">
                            <div className="product-card__name">
                              <Link to={"/product/" + item.id}>{item.name}</Link>
                            </div>
                          </div>
                          <div className="product-card__actions">
                            <div className="product-card__prices">{priceAtt} VNĐ</div>
                          </div>
                        </div>
                      </div>
                    })
                  }
                </div>
              </div>
            </div>
          </div> */}

        </div>

        <FooterContrainer />

      </div>
    </div>
  );

}

export default ProductPage;
