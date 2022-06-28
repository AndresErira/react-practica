import React from 'react';
import '../styles/Order.scss';
import arrow from '../../public/assets/icons/flechita.svg';

const order = ()=>{
    return(
        <div className="Order">
            <p>
                <span>0.3.25.21</span>
                <span>6 articles</span>
            </p>
            <p>$560.00</p>
            <img src={arrow} alt="arrow" />
        </div>
    );
}
export {arrow};