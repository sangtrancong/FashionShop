import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';

import { useNavigate } from "react-router-dom";

import { useTranslation } from 'react-i18next';

import { ToastContainer, toast } from 'react-toastify';   
import 'react-toastify/dist/ReactToastify.css';    

import {
  ContentHeader,
} from "../../components";

import { fetchById, saveSingle } from "../../redux/categorySlice";

const CategoryForm = () => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.categorys);
  const { error = '', selectedItem = {} } = store;
  const { data = {}, messages = {} } = selectedItem;

  const navigate = useNavigate();

  const { id } = useParams();

  const [allValues, setAllValues] = useState(data);

  const { t } = useTranslation();

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
        navigate("/webadmin/category");
      }, 1500);
    }
  }, [error]);
  
  const handleSubmit = (e) => {
    const params = {
      id: id || 0,
      name: allValues?.name || '',
      description: allValues?.description || '',
      status: allValues?.status || true,
    }

    dispatch(saveSingle(params));
  };

  return (
    <div className="content-wrapper">
      <ToastContainer /> 

      <ContentHeader
        title="Danh Mục"
        breadcrumb="Danh Mục"
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
                      <label htmlFor="inputName">Tên Danh Mục</label>
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

export default CategoryForm;
