import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SigninFormPage from "./components/SigninFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import EditSpotForm from "./components/EditSpotForm/EditSpotForm";
import CreateSpotForm from "./components/CreateSpotForm/CreateSpotForm";
import SpotsIndex from "./components/SpotsIndex/SpotsIndex";
import SpotShow from "./components/SpotShow/SpotShow";
import MySpotsIndex from "./components/MySpotsIndex/MySpotsIndex";
import MyReviews from "./components/MyReviews/MyReviews";
import EditReviewForm from "./components/EditReviewForm/EditReviewForm";
import CreateReviewForm from "./components/CreateReviewForm/CreateReviewForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <>
    <Navigation isLoaded={isLoaded} />
    {isLoaded && (
      <Switch>
        <Route path="/account/signin">
          <SigninFormPage />
        </Route>
        <Route path="/account/signup">
          <SignupFormPage />
        </Route>
        <Route exact path="/">
            <SpotsIndex />
        </Route>
        <Route exact path="/all/spots/:spotId">
            <SpotShow />
        </Route>
        <Route exact path="/user/spots">
          <MySpotsIndex />
        </Route>
        <Route exact path="/me/spots/new">
          <CreateSpotForm />
        </Route>
        <Route exact path="/user/spots/:spotId/edit">
          <EditSpotForm />
        </Route>
        <Route exact path="/user/reviews">
          <MyReviews />
        </Route>
        <Route exact path="/reviews/:reviewId/edit">
          <EditReviewForm />
        </Route>
        <Route exact path="/spots/:spotId/reviews/add">
          <CreateReviewForm />
        </Route>
      </Switch>
    )}
  </>
  );
}

export default App;
