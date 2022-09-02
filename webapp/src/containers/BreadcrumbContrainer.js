import React from 'react';

import { Link } from "react-router-dom";

const BreadcrumbContrainer = ({
    title,
    link,
}) => {

    return (
        <div className="page-header">
            <div className="page-header__container container">
                <div className="page-header__breadcrumb">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/home">Trang Chủ</Link> <svg className="breadcrumb-arrow" width="6px" height="9px">
                                <use xlinkHref="images/sprite.svg#arrow-rounded-right-6x9" />
                            </svg></li>
                            <li className="breadcrumb-item active" aria-current="page">{title}</li>
                        </ol>
                    </nav>
                </div>
                <div className="page-header__title">
                    <h1>{title}</h1>
                </div>
            </div>
        </div>
    );

}

export default BreadcrumbContrainer;
