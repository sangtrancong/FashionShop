import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { fetchAllData } from "../redux/dashboardSlice";

import Chart from "react-apexcharts";

const DashboardPage = () => {

    const dispatch = useDispatch();

    const store = useSelector(state => state.dashboards);
    const { allData = [], metadata = {} } = store;

    const [reportList, setReportList] = useState([]);

    const [options, setOptions] = useState({
        chart: {
            id: "basic-bar"
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
    });

    const [series, setSeries] = useState(
        [
            {
                name: "Date",
                data: [30, 40, 45, 50, 49, 60, 70, 91]
            }
        ]
    );

    useEffect(() => {
        dispatch(fetchAllData());
    }, []);

    useEffect(() => {
        if (metadata && metadata?.categorys) {
            const result = Object.entries(JSON.parse(metadata?.categorys));
            setReportList(result);

            const optionList = reportList?.map(([key, value]) => key);

            const serieList = reportList?.map(([key, value]) => value);

            setOptions({
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: optionList
                }
            });

            setSeries(
                [
                    {
                        name: "Date",
                        data: serieList
                    }
                ]
            );
        }
    }, [metadata]);

    return (
        <div className="content-wrapper">
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0">Dashboard</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Dashboard v1</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-6">
                            <div className="small-box bg-info">
                                <div className="inner">
                                    <h3>{allData.totalOrder}</h3>
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
                                    <h3>{allData.totalCost?.toLocaleString('en-US')}</h3>
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
                                    <h3>{allData.totalUser}</h3>
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
                                    <h3>{allData.totalProduct}</h3>
                                    <p>Tổng Mã Giảm Giá</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-pie-graph"></i>
                                </div>
                                <a href="/webadmin/product" class="small-box-footer">&nbsp;</a>
                            </div>
                        </div>

                    </div>

                    <div className="row justify-content-center">
                        <Chart
                            options={options}
                            series={series}
                            type="bar"
                            width="1300"
                        />
                    </div>
                </div>
            </section>
        </div>
    );

}

export default DashboardPage;
