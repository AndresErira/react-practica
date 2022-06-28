import React from 'react';
import image_product from 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';
import '../styles/ShoppingCartItem.scss';

const ShoppingCartItem = () =>{
    return(
        <div className='ShoppingCartItem'>
            <figure>
                <img src={image_product}/>
            </figure>
            <p>Bike</p>
            <p>$30,00</p>
        </div>
    );
}
export {ShoppingCartItem};