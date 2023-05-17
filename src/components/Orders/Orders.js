import React, { useState } from "react";
import Cart from "../Cart/Cart";
import { Link, useLoaderData } from "react-router-dom";
import Product from "../Product/Product";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Orders.css";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";

const Orders = () => {
  const savedCart = useLoaderData();
  const [card, setCart] = useState(savedCart);

  const handleRemoveFromCart = (id) => {
    const remaining =card.filter(product => product._id !==id)
    setCart(remaining);
    removeFromDb(id);
  };

  const handleClearCart = ()=>{
    setCart([]);
    deleteShoppingCart();
  }
  //   console.log(savedCart);
  return (
    <div className="shop-container">
      <div className="review-container">
        {card.map((product) => (
          <ReviewItem
            key={product._id}
            product={product}
            handleRemoveFromCart={handleRemoveFromCart}
          ></ReviewItem>
        ))}
      </div>
      <div className="card-container">
        <Cart 
        cart={card}
        handleClearCart={handleClearCart}        
        >
            <Link className='proceed-link' to={"/checkout"}> 
            <button className="btn-proceed"> proceed CheckOut</button></Link>
        </Cart>
      </div>
    </div>
  );
};

export default Orders;
