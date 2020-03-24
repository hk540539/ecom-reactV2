import React from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.style.scss";
import { toggleCartHidden } from "../../redux/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItemsCount } from "../../redux/cart/cart.selector";
import { createStructuredSelector } from "reselect";

const CartIcon = () => {
  const { itemCount } = useSelector(
    createStructuredSelector({
      itemCount: selectCartItemsCount
    })
  );

  // const itemCount = cartItems.reduce(
  //   (acc, cartItems) => acc + cartItems.quantity,
  //   0
  // );

  const dispatch = useDispatch();
  return (
    <div className="cart-icon" onClick={() => dispatch(toggleCartHidden())}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

export default CartIcon;
