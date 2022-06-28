import React from 'react';
import '../styles/OrderItem.scss';
import imgProduct from "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
import close from '../../public/assets/icons/icon_close.png';

const OrderItem = ()=>{
    return(
        <div className="OrderItem">
            <figure>
                <img src={imgProduct} alt="Bike"/>
            </figure>
            <p>Bike</p>
            <p>$30,00</p>
            <img src={close} alt="close"/>
        </div>
    );
}
export {OrderItem};