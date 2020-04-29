import React, { useEffect, Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Homepage from "./pages/homepage/homepage.component";
// import ShopPage from "./pages/shop/shop.component";
// import SignInAndSignUpPage from "./pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component";
// import CheckOutPage from "./pages/checkout/checkout.component";
import Spinner from "./components/spinner/spinner";

import Header from "./components/header/header.component";
import GlobalStyle from "./global.styles";
import ErrorBoundary from "./components/error-boundary/error-boundary.component";

// import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { useDispatch, useSelector } from "react-redux";
// import { setCurrentUser } from "./redux/user/user.action";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";
import { checkUserSession } from "./redux/user/user.action";
import { connect } from "react-redux";
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const SignInAndSignUpPage = lazy(() =>
  import("./pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component")
);
const CheckOutPage = lazy(() => import("./pages/checkout/checkout.component"));

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
        <ErrorBoundary>
          <Route exact path="/" component={Homepage} />
          <Suspense fallback={<Spinner />}>
            <Route path="/shop" component={ShopPage} />
            <Route exact path="/checkout" component={CheckOutPage} />
            <Route
              exact
              path="/signin"
              render={() =>
                currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />
              }
            />
          </Suspense>
        </ErrorBoundary>
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
