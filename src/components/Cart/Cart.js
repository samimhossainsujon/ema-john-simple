import React from 'react';
import './Cart.css'

const Cart = ({ cart }) => {
    // const cart = props.cart;
    // const {cart} = props;
    // console.log(cart);
    let totalPrice = 0;
    let totalShipping = 0;
    let quantity =0;
    for (const product of cart) {
        product.quantity = product.quantity ||1;
        totalPrice = totalPrice + product.price * product.quantity;
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity;
    }

    const tax = totalPrice * 7 / 100;
    const grandTotal = totalPrice + totalShipping + tax

    return (
        <div className='cart'>
            <h4>Order summary </h4>
            <p>Selected Items: {quantity}</p>
            <p>Total Price:${totalPrice} </p>
            <p>Shipping: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h2>Grand Total: ${grandTotal}</h2>
        </div>
    );
};

export default Cart;