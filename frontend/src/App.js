import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SigninFormPage from "./components/SigninFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return isLoaded && (
    <Switch>
      <Route path="/signin">
        <SigninFormPage />
      </Route>
      <Route path="/signup">
        <SignupFormPage />
      </Route>
    </Switch>
  );
}


// function App() {
//   return (
//     <Switch>
//       <Route path="/signin">
//         <SigninFormPage />
//       </Route>
//     </Switch>
//   );
// }

export default App;
