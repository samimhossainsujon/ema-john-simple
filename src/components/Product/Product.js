import React from 'react';
import './Product.css'

const Product = (props) => {    
    const { img, name, seller, price, ratings } = props.product;
    const handleAddToCart = props.handleAddToCart
    ;


   

    return (
        <div className='product'>
            <img src={img} alt="" />

            <div className='product-info'>
                <h3 className='product-name'>{name}</h3>
                <h4>Price: ${price}</h4>
                <p>ManuFacturer: {seller}</p>
                <p><small>Rating: {ratings}</small></p>
            </div>
            <button onClick={() => handleAddToCart(props.product)} className='btn-cart'>Add to Cart</button>

        </div>
    );
};

export default Product;