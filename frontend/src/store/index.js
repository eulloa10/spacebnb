import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import spotsReducer from "./spots";
import reviewsReducer from './reviews';
import myReviewsReducer from "./myReviews";
import singleSpotReducer from "./singleSpot";
import singleSpotReviewsReducer from "./singleSpotReviews";

const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer,
  reviews: reviewsReducer,
  myReviews: myReviewsReducer,
  singleSpot: singleSpotReducer,
  singleSpotReviews: singleSpotReviewsReducer
});

let enhancer;

if (process.env.NODE_ENV === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require("redux-logger").default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
