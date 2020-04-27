import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component";
import CheckOutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";
import GlobalStyle from "./global.styles";

// import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { useDispatch, useSelector } from "react-redux";
// import { setCurrentUser } from "./redux/user/user.action";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.action";
import { connect } from "react-redux";

// function App({ checkUserSession }) {
//   const dispatch = useDispatch();
//   // const currentUser = useSelector((state) => state.user.currentUser);
//   const { currentUser } = useSelector(
//     createStructuredSelector({ currentUser: selectCurrentUser })
//   );
//   useEffect(() => {
//     dispatch(checkUserSession());
//   }, [dispatch, checkUserSession]);

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage}></Route>
        <Route path="/shop" component={ShopPage}></Route>
        <Route exact path="/checkout" component={CheckOutPage}></Route>
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
          }
        ></Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
//export default App;