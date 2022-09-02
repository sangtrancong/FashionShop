import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'

import { Link } from "react-router-dom";
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { report } from "../../redux/dashboardSlice";

import 'jquery/dist/jquery.min.js';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.colVis.js';
import 'datatables.net-buttons/js/buttons.flash.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import $ from 'jquery';

const ReportList = () => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.dashboards);
  const {
    allData = [], 
    totalCost = 0,
    totalOrder = 0,
    totalProduct = 0,
    totalUser = 0 
  } = store;
  const { t } = useTranslation();
  const { id } = useParams();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    $(document).ready(function () {
      setTimeout(function () {
        $("#example").dataTable().fnDestroy();
        $("#example").DataTable({
          "responsive": true, "lengthChange": true, "autoWidth": true,
          "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
          "language": {
            "lengthMenu": "Display _MENU_ records per page",
            "zeroRecords": "Nothing found - sorry",
            "info": "Showing page _PAGE_ of _PAGES_",
            "infoEmpty": "No records available",
            "infoFiltered": "(filtered from _MAX_ total records)"
          }
        }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
      }, 0);
    });
  }, []);

  const handleSubmit = (e) => {
    const params = {
      startDate: startDate || '',
      endDate: endDate || '',
    }

    dispatch(report(params));
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Thống Kê Đơn Hàng</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Trang Chủ</li>
                <li className="breadcrumb-item active">Đơn Hàng</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content">
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
                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="inputBirthday">Từ Ngày</label>
                      <input
                        id="inputBirthday"
                        name="birthday"
                        type="date"
                        className='form-control'
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                      {/* <span id="inputBirthday-error" class="error invalid-feedback">{t(messages?.birthday) || ''}</span> */}
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      <label htmlFor="inputBirthday">Đến Ngày</label>
                      <input
                        id="inputBirthday"
                        name="birthday"
                        type="date"
                        className='form-control'
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                      {/* <span id="inputBirthday-error" class="error invalid-feedback">{t(messages?.birthday) || ''}</span> */}
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="form-group">
                      
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div className="col-md-4">
                    <input type="submit" value="Tra Cứu" className="btn btn-success float-left mb-3" onClick={(e) => handleSubmit(e)} />
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
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{totalOrder}</h3>
                  <p>Đơn Hàng</p>
                </div>
                <div class="icon">
                  <i class="fas fa-shopping-cart"></i>
                </div>
                <a href="/webadmin/order" className="small-box-footer">&nbsp;</a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{totalCost?.toLocaleString('en-US')}</h3>
                  <p>Tổng Giá</p>
                </div>
                <div className="icon">
                  <i className="ion ion-bag" />
                </div>
                <a href="/webadmin/order" className="small-box-footer">&nbsp;</a>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{totalUser}</h3>
                  <p>Tài Khoản Đăng Ký</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <a href="/webadmin/account" className="small-box-footer">&nbsp;</a>
              </div>
            </div>
            <div class="col-lg-3 col-6">
              <div class="small-box bg-danger">
                <div class="inner">
                  <h3>{totalProduct}</h3>
                  <p>Tổng Mã Giảm Giá</p>
                </div>
                <div class="icon">
                  <i class="ion ion-pie-graph"></i>
                </div>
                <a href="/webadmin/product" class="small-box-footer">&nbsp;</a>
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

                <div className="card-body">
                  <table id="example" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th style={{ width: "120px" }}>Mã Đặt Hàng</th>
                        <th style={{ width: "200px" }}>Khách Hàng</th>
                        <th style={{ width: "130px" }}>Hoá Đơn (VNĐ)</th>
                        <th style={{ width: "100px" }}>Thanh Toán</th>
                        <th style={{ width: "100px" }}>Đơn Hàng</th>
                        <th style={{ width: "100px" }}>Trạng Thái</th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        allData?.map((item, index) => (
                          <tr key={index}>
                            <td style={{ textAlign: "center" }}>{item.id}</td>
                            <td>
                              <a>{item?.account?.fullname}</a>
                              <br />
                              <small>
                                {item?.account?.email}
                              </small>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              {item?.totalCost?.toLocaleString('en-US')}
                            </td>
                            <td>{item.payCost ? <span className="badge badge-success">Đã Thanh Toán</span> : <span className="badge badge-danger">Chờ Thanh Toán</span>}</td>
                            <td>{item?.progress}</td>
                            <td>{item.status ? <span className="badge badge-success">Hoạt Động</span> : <span className="badge badge-danger">Đã Huỷ</span>}</td>
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

export default ReportList;
