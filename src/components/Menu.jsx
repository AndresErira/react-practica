import React from 'react';
import '../styles/Menu.scss';

const Menu = () =>{
    return(
        <div className="menu">
            <ul>
                <li><a className="title" href="/">My orders</a></li>
                <li><a href="/">My account</a></li>
                <li><a href="/"></a>Sign out</li>
            </ul>
        </div>
    );
}
export {Menu};
