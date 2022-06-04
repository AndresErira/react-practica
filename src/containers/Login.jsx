import React from 'react';

const Login=()=>{
    return(
        <div className="login">
        <div className="form-container">
            <img src="./assets/logos/logo_yard_sale.svg" alt="logo" className="logo" />

            <h1 className="title">Create a new password</h1>
            <p className="subtitle">Enter a new password for you account</p>

            <form action="/" className="form">
                <label for="password">Password</label>
                <input type="password" id="password"
                 placeholder="*********"
                  className="input input-password"/>
                <label for="new-password">Password</label>
                  <input type="password" id="new-password"
                   placeholder="*********"
                    className="input input-password"/>
                <input type="submit"
                 value="Confirm"
                  className="primary-button logi-button"/>
            </form>
        </div>
    </div>
    );
}

export {Login};