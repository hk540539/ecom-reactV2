import React from "react";
import "./cart-items.style.scss";

const CartItems = ({ item: { imageUrl, name, price, quantity } }) => (
  <div className="cart-item">
    <img src={imageUrl} alt="itme" />
    <div className="item-details">
      <span className="name">{name}</span>
      <span className="price">
        {quantity} x &#8377;{price}
      </span>
    </div>
  </div>
);

export default CartItems;
