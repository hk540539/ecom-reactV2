import React, { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCollectionsStart } from "../../redux/shop/shop.action";

// import CollectionPageContainer from "../collection/collection.container";
// import CollectionOverViewContainer from "../../components/collection-overview/collection-overview.container";
import Spinner from "../../components/spinner/spinner";
const CollectionPageContainer = lazy(() =>
  import("../collection/collection.container")
);

const CollectionOverViewContainer = lazy(() =>
  import("../../components/collection-overview/collection-overview.container")
);

// import { fetchCollectionsStart } from "../../redux/shop/shop.sagas";

const ShopPage = ({ match, fetchCollectionsStart }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollectionsStart());
  }, [dispatch, fetchCollectionsStart]);

  return (
    <div className="shop-page">
      <Suspense fallback={<Spinner />}>
        <Route
          exact
          path={`${match.path}`}
          component={CollectionOverViewContainer}
        />

        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPageContainer}
        />
      </Suspense>
    </div>
  );
};

//export default ShopPage;

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});

export default connect(null, mapDispatchToProps)(ShopPage);
