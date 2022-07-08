import React from 'react';
import '@styles/OrderItem.scss';
//import imgProduct from "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
import close from '@icons/icon_close.png';

const OrderItem = ({ product })=>{
    return(
        <div className="OrderItem">
            <figure>
                <img src={product.images[0]} alt="Bike"/>
            </figure>
            <p>{product.title}</p>
            <p>${product.price}</p>
            <img src={close} alt="close"/>
        </div>
    );
}
export {OrderItem};