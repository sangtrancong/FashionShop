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
              <h1>Qu???n L?? Giao H??ng</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="/">Trang Ch???</a></li>
                <li className="breadcrumb-item active">Giao H??ng</li>
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
                        <option value='PENDING'>??ang Ch??? Duy???t</option>
                        <option value='SHIPPING'>??ang Giao H??ng</option>
                        <option value='COMPLETED'>???? Ho??n Th??nh</option>
                        <option value='CANCLED'>???? Hu??? B???</option>
                        <option value='ALL'>T???t C??? ????n H??ng</option>
                      </select>
                  </h3>
                  <div className="card-tools">
                    <Link to='/webadmin/order/form/' className="btn btn-block btn-primary">
                      Th??m M???i
                    </Link>
                  </div>
                </div>
                {/* /.card-header */}
                <div className="card-body">
                  <table id="example" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th style={{ width: "120px" }}>M?? ?????t H??ng</th>
                        <th style={{ width: "200px" }}>Kh??ch H??ng</th>
                        <th style={{ width: "100px" }}>T???ng Ho?? ????n</th>
                        <th style={{ width: "100px" }}>Thanh To??n</th>
                        <th style={{ width: "100px" }}>????n H??ng</th>
                        {/* <th style={{ width: "100px" }}>Tr???ng Th??i</th> */}
                        <th style={{ width: "100px" }}>Tu??? Ch???n</th>
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
                            <td>{item.payCost? <span className="badge badge-success">???? Thanh To??n</span> : <span className="badge badge-danger">Ch??? Thanh To??n</span>}</td>
                            <td>{item?.progress}</td>
                            {/* <td>{item.status? <span className="badge badge-success">Ho???t ?????ng</span> : <span className="badge badge-danger">???? Hu???</span>}</td> */}
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
