import React from 'react';
import "./Logo.css";

const Logo = () => {
    return (
        <div className='logo-container'>
            <div className='logo'>
                <img src="https://i.ibb.co/bPYrD3L/favicon-ico-removebg-preview.png" alt="" className='img-fluid' />
            </div>
            <div className='logo-name'>
                <h5 className='text-white fw-bold'>Library</h5>
            </div>
        </div>
    );
};

export default Logo;