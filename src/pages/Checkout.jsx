import React from 'react';

const Checkout = () =>{
    return(
        <div className="Checkout">
        <div className="Checkout-container">
            <h1 className="title">My orders</h1>
            <div className="Checkout-content">
               <div className="order">
                <p>
                    <span>03.25.22</span>
                    <span>6 articles</span>
                    <p>
                        $560.00
                    </p>
                    <img src="./assets/icons/flechita.svg" />
                </p>
               </div>
               </div>
            <OrderItem />          
        </div>
    </div>
    );
}
export {Checkout};