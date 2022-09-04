import React from 'react';

import { Link, useNavigate } from "react-router-dom";
import ConfigUtil from '../utils/ConfigUtil';

const ProductItem = ({
    product,
    key,
}) => {

    const navigate = useNavigate();

    const handleAddToCart = (e) => {
        e.preventDefault();

        navigate("/product/" + product.id);
    };

    let productAttributes = product?.colorAttributes;
    if (!productAttributes) {
        productAttributes = product?.sizeAttributes;
    }

    return (
        <div className="products-list__item" key={key}>
            <div className="product-card">
                <div className="product-card__image">
                    <Link to={`/product/${product.id}`} >
                        <img src={ConfigUtil.HOST_URL + product?.image} width={200} height={160} alt={product?.name}/>
                    </Link>
                </div>
                <div className="product-card__info">
                    <div className="product-card__name">
                        <Link to={`/product/${product.id}`} >{product?.name}</Link>
                    </div>
                    <ul className="product-card__features-list">
                        <li>SKU: {product?.sku || ''}</li>
                        <li>Danh Mục: {product?.category?.name || ''}</li>
                        <li>Thương Hiệu: {product?.brand?.name || ''}</li>
                        <li>Mô Tả: {product?.description || ''}</li>
                    </ul>
                </div>
                <div className="product-card__actions">
                    <div className="product-card__availability">
                        Tình Trạng: <span className="text-success">{product?.inStock ? 'Còn Hàng' : 'Hết Hàng'}</span>
                    </div>
                    <div className="product-card__prices">
                        {productAttributes[0]?.price.toLocaleString('en-US')} VNĐ
                    </div>
                    <div className="product-card__buttons">
                        <button
                            className="btn btn-secondary product-card__addtocart product-card__addtocart--list"
                            type="button"
                            onClick={handleAddToCart}
                        >
                           { 'Xem Chi Tiết' }
                        </button> 
                    </div>
                </div>
            </div>
        </div>
    );

}

export default ProductItem;
