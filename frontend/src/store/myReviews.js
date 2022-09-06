import { csrfFetch } from './csrf'

export const LOAD_CURRENT_USER_REVIEWS = 'reviews/LOAD_CURRENT_USER_REVIEWS'

const getCurrentUserReviews = (reviews) => {
  return {
    type: LOAD_CURRENT_USER_REVIEWS,
    reviews
  }
}

export const currentUserReviews = () => async (dispatch) => {
  const res = await csrfFetch(`/me/reviews`);
  const data = await res.json();

  console.log("REVIEWDATA", data)

  if (res.ok) {
    dispatch(getCurrentUserReviews(data));
  } else {
    // if response status code is 400 or greater, throw the response as an error
    throw res;
  }
  return res;
};

const initialState = {};

const myReviewsReducer = (state = initialState, action) => {
  let newState = {...initialState}
	switch (action.type) {
    case LOAD_CURRENT_USER_REVIEWS:
      newState = {...initialState};
      action.reviews.Reviews.map((review) => newState[review.id] = review)
      console.log("LOAD_CURRENT_USER_REVIEWS", newState)
      return newState;
		default:
			return state;
	}
};

export default myReviewsReducer;
