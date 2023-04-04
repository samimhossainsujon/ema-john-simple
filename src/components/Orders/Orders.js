import React, { useState } from "react";
import Cart from "../Cart/Cart";
import { useLoaderData } from "react-router-dom";
import Product from "../Product/Product";
import ReviewItem from "../ReviewItem/ReviewItem";
import "./Orders.css";
import { removeFromDb } from "../../utilities/fakedb";

const Orders = () => {
  const savedCart = useLoaderData();
  const [card, setCart] = useState(savedCart);

  const handleRemoveFromCart = (id) => {
    const remaining =card.filter(product => product.id !==id)
    setCart(remaining);
    removeFromDb(id);
  };
  //   console.log(savedCart);
  return (
    <div className="shop-container">
      <div className="review-container">
        {card.map((product) => (
          <ReviewItem
            key={product.id}
            product={product}
            handleRemoveFromCart={handleRemoveFromCart}
          ></ReviewItem>
        ))}
      </div>
      <div className="card-container">
        <Cart cart={card}></Cart>
      </div>
    </div>
  );
};

export default Orders;
