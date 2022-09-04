import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux'

import { Link } from "react-router-dom";

import { fetchAllData, clearSelectedItem } from "../../redux/brandSlice";

import 'jquery/dist/jquery.min.js';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.colVis.js';
import 'datatables.net-buttons/js/buttons.flash.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import $ from 'jquery';

const BrandList = () => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.brands);
  const { allData = [] } = store;

  useEffect(() => {
    dispatch(fetchAllData()).then(() => {
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

  useEffect(() => {
    dispatch(clearSelectedItem());
  }, []);
  
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Quản Lý Nhãn Hiệu</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="/">Trang Chủ</a></li>
                <li className="breadcrumb-item active">Nhãn Hiệu</li>
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
                  <h3 className="card-title"></h3>
                  <div className="card-tools">
                    <a type="button" className="btn btn-block btn-primary" href="/webadmin/brand/form">Thêm Mới</a>
                  </div>
                </div>
                <div className="card-body">
                  <table id="example" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th style={{ width: "300px" }}>Tên nhãn Hiệu</th>
                        <th>Mô Tả</th>
                        <th style={{ width: "100px" }}>Trạng Thái</th>
                        <th style={{ width: "100px" }}>Tuỳ Chọn</th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        allData.map((item, index) => (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.status? <span className="badge badge-success">Hoạt động</span> : <span className="badge badge-danger">Tạm ngưng</span>}</td>
                            <td className="project-actions text-center">
                              <Link to={`/webadmin/brand/form/${item.id}`} className="btn btn-info btn-sm mr-1">
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

export default BrandList;
