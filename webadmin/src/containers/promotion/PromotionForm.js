import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';

import { useTranslation } from 'react-i18next';

import { ToastContainer, toast } from 'react-toastify';   
import 'react-toastify/dist/ReactToastify.css';    

import { fetchById, saveSingle } from "../../redux/promotionSlice";

const PromotionForm = () => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.promotions);
  const { error = '', selectedItem = {} } = store;
  const { data = {}, messages = {} } = selectedItem;

  const { id } = useParams();

  const { t } = useTranslation();

  const [allValues, setAllValues] = useState(data);

  useEffect(() => {
    if (id) {
      dispatch(fetchById(id));
    }
  }, []);

  useEffect(() => {
    if (id && data) {
      setAllValues(data);
    }
  }, [data]);

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
      id: id || data?.id || 0,
      name: allValues?.name || '',
      code: allValues?.code || '',
      description: allValues?.description || '',
      startDate: allValues?.startDate || '',
      endDate: allValues?.endDate || '',
      applyType: allValues?.applyType || 'ALL',
      applyCode: allValues?.applyCode || '',
      couponType: allValues?.couponType || '%',
      couponAmount: allValues?.couponAmount || '',
      status: allValues?.status || true,
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
              <h1>Khuyến Mãi</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="/">Trang Chủ</a></li>
                <li className="breadcrumb-item active">Khuyến Mãi</li>
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
                      <label htmlFor="inputName">Tên Khuyến Mãi</label>
                      <input
                        id="inputName"
                        name="name"
                        type="text"
                        className={`${messages?.name ? 'form-control is-invalid' : 'form-control'}`}
                        value={allValues?.name}
                        onChange={(e) => handleChangeValue(e)}
                      />
                      <span id="inputName-error" class="error invalid-feedback">{t(messages?.name)}</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputCode">Mã Khuyến Mãi</label>
                      <input
                        id="inputCode"
                        name="code"
                        type="text"
                        className={`${messages?.code ? 'form-control is-invalid' : 'form-control'}`}
                        value={allValues?.code}
                        onChange={(e) => handleChangeValue(e)}
                      />
                      <span id="inputCode-error" class="error invalid-feedback">{t(messages?.code)}</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputStartDate">Ngày Bắt Đầu</label>
                      <input
                        id="inputStartDate"
                        name="startDate"
                        type="date"
                        className={`${messages?.startDate ? 'form-control is-invalid' : 'form-control'}`}
                        value={allValues?.startDate}
                        onChange={(e) => handleChangeValue(e)}
                      />
                      <span id="inputStartDate-error" class="error invalid-feedback">{t(messages?.startDate)}</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputEndDate">Ngày kết Thúc</label>
                      <input
                        id="inputEndDate"
                        name="endDate"
                        type="date"
                        className={`${messages?.endDate ? 'form-control is-invalid' : 'form-control'}`}
                        value={allValues?.endDate}
                        onChange={(e) => handleChangeValue(e)}
                      />
                      <span id="inputEndDate-error" class="error invalid-feedback">{t(messages?.endDate)}</span>
                    </div>
                  </div>

                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputApplyType">Loại Áp Dụng</label>
                      <select
                        id="inputApplyType"
                        name="applyType"
                        className="form-control custom-select"
                        value={allValues?.applyType}
                        onChange={(e) => handleChangeValue(e)}
                        disabled
                      >
                        <option value='ALL'>Tất cả</option>
                        <option value='ACCOUNT'>Tài khoản</option>
                        <option value='PRODUCT'>Sản Phẩm</option>
                        <option value='CATEGORY'>Danh Mục</option>
                        <option value='BRAND'>Nhãn Hiệu</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputApplyCode">Mã Áp Dụng</label>
                      <input
                        id="inputApplyCode"
                        name="applyCode"
                        type="text"
                        className={`${messages?.applyCode ? 'form-control is-invalid' : 'form-control'}`}
                        value={allValues?.applyCode}
                        onChange={(e) => handleChangeValue(e)}
                        disabled
                      />
                      <span id="inputApplyCode-error" class="error invalid-feedback">{messages?.applyCode || ''}</span>
                    </div>
                  </div> */}

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputCouponType">Loại Giảm giá</label>
                      <select
                        id="inputCouponType"
                        name="couponType"
                        className="form-control custom-select"
                        value={allValues?.applyType}
                        onChange={(e) => handleChangeValue(e)}
                        disabled
                      >
                        <option value='%'>%</option>
                        <option value='NUMBER'>NUMBER</option>
                      </select>
                      <span id="inputCouponType-error" class="error invalid-feedback">{messages?.couponType || ''}</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputCouponAmount">Số % Giảm</label>
                      <input
                        id="inputCouponAmount"
                        name="couponAmount"
                        type="number"
                        className={`${messages?.couponAmount ? 'form-control is-invalid' : 'form-control'}`}
                        value={allValues?.couponAmount}
                        onChange={(e) => handleChangeValue(e)}
                      />
                      <span id="inputCouponAmount-error" class="error invalid-feedback">{t(messages?.couponAmount)}</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputStatus">Trạng Thái</label>
                      <select
                        id="inputStatus"
                        name="status"
                        className="form-control custom-select"
                        value={allValues?.status}
                        onChange={(e) => handleChangeValue(e)}
                      >
                        <option value='true'>Hoạt Động</option>
                        <option value='false'>Tạm Ngưng</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputDescription">Mô Tả Ngắn</label>
                  <textarea
                    id="inputDescription"
                    name="description"
                    className="form-control"
                    rows={4}
                    value={allValues?.description}
                    onChange={(e) => handleChangeValue(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}

export default PromotionForm;
