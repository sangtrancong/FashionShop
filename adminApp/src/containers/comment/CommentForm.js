import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';

import { useTranslation } from 'react-i18next';

import { ToastContainer, toast } from 'react-toastify';   
import 'react-toastify/dist/ReactToastify.css';   
import { useNavigate } from "react-router-dom"; 

import { fetchById, saveSingle } from "../../redux/commentSlice";

const CommentForm = () => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.comments);
  const { error = '', selectedItem = {} } = store;
  const { data = {}, messages = {} } = selectedItem;

  const { id } = useParams();

  const [allValues, setAllValues] = useState(data);

  const { t } = useTranslation();
  const navigate = useNavigate();

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

      setTimeout(function () {
        navigate("/webadmin/comment");
      }, 1500);
    }
  }, [error]);
  
  const handleSubmit = (e) => {
    const params = {
      id: id || 0,
      comment: allValues?.comment || '',
      status: allValues?.status || false,
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
                        id="inputName"
                        name="fullname"
                        type="text"
                        disable="true"
                        className="form-control"
                        value={allValues?.account?.fullname}
                        onChange={(e) => handleChangeValue(e)}
                        disabled
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
                        onChange={(e) => handleChangeValue(e)}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputComment">Bình Luận</label>
                      <textarea
                        id="inputComment"
                        name="comment"
                        className="form-control"
                        rows={4}
                        value={allValues?.comment}
                        onChange={(e) => handleChangeValue(e)}
                      />
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
            
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}

export default CommentForm;
