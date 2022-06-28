import React from 'react';
import '../styles/ProductItem.scss';
import img_product from "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
import btncart from '../../public/assets/icons/bt_add_to_cart.svg';

const ProductItem = ()=>{
    return(
        <div className='ProductItem'>
            <img src={img_product} alt="" />
            <div className="product-info">
                <div>
                    <p>$120,00</p>
                    <p>Bike</p>
                </div>
                <figure>
                    <img src={btncart} alt="" />
                </figure>
            </div>
        </div>
    )
}
export {ProductItem};