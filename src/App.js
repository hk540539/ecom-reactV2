import React, { useEffect } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up-page/sign-in-and-sign-up-page.component";
import CheckOutPage from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";
import {
  auth,
  createUserProfileDocument,
  addCollectionsAndDocuments
} from "./firebase/firebase.utils";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "./redux/user/user.action";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selector";
import { selectCollectionsForPreview } from "./redux/shop/shop.selector";

function App() {
  const dispatch = useDispatch();
  // const currentUser = useSelector(state => state.user.currentUser);
  const { currentUser } = useSelector(
    createStructuredSelector({ currentUser: selectCurrentUser })
  );

  const { collectionsArray } = useSelector(
    createStructuredSelector({ collectionsArray: selectCollectionsForPreview })
  );
  // console.log(collectionsArray, "after useSelectot");

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          dispatch(
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
          );
        });
      } else {
        dispatch(setCurrentUser(userAuth));
        console.log(collectionsArray, "after useSelectot");

        addCollectionsAndDocuments(
          "collections",
          collectionsArray.map(({ title, items }) => ({ title, items }))
        );
      }
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, [dispatch]);
  // useEffect(() => {
  //   console.log(currentUser);
  // }, [currentUser]);

  return (
    <div>
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
}

export default App;
