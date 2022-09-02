import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router';

import { fetchAllData, fetchByName } from "../redux/shopSlice";

import {
  HeaderMobileContrainer,
  HeaderDesktopContrainer,
  FooterContrainer,
  FilterContrainer,
  PaginationContrainer,
  BreadcrumbContrainer,
} from "../containers/";

import {
  ProductItem,
} from "../components";

const ShopPage = () => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.shop);
  const { allData = [], metadata = {} } = store;
  
  const [sortBy, setSortBy] = useState('default');
  const [numberRecords, setNumberRecords] = useState(12);
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const { keyword = '' } = useParams();

  const [paramsFilter, setParamsFilter] = useState({
    sortBy: 'default',
    firstRecord: 0,
    numberRecords: 12,
    categoryId: [],
    brandsId: [],
    attributeIds: [],
  });
  
  useEffect(() => {
    dispatch(fetchAllData(paramsFilter));
  }, []);

  useEffect(() => {
    if (keyword && keyword.length > 0) {
      dispatch(fetchByName(keyword));
    }
  }, [keyword]);

  useEffect(() => {
    if (metadata) {
      if (metadata?.categorys) {
        setCategoryList(JSON.parse(metadata?.categorys));
      }
      if (metadata?.brands) {
        setBrandList(JSON.parse(metadata?.brands));
      }
      if (metadata?.totalRecords) {
        const records =  metadata?.totalRecords / numberRecords;
        setTotalRecords(Math.ceil(records));
      }
    }
  }, [metadata]);

  const handleCategoryFilter = (categoryFilters) => {
    const params = {
      ...paramsFilter,
      categoryIds: categoryFilters,
    }
    setParamsFilter(params);
    dispatch(fetchAllData(params));
  };

  const handleBrandFilter = (brandListFilter) => {
    const params = {
      ...paramsFilter,
      brandsIds: brandListFilter,
    }
    setParamsFilter(params);
    dispatch(fetchAllData(params));
  };

  const handleNumrecordFilter = (e) => {
    e.preventDefault();
    const numberRecords = parseInt(e.target.value);
    setNumberRecords(numberRecords);

    const params = {
      ...paramsFilter,
      numberRecords: numberRecords,
    }
    setParamsFilter(params);
    dispatch(fetchAllData(params));
  }

  const handleSortFilter = (e) => {
    e.preventDefault();
    const sortBy = e.target.value;
    setSortBy(sortBy);

    const params = {
      ...paramsFilter,
      sortBy: sortBy,
    }
    setParamsFilter(params);
    dispatch(fetchAllData(params));
  }

  const handelNumRecordsFilter = (num) => {
    const params = {
      ...paramsFilter,
      firstRecord: (num - 1) * numberRecords,
    }
    setParamsFilter(params);
    dispatch(fetchAllData(params));
  }
  

  return (
    <div>

      <HeaderMobileContrainer />

      <div className="site">

        <HeaderDesktopContrainer />

        <div className="site__body">

          <BreadcrumbContrainer title="Cửa Hàng" />

          <div className="container">
            <div className="shop-layout shop-layout--sidebar--start">

              <FilterContrainer
                categoryList={categoryList}
                brandList={brandList}
                onCategoryFilter={handleCategoryFilter}
                onBrandFilter={handleBrandFilter}
              />

              <div className="shop-layout__content">
                <div className="block">
                  <div className="products-view">
                    <div className="products-view__options">
                      <div className="view-options">
                        <div className="view-options__divider" />
                        {/* <div className="view-options__control"><label htmlFor>Sắp Xếp</label>
                          <div>
                            <select
                              className="form-control form-control-sm"
                              onChange={handleSortFilter}
                              value={sortBy}
                            >
                              <option value="default">Mặc Định</option>
                              <option value="name1">Tên Tăng Dần</option>
                              <option value="name2">Tên Giảm Dần</option>
                            </select>
                          </div>
                        </div>
                        <div className="view-options__control"><label htmlFor>Hiển Thị</label>
                          <div>
                            <select 
                              className="form-control form-control-sm"
                              onChange={handleNumrecordFilter}
                              value={numberRecords}
                            >
                              <option value="12">12</option>
                              <option value="24">24</option>
                              <option value="36">36</option>
                            </select>
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="products-view__list products-list" data-layout="list" data-with-features="false">
                      <div className="products-list__body">
                        {
                          allData?.map((item, index) => {
                            return <ProductItem product={item} key={index} />
                          })
                        }
                      </div>
                    </div>

                    {
                      totalRecords && totalRecords > 0 && <PaginationContrainer
                        totalItem={totalRecords}
                        onNumRecordsFilter={handelNumRecordsFilter}
                      />
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FooterContrainer />

      </div>
    </div>
  );

}

export default ShopPage;
