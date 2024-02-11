import React from 'react';
import './Breadcrums.css';
import arrow_icon from '../Assets/breadcrum_arrow.png';

export const Breadcrums = ( props) => {

    const {product} = props;

    return (
    <div className='breadcrum' >
    HOME <img src={arrow_icon} alt=''/> SHOP <img src={arrow_icon} alt=''/>
    {product.categpry} <img src={arrow_icon} alt=''/> {product.name}
    </div>
  )
}
