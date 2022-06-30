import React from 'react';
import Logo from '@logos/logo_yard_sale.svg';
import '../styles/NewPassword.scss';

const NewPassword = ()=>{
    return(
        <div className="NewPassword">
            <div className="NewPassword-container">
                <img src={Logo} alt="Logo" className="logo" />
                <h1 className="title">Create a new password</h1>
                <p className="subtitle">Enter a new password for your account</p>
                <form action="/" className="form">
                    <label htmlFor="password"
                    className="label">Password</label>
                    <input type="password"
                     className="input input-password"
                      placeholder="**************"
                      id='password' />
                    <label htmlFor="new-password"
                    className="label">New password</label>
                    <input type="password"
                     className="input input-password"
                      placeholder="**************"
                      id='new-password' />
                      <input type="submit" value="Confirm" className='primary-button login-button' />
                </form>
            </div>
        </div>
    );
}
export {NewPassword};