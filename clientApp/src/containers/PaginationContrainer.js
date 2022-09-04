import React, { useState } from 'react';

import { Link } from "react-router-dom";

const PaginationContrainer = ({
    totalItem = 0,
    onNumRecordsFilter,
}) => {

    const [activeItem, setActiveItem] = useState(1);

    const handleNumRecordFilter = (e, num) => {
        e.preventDefault();

        setActiveItem(parseInt(num + 1));
        onNumRecordsFilter(parseInt(num + 1))
    };

    const renderNumberPage = () => {
        let indents = [];
        for (let i = 0; i < totalItem; i++) {
            if (activeItem === (i + 1)) {
                indents.push(
                    <li className="page-item active">
                        <a className="page-link" onClick={(e) => handleNumRecordFilter(e, i)}>
                            {i + 1} <span className="sr-only">(current)</span>
                        </a>
                    </li>
                );
            } else {
                indents.push(
                    <li className="page-item">
                        <a className="page-link" onClick={(e) => handleNumRecordFilter(e, i)}>{i + 1} </a>
                    </li>
                );
            }
        }
        return indents;
    }



    return (
        <div className="products-view__pagination">
            <ul className="pagination justify-content-center">
                <li className="page-item disabled">
                    <a className="page-link page-link--with-arrow" href="#" aria-label="Previous">
                        <svg className="page-link__arrow page-link__arrow--left" aria-hidden="true" width="8px" height="13px">
                            <use xlinkHref="images/sprite.svg#arrow-rounded-left-8x13" />
                        </svg>
                    </a>
                </li>

                {renderNumberPage()}

                {/* <li className="page-item"><a className="page-link" href="#">1</a></li>
                <li className="page-item active"><a className="page-link" href="#">2 <span className="sr-only">(current)</span></a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li> */}


                <li className="page-item">
                    <a className="page-link page-link--with-arrow" href="#" aria-label="Next">
                        <svg className="page-link__arrow page-link__arrow--right" aria-hidden="true" width="8px" height="13px">
                            <use xlinkHref="images/sprite.svg#arrow-rounded-right-8x13" />
                        </svg>
                    </a>
                </li>
            </ul>
        </div>
    );

}

export default PaginationContrainer;
