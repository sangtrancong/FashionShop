import React, { useState } from 'react';

import { Link } from "react-router-dom";

const FilterContrainer = ({
    categoryList = [],
    brandList = [],
    onCategoryFilter,
    onBrandFilter,
}) => {

    const [categoryListFilter, setCategoryListFilter] = useState([]);
    const [brandListFilter, setBrandListFilter] = useState([]);

    const handleCategoryFilter = (e) => {
        e.preventDefault();

        const categoryIndex = categoryListFilter.findIndex((id) => id === parseInt(e.target.value));

        let categoryFilters = []
        if (categoryIndex === -1) {
            categoryFilters = [
                ...categoryListFilter,
                parseInt(e.target.value),
            ]
        } else {
            categoryFilters.filter((id) => id !== parseInt(e.target.value));
        }
        
        setCategoryListFilter(categoryFilters);

        onCategoryFilter(categoryFilters);
    };

    const handleBrandFilter = (e) => {
        e.preventDefault();

        const brandIndex = brandListFilter.findIndex((id) => id === parseInt(e.target.value));

        let brandFilters = []
        if (brandIndex === -1) {
            brandFilters = [
                ...brandListFilter,
                parseInt(e.target.value),
            ]
        } else {
            brandFilters.filter((id) => id !== parseInt(e.target.value));
        }

        setBrandListFilter(brandFilters);
        onBrandFilter(brandFilters);
    }

    return (
        <div className="shop-layout__sidebar">
            <div className="block block-sidebar">
                <div className="block-sidebar__item">
                    <div className="widget-filters widget" data-collapse data-collapse-opened-class="filter--opened">
                        <h4 className="widget__title">Tìm Kiếm</h4>
                        <div className="widget-filters__list">
                            <div className="widget-filters__item">
                                <div className="filter filter--opened" data-collapse-item>
                                    <button type="button" className="filter__title" data-collapse-trigger>
                                        Danh Mục
                                    </button>
                                    <div className="filter__body" data-collapse-content>
                                        <div className="filter__container">
                                            <div className="filter-list">
                                                <div className="filter-list__list">
                                                    {
                                                        categoryList?.map((item, index) => {
                                                            return <label className="filter-list__item" key={index}>
                                                                <span className="filter-list__input input-check">
                                                                    <span className="input-check__body">
                                                                        <input
                                                                            className="input-check__input"
                                                                            type="checkbox"
                                                                            value={item.id}
                                                                            checked={categoryListFilter.findIndex((id) => id === item.id) !== -1}
                                                                            onClick={handleCategoryFilter}
                                                                        />
                                                                        <span className="input-check__box" />
                                                                        <svg className="input-check__icon" width="9px" height="7px">
                                                                            <use xlinkHref="images/sprite.svg#check-9x7">
                                                                            </use>
                                                                        </svg>
                                                                    </span>
                                                                </span>
                                                                <span className="filter-list__title">{item?.name} </span>
                                                            </label>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="widget-filters__item">
                                <div className="filter filter--opened" data-collapse-item>
                                    <button type="button" className="filter__title" data-collapse-trigger>
                                        Thương Hiệu
                                    </button>
                                    <div className="filter__body" data-collapse-content>
                                        <div className="filter__container">
                                            <div className="filter-list">
                                                <div className="filter-list__list">
                                                    {
                                                        brandList?.map((item, index) => {
                                                            return <label className="filter-list__item" key={index}>
                                                                <span className="filter-list__input input-check">
                                                                    <span className="input-check__body">
                                                                        <input
                                                                            className="input-check__input"
                                                                            type="checkbox"
                                                                            value={item.id}
                                                                            checked={brandListFilter.findIndex((id) => id === item.id) !== -1}
                                                                            onClick={handleBrandFilter}
                                                                        />
                                                                        <span className="input-check__box" />
                                                                        <svg className="input-check__icon" width="9px" height="7px">
                                                                            <use xlinkHref="images/sprite.svg#check-9x7">
                                                                            </use>
                                                                        </svg>
                                                                    </span>
                                                                </span>
                                                                <span className="filter-list__title">{item?.name} </span>
                                                            </label>
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <div className="widget-filters__item">
                                <div className="filter filter--opened" data-collapse-item><button type="button" className="filter__title" data-collapse-trigger>Price <svg className="filter__arrow" width="12px" height="7px">
                                    <use xlinkHref="images/sprite.svg#arrow-rounded-down-12x7">
                                    </use>
                                </svg></button>
                                    <div className="filter__body" data-collapse-content>
                                        <div className="filter__container">
                                            <div className="filter-price" data-min={500} data-max={1500} data-from={590} data-to={1130}>
                                                <div className="filter-price__slider" />
                                                <div className="filter-price__title">Price: $<span className="filter-price__min-value" /> – $<span className="filter-price__max-value" /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}

                            {/* <div className="widget-filters__item">
                                <div className="filter filter--opened" data-collapse-item><button type="button" className="filter__title" data-collapse-trigger>Color <svg className="filter__arrow" width="12px" height="7px">
                                    <use xlinkHref="images/sprite.svg#arrow-rounded-down-12x7">
                                    </use>
                                </svg></button>
                                    <div className="filter__body" data-collapse-content>
                                        <div className="filter__container">
                                            <div className="filter-color">
                                                <div className="filter-color__list"><label className="filter-color__item"><span className="filter-color__check input-check-color input-check-color--white" style={{ color: '#fff' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" /> <span className="input-check-color__box" />
                                                    <svg className="input-check-color__icon" width="12px" height="9px">
                                                        <use xlinkHref="images/sprite.svg#check-12x9">
                                                        </use>
                                                    </svg> <span className="input-check-color__stick" /></label></span></label>
                                                    <label className="filter-color__item"><span className="filter-color__check input-check-color input-check-color--light" style={{ color: '#d9d9d9' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" /> <span className="input-check-color__box" />
                                                        <svg className="input-check-color__icon" width="12px" height="9px">
                                                            <use xlinkHref="images/sprite.svg#check-12x9">
                                                            </use>
                                                        </svg> <span className="input-check-color__stick" /></label></span></label>
                                                    <label className="filter-color__item"><span className="filter-color__check input-check-color" style={{ color: '#b3b3b3' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" /> <span className="input-check-color__box" />
                                                        <svg className="input-check-color__icon" width="12px" height="9px">
                                                            <use xlinkHref="images/sprite.svg#check-12x9">
                                                            </use>
                                                        </svg> <span className="input-check-color__stick" /></label></span></label>
                                                    <label className="filter-color__item"><span className="filter-color__check input-check-color" style={{ color: '#808080' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" /> <span className="input-check-color__box" />
                                                        <svg className="input-check-color__icon" width="12px" height="9px">
                                                            <use xlinkHref="images/sprite.svg#check-12x9">
                                                            </use>
                                                        </svg> <span className="input-check-color__stick" /></label></span></label>
                                                    <label className="filter-color__item"><span className="filter-color__check input-check-color" style={{ color: '#666' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" /> <span className="input-check-color__box" />
                                                        <svg className="input-check-color__icon" width="12px" height="9px">
                                                            <use xlinkHref="images/sprite.svg#check-12x9">
                                                            </use>
                                                        </svg> <span className="input-check-color__stick" /></label></span></label>
                                                    <label className="filter-color__item"><span className="filter-color__check input-check-color" style={{ color: '#4d4d4d' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" /> <span className="input-check-color__box" />
                                                        <svg className="input-check-color__icon" width="12px" height="9px">
                                                            <use xlinkHref="images/sprite.svg#check-12x9">
                                                            </use>
                                                        </svg> <span className="input-check-color__stick" /></label></span></label>
                                                    <label className="filter-color__item"><span className="filter-color__check input-check-color" style={{ color: '#262626' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" /> <span className="input-check-color__box" />
                                                        <svg className="input-check-color__icon" width="12px" height="9px">
                                                            <use xlinkHref="images/sprite.svg#check-12x9">
                                                            </use>
                                                        </svg> <span className="input-check-color__stick" /></label></span></label>
                                                    <label className="filter-color__item"><span className="filter-color__check input-check-color" style={{ color: '#ff4040' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" defaultChecked="checked" /> <span className="input-check-color__box" />
                                                        <svg className="input-check-color__icon" width="12px" height="9px">
                                                            <use xlinkHref="images/sprite.svg#check-12x9">
                                                            </use>
                                                        </svg> <span className="input-check-color__stick" /></label></span></label>
                                                    <label className="filter-color__item"><span className="filter-color__check input-check-color" style={{ color: '#ff8126' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" /> <span className="input-check-color__box" />
                                                        <svg className="input-check-color__icon" width="12px" height="9px">
                                                            <use xlinkHref="images/sprite.svg#check-12x9">
                                                            </use>
                                                        </svg> <span className="input-check-color__stick" /></label></span></label>
                                                    <label className="filter-color__item"><span className="filter-color__check input-check-color input-check-color--light" style={{ color: '#ffd440' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" /> <span className="input-check-color__box" />
                                                        <svg className="input-check-color__icon" width="12px" height="9px">
                                                            <use xlinkHref="images/sprite.svg#check-12x9">
                                                            </use>
                                                        </svg> <span className="input-check-color__stick" /></label></span></label>
                                                    <label className="filter-color__item"><span className="filter-color__check input-check-color input-check-color--light" style={{ color: '#becc1f' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" /> <span className="input-check-color__box" />
                                                        <svg className="input-check-color__icon" width="12px" height="9px">
                                                            <use xlinkHref="images/sprite.svg#check-12x9">
                                                            </use>
                                                        </svg> <span className="input-check-color__stick" /></label></span></label>
                                                    <label className="filter-color__item"><span className="filter-color__check input-check-color" style={{ color: '#8fcc14' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" defaultChecked="checked" /> <span className="input-check-color__box" />
                                                        <svg className="input-check-color__icon" width="12px" height="9px">
                                                            <use xlinkHref="images/sprite.svg#check-12x9">
                                                            </use>
                                                        </svg> <span className="input-check-color__stick" /></label></span></label>
                                                    <label className="filter-color__item"><span className="filter-color__check input-check-color" style={{ color: '#47cc5e' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" /> <span className="input-check-color__box" />
                                                        <svg className="input-check-color__icon" width="12px" height="9px">
                                                            <use xlinkHref="images/sprite.svg#check-12x9">
                                                            </use>
                                                        </svg> <span className="input-check-color__stick" /></label></span></label>
                                                    <label className="filter-color__item"><span className="filter-color__check input-check-color" style={{ color: '#47cca0' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" /> <span className="input-check-color__box" />
                                                        <svg className="input-check-color__icon" width="12px" height="9px">
                                                            <use xlinkHref="images/sprite.svg#check-12x9">
                                                            </use>
                                                        </svg> <span className="input-check-color__stick" /></label></span></label>
                                                    <label className="filter-color__item"><span className="filter-color__check input-check-color" style={{ color: '#47cccc' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" /> <span className="input-check-color__box" />
                                                        <svg className="input-check-color__icon" width="12px" height="9px">
                                                            <use xlinkHref="images/sprite.svg#check-12x9">
                                                            </use>
                                                        </svg> <span className="input-check-color__stick" /></label></span></label>
                                                    <label className="filter-color__item"><span className="filter-color__check input-check-color" style={{ color: '#40bfff' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" disabled="disabled" />
                                                        <span className="input-check-color__box" />
                                                        <svg className="input-check-color__icon" width="12px" height="9px">
                                                            <use xlinkHref="images/sprite.svg#check-12x9">
                                                            </use>
                                                        </svg> <span className="input-check-color__stick" /></label></span></label>
                                                    <label className="filter-color__item"><span className="filter-color__check input-check-color" style={{ color: '#3d6dcc' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" defaultChecked="checked" /> <span className="input-check-color__box" />
                                                        <svg className="input-check-color__icon" width="12px" height="9px">
                                                            <use xlinkHref="images/sprite.svg#check-12x9">
                                                            </use>
                                                        </svg> <span className="input-check-color__stick" /></label></span></label>
                                                    <label className="filter-color__item"><span className="filter-color__check input-check-color" style={{ color: '#7766cc' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" /> <span className="input-check-color__box" />
                                                        <svg className="input-check-color__icon" width="12px" height="9px">
                                                            <use xlinkHref="images/sprite.svg#check-12x9">
                                                            </use>
                                                        </svg> <span className="input-check-color__stick" /></label></span></label>
                                                    <label className="filter-color__item"><span className="filter-color__check input-check-color" style={{ color: '#b852cc' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" /> <span className="input-check-color__box" />
                                                        <svg className="input-check-color__icon" width="12px" height="9px">
                                                            <use xlinkHref="images/sprite.svg#check-12x9">
                                                            </use>
                                                        </svg> <span className="input-check-color__stick" /></label></span></label>
                                                    <label className="filter-color__item"><span className="filter-color__check input-check-color" style={{ color: '#e53981' }}><label className="input-check-color__body"><input className="input-check-color__input" type="checkbox" /> <span className="input-check-color__box" />
                                                        <svg className="input-check-color__icon" width="12px" height="9px">
                                                            <use xlinkHref="images/sprite.svg#check-12x9">
                                                            </use>
                                                        </svg> <span className="input-check-color__stick" /></label></span></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        {/* <div className="widget-filters__actions d-flex"><button className="btn btn-primary btn-sm">Filter</button> <button className="btn btn-secondary btn-sm ml-2">Reset</button></div> */}
                    </div>
                </div>

            </div>
        </div>
    );

}

export default FilterContrainer;
