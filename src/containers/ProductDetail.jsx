import React from 'react';
import ProductInfo from '../components/ProductInfo';
import '../styles/ProductDetail.scss';
import img_close from '../../public/assets/icons/icon_close.png';

const ProductDetail = ()=>{
    return (
        <aside className="ProductDetail">
            <div className="ProductDetail-close">
                <img src={img_close} alt="close" />
            </div>
            <ProductInfo />
        </aside>
    );
}