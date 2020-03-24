import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import "./header.style.scss";
import { auth } from "../../firebase/firebase.utils";
import { useSelector } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selector";
import { selectCurrentUser } from "../../redux/user/user.selector";

import { createStructuredSelector } from "reselect";
const Header = () => {
  // Differnt ways to use useSelector
  // ************
  // 1)
  // const currentUser = useSelector(state => state.user.currentUser);
  // const hidden = useSelector(state => state.cart.hidden);

  // 2)
  // const { currentUser, hidden } = useSelector(state => ({
  //   currentUser: state.user.currentUser,
  //   hidden: state.cart.hidden
  // }));

  // Using memoized version using reselect package
  // v1
  // const { currentUser, hidden } = useSelector(state => ({
  //   currentUser: selectCurrentUser(state),
  //   hidden: selectCartHidden(state)
  // }));

  //v2 using createStructuredSelectore

  const { currentUser, hidden } = useSelector(
    createStructuredSelector({
      currentUser: selectCurrentUser,
      hidden: selectCartHidden
    })
  );

  return (
    <div className="header">
      <Link to="/" className="logo-container">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link to="/shop" className="option">
          SHOP
        </Link>
        <Link to="/contact" className="option">
          CONTACT
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link to="/signin" className="option">
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
      {hidden ? null : <CartDropdown />}
    </div>
  );
};

export default Header;
