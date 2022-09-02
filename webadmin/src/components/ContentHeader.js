import React from 'react';

import { Link } from "react-router-dom";

const ContentHeader = ({
    title,
    breadcrumb,
}) => {

    return (
        <section className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>{title}</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><Link to="/">Trang Chủ</Link></li>
                            <li className="breadcrumb-item active">{breadcrumb}</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>
    );

}

export default ContentHeader;
