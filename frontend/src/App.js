import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SigninFormPage from "./components/SigninFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import MyReviews from "./components/MyReviews/MyReviews"
import SpotBrowser from "./components/SpotBrowser/SpotBrowser";
import SpotDetail from "./components/SpotDetail/SpotDetail";
import UserSpots from "./components/UserSpots/UserSpots";

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
        <Route exact path="/">
          {/* <AllSpots /> */}
          <SpotBrowser />
        </Route>
        <Route exact path="/spots/:spotId">
          <SpotDetail />
        </Route>
        <Route path="/signin">
          <SigninFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/me/spots">
          <UserSpots />
        </Route>
        <Route path="/me/reviews">
          <MyReviews />
        </Route>
      </Switch>
    )}
  </>
  );
}

export default App;
