import React, { useState } from 'react';
import '@styles/Header.scss';
import { Menu } from '@components/Menu';
import IconMenu from '@icons/icon_menu.svg';
import Logo from '@logos/logo_yard_sale.svg';
import IconCart from '@icons/icon_shopping_cart.svg';

const  Header = () =>{
  const [toggle, setToggle] = useState(false);

  const handleToggle = ()=>{
    setToggle(!toggle);
  }

    return (
      <nav>
        <img src={IconMenu} className="menu" alt="menu" />
        <img
          src={Logo}
          alt="logo"
          className="logo"
        />
        <div className="navbar-left">
          <ul>
            <li>
              <a href="/">all</a>
            </li>
            <li>
              <a href="/">clothes</a>
            </li>
            <li>
              <a href="/">electronics</a>
            </li>
            <li>
              <a href="/">Furnitures</a>
            </li>
            <li>
              <a href="/">Toys</a>
            </li>
            <li>
              <a href="/">Others</a>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          <ul>
            <li className="navbar-email"
            onClick={handleToggle}>
              platzi@example.com
               </li>
            <li className="navbar-shopping-cart">
              <img src={IconCart} />
              <div>2</div>
            </li>
          </ul>
        </div>
        {toggle && <Menu />}
      </nav>
    );
}
export {Header}