import React from 'react';
import '../styles/ProductInfo.scss';
import btnCart from '../../public/assets/icons/bt_add_to_cart.svg';

const ProductInfo=()=>{
    return(
        <>
            <img src='' alt='bike' />
            <div className="productInfo">
                <p>$35,00</p>
                <p>Bike</p>
                <p>With its practical position, this bike also fulfills a decotative function, add your hall or workspace</p>
                <button className='primary-button add-to-card-button'>
                    <img src={btnCart} alt='add to cart' />
                </button>
            </div>
        </>
    );
}
export {ProductInfo};