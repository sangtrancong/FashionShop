import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';

import { ToastContainer, toast } from 'react-toastify';   
import 'react-toastify/dist/ReactToastify.css';    

import {
  ContentHeader,
} from "../../components";

import { fetchById, saveSingle } from "../../redux/accountSlice";

const ShipperForm = () => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.accounts);
  const { error = '', selectedItem = {} } = store;
  const { data = {}, messages = {} } = selectedItem;

  const { id } = useParams();

  const [allValues, setAllValues] = useState(data);

  useEffect(() => {
    dispatch(fetchById(id));
  }, []);

  useEffect(() => {
    if (data) {
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
      id: id || 0,
      fullname: allValues.fullname || '',
      username: allValues.username || '',
      email: allValues.email || '',
      birthday: allValues.birthday || '',
      phone: allValues.phone || '',
      gender: allValues.gender || 0,
      address: allValues.address || '',
      roleName: allValues?.role?.name || '',
      status: allValues.status || false,
    }

    dispatch(saveSingle(params));
  };

  return (
    <div className="content-wrapper">
      <ToastContainer /> 

      <ContentHeader
        title="Shipper"
        breadcrumb="Shipper"
      />

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
                      <label htmlFor="inputFullName">Họ Và Tên</label>
                      <input
                        id="inputFullName"
                        name="fullname"
                        type="text"
                        className={`${messages?.fullname ? 'form-control is-invalid' : 'form-control'}`}
                        value={allValues?.fullname}
                        onChange={(e) => handleChangeValue(e)}
                      />
                      <span id="inputFullName-error" class="error invalid-feedback">{messages?.fullname || ''}</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputUsername">Tên Đăng Nhập</label>
                      <input
                        id="inputUsername"
                        name="username"
                        type="text"
                        className={`${messages?.username ? 'form-control is-invalid' : 'form-control'}`}
                        value={allValues?.username}
                        onChange={(e) => handleChangeValue(e)}
                      />
                      <span id="inputUsername-error" class="error invalid-feedback">{messages?.username || ''}</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputEmail">Email</label>
                      <input
                        id="inputEmail"
                        name="email"
                        type="email"
                        className={`${messages?.email ? 'form-control is-invalid' : 'form-control'}`}
                        value={allValues?.email}
                        onChange={(e) => handleChangeValue(e)}
                      />
                      <span id="inputEmail-error" class="error invalid-feedback">{messages?.email || ''}</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputBirthday">Birthday</label>
                      <input
                        id="inputBirthday"
                        name="birthday"
                        type="date"
                        className={`${messages?.birthday ? 'form-control is-invalid' : 'form-control'}`}
                        value={allValues?.birthday}
                        onChange={(e) => handleChangeValue(e)}
                      />
                      <span id="inputBirthday-error" class="error invalid-feedback">{messages?.birthday || ''}</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputPhone">Phone</label>
                      <input
                        id="inputPhone"
                        name="phone"
                        type="number"
                        className={`${messages?.phone ? 'form-control is-invalid' : 'form-control'}`}
                        value={allValues?.phone}
                        onChange={(e) => handleChangeValue(e)}
                      />
                      <span id="inputPhone-error" class="error invalid-feedback">{messages?.phone || ''}</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputAddress">Địa Chỉ</label>
                      <input
                        id="inputAddress"
                        name="address"
                        type="text"
                        className={`${messages?.address ? 'form-control is-invalid' : 'form-control'}`}
                        value={allValues?.address}
                        onChange={(e) => handleChangeValue(e)}
                      />
                      <span id="inputAddress-error" class="error invalid-feedback">{messages?.address || ''}</span>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputGender">Giới tính</label>
                      <select
                        id="inputGender"
                        name="gender"
                        className="form-control custom-select"
                        value={allValues?.gender}
                        onChange={(e) => handleChangeValue(e)}
                      >
                        <option value='0'>Nam</option>
                        <option value='1'>Nữ</option>
                        <option value='2'>Khác</option>
                      </select>
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
                        <option value='false'>Tạm Ngưng</option>
                        <option value='true'>Hoạt Động</option>
                      </select>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}

export default ShipperForm;
