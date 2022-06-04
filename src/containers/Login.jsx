import React from 'react';
import '../styles/Login.scss'
import logo from '../../public/assets/logos/logo_yard_sale.svg'

const Login=()=>{
    return(
        <div className="login">
        <div className="form-container">
            <img src={logo} alt="logo" className="logo"/>

           

            <form action="/" className="form">
                <label for="password"  className="label">Email</label>
                <input type="email" id="email"
                 placeholder="example@mail.com"
                  className="input input-email" />
                <label for="new-password" className="label">email</label>
                  <input type="password" id="new-password"
                   placeholder="*************"
                    className="input input-password" />
                <input type="submit"
                 value="Log in"
                  className="primary-button logi-button" />
                  <a href="/">Forgot my password</a>
            </form>
            <button className="secondary-button">Sign Up</button>
        </div>
    </div>
    );
}

export {Login};