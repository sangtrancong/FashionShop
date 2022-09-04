import React from 'react';

import { Link } from "react-router-dom";

const CardHeader = ({
    title,
    link,
}) => {

    return (
        <div className="card-header">
            <h3 className="card-title">{title}</h3>
            <div className="card-tools">
                <Link to={link} className="btn btn-block btn-primary">
                    Thêm Mới
                </Link>
            </div>
        </div>
    );

}

export default CardHeader;
