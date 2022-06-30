import React, {useState} from 'react';
import '@styles/ProductItem.scss';
//import img_product from "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
import btncart from '@icons/bt_add_to_cart.svg';

const ProductItem = ()=>{
    const [estado, setEstado]= useState("Inicial");
    const handleState=()=>{
        setEstado("Modificado desde el manejador")
    }

    return(
        <div className='ProductItem'>
            <img src="https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" alt="" />
            <div className="product-info">
                <div>
                    <p onClick={handleState}>$120,00</p>
                    <p>{estado}</p>
                </div>
                <figure>
                    <img src={btncart} alt="button cart" />
                </figure>
            </div>
        </div>
    )
}
export {ProductItem};