import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';

import { ToastContainer, toast } from 'react-toastify';   
import 'react-toastify/dist/ReactToastify.css';    
import { useNavigate } from "react-router-dom";

import { fetchById, saveSingle } from "../../redux/ratingSlice";

const RatingForm = () => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.ratings);
  const { error = '', selectedItem = {} } = store;
  const { data = {}, messages = {} } = selectedItem;

  const { id } = useParams();
  const navigate = useNavigate();

  const [allValues, setAllValues] = useState(data);

  useEffect(() => {
    dispatch(fetchById(id));
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
      setTimeout(function () {
        navigate("/webadmin/rating");
      }, 1500);
    }
  }, [error]);
  
  const handleSubmit = (e) => {
    const params = {
      id: id || 0,
      rating: allValues.rating,
      status: allValues.status,
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
              <h1>Bình Luận</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="/">Trang Chủ</a></li>
                <li className="breadcrumb-item active">Bình Luận</li>
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
                      <label htmlFor="inputName">Người Dùng</label>
                      <input
                       disabled
                        id="inputName"
                        name="fullname"
                        type="text"
                        disable="true"
                        className="form-control"
                        value={allValues?.account?.fullname}
                        onChange={(e) => handleChangeValue(e)}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputProductName">Sản Phẩm</label>
                      <input
                        id="inputProductName"
                        name="name"
                        type="text"
                        disable="true"
                        className="form-control"
                        value={allValues?.product?.name}
                        disabled
                        onChange={(e) => handleChangeValue(e)}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputRating">Đánh giá</label>
                      <select
                        id="inputRating"
                        name="rating"
                        disabled
                        className="form-control custom-select"
                        value={allValues?.rating}
                        onChange={(e) => handleChangeValue(e)}
                      >
                        <option value='1'>1 *</option>
                        <option value='2'>2 *</option>
                        <option value='3'>3 *</option>
                        <option value='4'>4 *</option>
                        <option value='5'>5 *</option>
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

export default RatingForm;
