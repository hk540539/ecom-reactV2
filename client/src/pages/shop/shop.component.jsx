import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import CollectionPageContainer from "../collection/collection.container";
import CollectionOverViewContainer from "../../components/collection-overview/collection-overview.container";
import { fetchCollectionsStart } from "../../redux/shop/shop.action";
// import { fetchCollectionsStart } from "../../redux/shop/shop.sagas";
import { connect } from "react-redux";

const ShopPage = ({ match, fetchCollectionsStart }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollectionsStart());
  }, [dispatch, fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        component={CollectionOverViewContainer}
      />

      <Route
        path={`${match.path}/:collectionId`}
        component={CollectionPageContainer}
      />
    </div>
  );
};

//export default ShopPage;

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
