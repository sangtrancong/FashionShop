import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';

import { useTranslation } from 'react-i18next';

import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  ContentHeader,
  CardHeader,
} from "../../components";

import { fetchFormById, saveSingle } from "../../redux/productSlice";

const ProductForm = () => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.products);
  const { error = '', selectedItem = {} } = store;
  const { data = {}, messages = {}, metadata = {} } = selectedItem;

  const { id = 0 } = useParams();

  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [productAttributeList, setProductAttributeList] = useState([]);
  const [attributeList, setAttributeList] = useState([]);

  const [avatarMul, setAvatarMul] = useState(null);

  const [allValues, setAllValues] = useState(data);
  const [allAttributeValues, setAttributeAllValues] = useState([]);

  const { t } = useTranslation();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFormById(id));
  }, []);

  useEffect(() => {
    if (data && id) {
      setAllValues(data);
    }

    if (metadata && metadata?.categorys) {
      setCategoryList(JSON.parse(metadata?.categorys));
    }

    if (metadata && metadata?.brands) {
      setBrandList(JSON.parse(metadata?.brands));
    }

    if (metadata && metadata?.productAttributes) {
      setProductAttributeList(JSON.parse(metadata?.productAttributes));

      let newAllAttributeValues = JSON.parse(metadata?.productAttributes).map((item) => ({
        id: item?.id,
        quantity: item?.quantity,
        discount: item?.discount,
        price: item?.price,
        attributeId: parseInt(item?.attribute?.id),
        status: item?.status
      }));

      newAllAttributeValues.push({
        id: 0,
        quantity: 1,
        discount: 0,
        price: 0,
        attributeId: 0,
        status: true,
      })
      setAttributeAllValues(newAllAttributeValues);
    }

    if (metadata && metadata?.attributes) {
      setAttributeList(JSON.parse(metadata?.attributes));
    }
  }, [data, metadata]);

  useEffect(() => {
    if (error && error === 'SUCCESS') {
      toast.success('C???p Nh???t D??? Li???u Th??nh C??ng');

      setTimeout(function () {
        navigate("/webadmin/product");
      }, 1500);
    }
  }, [error]);

  const handleChangeValue = (e) => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value })
  }

  const handleChangeAttributeValue = (e, item) => {
    e.preventDefault();

    let newAllAttributeValues = [...allAttributeValues];
    const attrIndex = allAttributeValues?.findIndex((attr) => attr?.id === item?.id);

    let newItem = allAttributeValues[attrIndex];
    if (newItem) {
      newItem = {
        ...newItem,
        [e.target.name]: parseInt(e.target.value),
      }
      newAllAttributeValues[attrIndex] = newItem;
    }

    // console.log('newAllAttributeValues', attrIndex, newAllAttributeValues)

    setAttributeAllValues(newAllAttributeValues);
  }

  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append('id', id || 0);
    formData.append('sku', allValues?.sku || '');
    formData.append('name', allValues?.name || '');
    formData.append('description', allValues?.description || '');
    formData.append('detail', allValues?.detail || '');
    formData.append('categoryId', allValues?.categoryId || 0);
    formData.append('brandId', allValues?.brandId || 0);
    formData.append('status', allValues?.status || true);
    if (avatarMul) {
      formData.append('avatarMul', avatarMul);
    }

    formData.append('attributes', JSON.stringify(allAttributeValues));

    dispatch(saveSingle(formData));
  };

  return (
    <div className="content-wrapper">
      <ContentHeader
        title="Qu???n L?? S???n Ph???m"
        breadcrumb="S???n Ph???m"
      />

      <section className="content">
        <ToastContainer />
        <div className="row">
          <div className="col-md-12">
            <input type="submit" value="L??u d??? li???u" className="btn btn-success float-right mb-3" onClick={(e) => handleSubmit(e)} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Th??ng Tin Chung</h3>
                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                    <i className="fas fa-minus" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div class="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputSKU">SKU</label>
                      <input
                        id="inputSKU"
                        name="sku"
                        type="text"
                        className={`${messages?.sku ? 'form-control is-invalid' : 'form-control'}`}
                        value={allValues?.sku}
                        onChange={(e) => handleChangeValue(e)}
                      />
                      <span id="inputName-error" class="error invalid-feedback">{t(messages?.sku)}</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="inputStatus">Tr???ng Th??i</label>
                      <select
                        id="inputStatus"
                        name="status"
                        className="form-control custom-select"
                        value={allValues?.status}
                        onChange={(e) => handleChangeValue(e)}
                      >
                        <option value='true'>Hi???n Th???</option>
                        <option value='false'>???n</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputName">T??n S???n Ph???m</label>
                  <input
                    id="inputName"
                    name="name"
                    type="text"
                    className={`${messages?.name ? 'form-control is-invalid' : 'form-control'}`}
                    value={allValues?.name}
                    onChange={(e) => handleChangeValue(e)}
                  />
                  <span id="inputName-error" class="error invalid-feedback">{t(messages?.name)}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="inputDescription">M?? T??? Ng???n</label>
                  <textarea
                    id="inputDescription"
                    name="description"
                    className="form-control"
                    rows={4}
                    value={allValues?.description}
                    onChange={(e) => handleChangeValue(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="inputDetail">M?? T??? Chi Ti???t</label>
                  <textarea
                    id="inputDetail"
                    name="detail"
                    className="form-control"
                    rows={20}
                    value={allValues?.detail}
                    onChange={(e) => handleChangeValue(e)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card card-secondary">
              <div className="card-header">
                <h3 className="card-title">Danh M???c v?? Th????ng Hi???u</h3>
                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                    <i className="fas fa-minus" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="inputCategory">Danh M???c</label>
                  <select
                    id="inputCategory"
                    name="categoryId"
                    className={`${messages?.category ? 'form-control custom-select is-invalid' : 'form-control custom-select'}`}
                    value={allValues.categoryId}
                    onChange={(e) => handleChangeValue(e)}
                  >
                    <option key={0} value={0}>Ch???n danh m???c</option>
                    {
                      categoryList?.map((item, index) => {
                        return <option key={index} value={item.id}>{item.name}</option>
                      })
                    }
                  </select>
                  <span id="inputName-error" class="error invalid-feedback">{t(messages?.category)}</span>
                </div>
                <div className="form-group">
                  <label htmlFor="inputBrand">Th????ng Hi???u</label>
                  <select
                    id='inputBrand'
                    name='brandId'
                    className={`${messages?.brand ? 'form-control custom-select is-invalid' : 'form-control custom-select'}`}
                    value={allValues.brandId}
                    onChange={(e) => handleChangeValue(e)}
                  >
                    <option key={0} value={0}>Ch???n th????ng hi???u</option>
                    {
                      brandList?.map((item, index) => {
                        return <option key={index} value={item.id}>{item.name}</option>
                      })
                    }
                  </select>
                  <span id="inputName-error" class="error invalid-feedback">{t(messages?.brand)}</span>
                </div>
              </div>
            </div>
            <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">H??nh ???nh ?????i Di???n</h3>
                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                    <i className="fas fa-minus" />
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="form-group">
                  <div className="custom-file">
                    <input
                      id="customFile"
                      name="avatarMul"
                      type="file"
                      className="custom-file-input"
                      onChange={(e) => setAvatarMul(e.target.files[0])}
                    />
                    <label className="custom-file-label">{avatarMul?.name || 'Ch???n t???p tin'}</label>
                  </div>
                </div>
                <img class="img-fluid" src={allValues?.image} alt={allValues?.name} style={{ width: 'auto', height: '150px' }}></img>
              </div>
            </div>

            {/* <div className="card card-info">
              <div className="card-header">
                <h3 className="card-title">H??nh ???nh B??? Sung</h3>
                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                    <i className="fas fa-minus" />
                  </button>
                </div>
              </div>
              <div className="card-body p-0">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Functional-requirements.docx</td>
                      <td className="text-right py-0 align-middle">
                        <div className="btn-group btn-group-sm">
                          <a href="#" className="btn btn-info"><i className="fas fa-eye" /></a>
                          <a href="#" className="btn btn-danger"><i className="fas fa-trash" /></a>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div> */}
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Qu???n L?? T???n Kho</h3>
                <div className="card-tools">
                  <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                    <i className="fas fa-minus" />
                  </button>
                </div>
              </div>
              <div className="card-body">

                {
                  allAttributeValues?.map((item, index) => (
                    <div class="row" key={index}>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="inputAttr">Thu???c T??nh</label>
                          <select
                            id="inputAttr"
                            name="attributeId"
                            className="form-control custom-select"
                            value={item?.attributeId}
                            onChange={(e) => handleChangeAttributeValue(e, item)}
                          >
                            <option value={0} key={-1}>Ch???n thu???c t??nh</option>
                            {
                              attributeList?.map((item, index) => (
                                <option value={item?.id} key={index}>{item?.name}</option>
                              ))
                            }
                          </select>
                          {/* <span id="inputAttr-error" class="error invalid-feedback">{t(messages?.sku)}</span> */}
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="inputStatus">S??? L?????ng</label>
                          <input
                            id="inputQuantity"
                            name="quantity"
                            type="number"
                            className={`${messages?.name ? 'form-control is-invalid' : 'form-control'}`}
                            value={item?.quantity}
                            onChange={(e) => handleChangeAttributeValue(e, item)}
                          />
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="inputPrice">Gi?? B??n</label>
                          <input
                            id="inputPrice"
                            name="price"
                            type="number"
                            className={'form-control'}
                            value={item?.price}
                            onChange={(e) => handleChangeAttributeValue(e, item)}
                          />
                        </div>
                      </div>

                      {/* <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="inputDiscount">Gi???m Gi??</label>
                          <input
                            id="inputDiscount"
                            name="discount"
                            type="number"
                            className={'form-control'}
                            value={item?.discount}
                            onChange={(e) => handleChangeAttributeValue(e, item)}
                          />
                        </div>
                      </div> */}

                      <div className="col-md-3">
                        <div className="form-group">
                          <label htmlFor="inputStatus">Tr???ng Th??i</label>
                          <select
                            id="inputStatus"
                            name="status"
                            className="form-control"
                            value={item?.status}
                            onChange={(e) => handleChangeAttributeValue(e, item)}
                          >
                            <option key={0} value={0}>Hi???n Th???</option>
                            <option key={1} value={1}>B???n Nh??p</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))
                }

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

}

export default ProductForm;
