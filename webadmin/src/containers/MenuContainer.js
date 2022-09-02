import React, { useEffect, useState } from 'react';

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'

import { logout } from "../redux/userSlice";

const MenuContainer = () => {

    const dispatch = useDispatch();
    const store = useSelector(state => state.user);
    const { isLogin = false, profile = {} } = store;

    const [fullname, setFullname] = useState('');
    const [id, setId] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const userLogin = localStorage.getItem("userLogin");
        if (userLogin) {
           const user = JSON.parse(userLogin);
           setFullname(user.fullname);
           setId(user.userId);
        }
    }, [])

    const handleLogout = (e) => {
        e.preventDefault();
    
        dispatch(logout());
        navigate("/login");
    };

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="index3.html" className="brand-link">
                {/* <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} /> */}
                <span className="brand-text font-weight-light">Admin Manager</span>
            </a>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    {/* <div className="image">
                        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div> */}
                    <div className="info">
                        <a href="#" className="d-block">Xin chào, {fullname || ''}</a><br />
                        <a href="#" className="d-block" onClick={(e) => handleLogout(e)}>Đăng Xuất</a>
                    </div>
                </div>
                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-sidebar">
                                <i className="fas fa-search fa-fw" />
                            </button>
                        </div>
                    </div>
                </div>
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item menu-open">
                            <Link to="/" className="nav-link active">
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>
                                    Tổng Quan
                                </p>
                            </Link>
                        </li>
                        <li className="nav-header">DANH MỤC QUẢN LÝ</li>
                        <li className="nav-item">
                            <Link to="/webadmin/account" className="nav-link">
                                <i className="nav-icon fa fa-users" />
                                <p>
                                    Tài Khoản
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/webadmin/account/shipper" className="nav-link">
                                <i className="nav-icon fa fa-users" />
                                <p>
                                    Shipper
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={`/webadmin/account/delivery/${id}`} className="nav-link">
                                <i className="nav-icon fa fa-users" />
                                <p>
                                    Giao Hàng
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/webadmin/category" className="nav-link">
                                <i className="nav-icon fa fa-list-ul" />
                                <p>
                                    Danh Mục
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/webadmin/brand" className="nav-link">
                                <i className="nav-icon fa fa-tags" />
                                <p>
                                    Nhãn Hiệu
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/webadmin/product" className="nav-link">
                                <i className="nav-icon fa fa-qrcode" />
                                <p>
                                    Sản Phẩm
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/webadmin/promotion" className="nav-link">
                                <i className="nav-icon fa fa-bullhorn" />
                                <p>
                                    Khuyến Mãi
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/webadmin/comment" className="nav-link">
                                <i className="nav-icon fa fa-comments" />
                                <p>
                                    Bình Luận
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/webadmin/rating" className="nav-link">
                                <i className="nav-icon fa fa-star" />
                                <p>
                                    Đánh Giá
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/webadmin/order" className="nav-link">
                                <i className="nav-icon fa fa-shopping-cart" />
                                <p>
                                    Đơn Hàng
                                </p>
                            </Link>
                        </li>
                        <li className="nav-header">BÁO CÁO THỐNG KÊ</li>
                        <li className="nav-item">
                            <Link to="/webadmin/report/order" className="nav-link">
                                <i className="nav-icon fa fa-shopping-bag" />
                                <p>
                                    Đơn Hàng
                                </p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );

}

export default MenuContainer;
