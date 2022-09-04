import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'

import { Link } from "react-router-dom";

import { useParams } from 'react-router';

import { fetchByDelivery, fetchByProgress } from "../../redux/orderSlice";

import 'jquery/dist/jquery.min.js';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.colVis.js';
import 'datatables.net-buttons/js/buttons.flash.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import $ from 'jquery';

const DeliveryList = () => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.orders);
  const { deliverys = [] } = store;
  const { id } = useParams();


  const [progress, setProgress] = useState('PENDING');

  useEffect(() => {
    dispatch(fetchByDelivery(id)).then(() => {
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
    });
  }, []);

  const handleChangeProgress = (e) => {
    const progress = e.target.value || 'PENDING';
    setProgress(progress);
    dispatch(fetchByProgress(progress));
  }

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Quản Lý Giao Hàng</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="/">Trang Chủ</a></li>
                <li className="breadcrumb-item active">Giao Hàng</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">
                     <select
                        id="inputStatus"
                        name="status"
                        style={{ width: "250px" }}
                        className="form-control custom-select"
                        value={progress}
                        onChange={(e) => handleChangeProgress(e)}
                      >
                        <option value='PENDING'>Đang Chờ Duyệt</option>
                        <option value='SHIPPING'>Đang Giao Hàng</option>
                        <option value='COMPLETED'>Đã Hoàn Thành</option>
                        <option value='CANCLED'>Đã Huỷ Bỏ</option>
                        <option value='ALL'>Tất Cả Đơn Hàng</option>
                      </select>
                  </h3>
                  <div className="card-tools">
                    <Link to='/webadmin/order/form/' className="btn btn-block btn-primary">
                      Thêm Mới
                    </Link>
                  </div>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <table id="example" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th style={{ width: "120px" }}>Mã Đặt Hàng</th>
                        <th style={{ width: "200px" }}>Khách Hàng</th>
                        <th style={{ width: "100px" }}>Tổng Hoá Đơn</th>
                        <th style={{ width: "100px" }}>Thanh Toán</th>
                        <th style={{ width: "100px" }}>Đơn Hàng</th>
                        {/* <th style={{ width: "100px" }}>Trạng Thái</th> */}
                        <th style={{ width: "100px" }}>Tuỳ Chọn</th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        deliverys.map((item, index) => (
                          <tr key={index}>
                            <td style={{ textAlign: "center" }}>{item.id}</td>
                            <td>
                              <a>{item?.account?.fullname}</a>
                              <br />
                              <small>
                                {item?.account?.email}
                              </small>
                            </td>
                            <td>
                              {item?.totalCost}
                            </td>
                            <td>{item.payCost? <span className="badge badge-success">Đã Thanh Toán</span> : <span className="badge badge-danger">Chờ Thanh Toán</span>}</td>
                            <td>{item?.progress}</td>
                            {/* <td>{item.status? <span className="badge badge-success">Hoạt Động</span> : <span className="badge badge-danger">Đã Huỷ</span>}</td> */}
                            <td className="project-actions text-center">
                              
                              <Link to={`/webadmin/account/delivery/form/${item.id}`} className="btn btn-info btn-sm mr-1">
                                <i className="fas fa-pencil-alt"></i>
                              </Link>
                              
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

export default DeliveryList;
