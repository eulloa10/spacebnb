import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SigninFormPage from "./components/SigninFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/LandingPage/AllSpots";
import MySpots from "./components/MySpots/MySpots";
import MyReviews from "./components/MyReviews/MyReviews"

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
          <AllSpots />
        </Route>
        <Route path="/signin">
          <SigninFormPage />
        </Route>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
        <Route path="/me/spots">
          <MySpots />
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
