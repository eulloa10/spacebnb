import { csrfFetch } from './csrf'

export const LOAD_SINGLE_SPOT_REVIEWS = 'reviews/LOAD_SINGLE_SPOT_REVIEWS';

const getReviews = (reviews) => {
  return {
    type: LOAD_SINGLE_SPOT_REVIEWS,
    reviews
  }
}

export const fetchSingleSpotReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/spots/${spotId}/reviews`);
  const data = await res.json();

  if (res.ok) {
    dispatch(getReviews(data));
  }
  return res;
}

const initialState = {};

const singleSpotReviewsReducer = (state = initialState, action) => {
  let newState = {...initialState}
	switch (action.type) {
		case LOAD_SINGLE_SPOT_REVIEWS:
      newState = {...initialState};
      if (action.reviews.Reviews.length === 0) {
        return {newState};
      }

			newState[action.reviews.Reviews[0].spotId] = action.reviews.Reviews;
			return newState;
		default:
			return state;
	}
};

export default singleSpotReviewsReducer;
