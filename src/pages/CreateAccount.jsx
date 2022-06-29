import React from 'react';
import '../styles/CreateAccount.scss';

const CreateAccount = ()=>{
    return(
        <div className="CreateAccount">
            <div className="CreateAccount-container">
                <h1 className="title">My account</h1>
                <form action="/" className="form">
                    <div>
                        <label htmlFor="name" className="label">Name</label>
                        <input type="text" id="name" className="input input-name" placeholder="teff" />
                        <label htmlFor="email" className="label">email</label>
                        <input type="text" id="email" className="input input-email" placeholder="platzi@team.co" />
                        <label htmlFor="password" className="label">Password</label>
                        <input type="password" id="password" className="input input-password" />
                    </div>
                        <input type="submit" value="Create" className="login-button primary-button" />
                </form>
            </div>
        </div>
    );
}
export {CreateAccount};