import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import CollectionOverview from "../../components/collection-overview/collection-overview.component";
import CollectionPage from "../collection/collection.component";
import { createStructuredSelector } from "reselect";
import {
  selectIsCollectionFetching,
  selectIsCollectionLoaded
} from "../../redux/shop/shop.selector";

import { fetchCollectionsStartAsync } from "../../redux/shop/shop.action";

// Loading effect uysing Hoc
import WithSpinner from "../../components/with-spinner/with-spinner.component";
const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

const ShopPage = ({ match }) => {
  const dispatch = useDispatch();
  const { isCollectionFetching, isCollectionLoading } = useSelector(
    createStructuredSelector({
      isCollectionFetching: selectIsCollectionFetching,
      isCollectionLoading: selectIsCollectionLoaded
    })
  );

  useEffect(() => {
    dispatch(fetchCollectionsStartAsync());
  }, [dispatch]);

  setTimeout(() => {
    console.log(isCollectionFetching);
  }, 3000);
  return (
    <div className="shop-page">
      <Route
        exact
        path={`${match.path}`}
        render={props => (
          <CollectionOverviewWithSpinner
            isLoading={isCollectionFetching}
            {...props}
          />
        )}
      />
      <Route
        path={`${match.path}/:collectionId`}
        render={props => (
          <CollectionPageWithSpinner
            isLoading={!isCollectionLoading}
            {...props}
          />
        )}
      />
    </div>
  );
};

export default ShopPage;
