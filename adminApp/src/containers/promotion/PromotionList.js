import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";

import { fetchAllData, clearSelectedItem } from "../../redux/promotionSlice";

import {
  ContentHeader,
  CardHeader,
} from "../../components";

import 'jquery/dist/jquery.min.js';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.colVis.js';
import 'datatables.net-buttons/js/buttons.flash.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import $ from 'jquery';

const PromotionList = () => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.promotions);
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
      <ContentHeader
        title="Quản Lý Khuyến Mãi"
        breadcrumb="Khuyến Mãi"
      />

      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">

                <CardHeader
                  title=""
                  link="/webadmin/promotion/form/"
                />

                <div className="card-body">
                  <table id="example" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th style={{ width: "300px" }}>Mã Khuyến Mãi</th>
                        <th style={{ width: "300px" }}>Tên Khuyến Mãi</th>
                        <th style={{ width: "150px" }}>Ngày Bắt Đầu</th>
                        <th style={{ width: "150px" }}>Ngày kết Thúc</th>
                        <th style={{ width: "100px" }}>Trạng Thái</th>
                        <th style={{ width: "100px" }}>Tuỳ Chọn</th>
                      </tr>
                    </thead>
                    <tbody>

                      {
                        allData.map((item, index) => (
                          <tr key={index}>
                            <td>{item.code}</td>
                            <td>{item.name}</td>
                            <td>{item.startDate}</td>
                            <td>{item.endDate}</td>
                            <td>{item.status? <span className="badge badge-success">Hoạt động</span> : <span className="badge badge-danger">Tạm ngưng</span>}</td>
                            <td className="project-actions text-center">
                              <Link to={`/webadmin/promotion/form/${item.id}`} className="btn btn-info btn-sm mr-1">
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

export default PromotionList;
