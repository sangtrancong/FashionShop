import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';

import { ToastContainer, toast } from 'react-toastify';   
import 'react-toastify/dist/ReactToastify.css';    

import { fetchById, findByOrders, saveSingle } from "../../redux/orderSlice";
import ConfigUtil from '../../utils/ConfigUtil';

const DeliveryForm = () => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.orders);
  const { error = '', selectedItem = {} } = store;
  const { data = {}, messages = {}, metadata = {} } = selectedItem;
  const { orderDetails = [] } = store;

  const { id } = useParams();

  const [allValues, setAllValues] = useState(data);
  const [accountShipper, setAccountShipper] = useState([]);

  useEffect(() => {
    dispatch(fetchById(id));
    dispatch(findByOrders(id));
  }, []);

  useEffect(() => {
    if (data) {
      setAllValues(data);
    }

    if (metadata && metadata.accountShipper) {
      setAccountShipper(JSON.parse(metadata?.accountShipper));
    }
  }, [data, metadata]);

  const handleChangeValue = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    if (error && error === 'SUCCESS') {
      toast.success('Cập Nhật Dữ Liệu Thành Công');
    }
  }, [error]);
  
  const handleSubmit = (e) => {
    const params = {
      id: id || 0,
      shipperId: parseInt(allValues.shipperId) || 0,
      totalCost: allValues.totalCost || 0,
      progress: allValues.progress || '',
      payCost: allValues.payCost || false,
      status: allValues.status || false,
    }

    dispatch(saveSingle(params));
  };

  return (
    <div className="content-wrapper">
      <ToastContainer /> 
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Giao Hàng</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="/">Trang Chủ</a></li>
                <li className="breadcrumb-item active">Đơn Hàng</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <input type="submit" value="Lưu dữ liệu" className="btn btn-success float-right mb-3" onClick={(e) => handleSubmit(e)} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Thông Tin Chung</h3>
                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                    <i className="fas fa-minus" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div class="row">

                <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputId">Mã Đơn Hàng</label>
                      <input
                        id="inputId"
                        name="id"
                        type="number"
                        className={`${messages?.id ? 'form-control is-invalid' : 'form-control'}`}
                        value={allValues?.id}
                        onChange={(e) => handleChangeValue(e)}
                        disabled
                      />
                      <span id="inputId-error" class="error invalid-feedback">{messages?.id || ''}</span>
                    </div>
                  </div>
                  

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputAccountName">Khách Hàng</label>
                      <input
                        id="inputAccountName"
                        name="accountName"
                        type="text"
                        className={`${messages?.account?.fullname ? 'form-control is-invalid' : 'form-control'}`}
                        value={allValues?.account?.fullname}
                        onChange={(e) => handleChangeValue(e)}
                        disabled
                      />
                      <span id="inputAccountName-error" class="error invalid-feedback">{messages?.account?.fullname || ''}</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputPayment">Thanh Toán</label>
                      <input
                        id="inputPayment"
                        name="payment"
                        type="text"
                        className={`${messages?.payment?.name ? 'form-control is-invalid' : 'form-control'}`}
                        value={allValues?.payment?.name}
                        onChange={(e) => handleChangeValue(e)}
                        disabled
                      />
                      <span id="inputPayment-error" class="error invalid-feedback">{messages?.payment?.name || ''}</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputTotalCost">Tổng Tiền</label>
                      <input
                        id="inputTotalCost"
                        name="totalCost"
                        type="number"
                        className={`${messages?.totalCost ? 'form-control is-invalid' : 'form-control'}`}
                        value={allValues?.totalCost}
                        onChange={(e) => handleChangeValue(e)}
                        disabled
                      />
                      <span id="inputTotalCost-error" class="error invalid-feedback">{messages?.totalCost || ''}</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputShipperId">Shipper</label>
                      <select
                        id="shipperId"
                        name="shipperId"
                        className="form-control custom-select"
                        value={allValues?.shipperId}
                        onChange={(e) => handleChangeValue(e)}
                        disabled
                      >
                        {
                          accountShipper?.map((item, index) => {
                            return <option key={index} value={item.id}>{item.fullname}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputProgress">Trạng Thái</label>
                      <select
                        id="inputProgress"
                        name="progress"
                        className="form-control custom-select"
                        value={allValues?.progress}
                        onChange={(e) => handleChangeValue(e)}
                      >
                        <option value='WAITING'>Chờ Giao Hàng</option>
                        <option value='SHIPPING'>Đang Giao Hàng</option>
                        <option value='COMPLETED'>Giao Thành Công</option>
                        <option value='CANCLED'>Huỷ Đơn Hàng</option>
                      </select>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
              <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Thông Chi Tiết</h3>
                <div className="card-tools">
                  <button
                    type="button"
                    className="btn btn-tool"
                    data-card-widget="collapse"
                    title="Collapse"
                  >
                    <i className="fas fa-minus" />
                  </button>
                </div>
              </div>
              </div>
                <div className="card-body">
                  <table id="example" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th style={{ width: "120px" }}>Hình Ảnh</th>
                        <th style={{ width: "200px" }}>Sản Phẩm</th>
                        <th style={{ width: "200px" }}>Kích Thước / Màu Sắc</th>
                        <th style={{ width: "100px" }}>Số Lượng</th>
                        <th style={{ width: "100px" }}>Đơn Giá (VNĐ)</th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        orderDetails?.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <img src={ConfigUtil.HOST_URL + item?.product.image} width={250} height={250} alt="logo" />
                            </td>
                            <td>
                              <a>{item?.product?.name}</a>
                              <br />
                              <small>
                                {`${item?.product?.category?.name} - ${item?.product?.brand?.name}`}
                              </small>
                            </td>
                            <td>
                              {
                                item?.attributeType === 'COLOR' ? 'Màu Sắc: ' : 'Kích Thước: '
                              }
                              {item?.attributeName}
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              {item?.quantity}
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              {item?.price?.toLocaleString('en-US')}
                            </td>
                          </tr>
                        ))
                      }

                    </tbody>
                    <tfoot>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}

export default DeliveryForm;
