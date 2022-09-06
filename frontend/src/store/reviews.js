import { csrfFetch } from './csrf'

export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
export const LOAD_CURRENT_USER_REVIEWS = 'reviews/LOAD_CURRENT_USER_REVIEWS'
export const ADD_REVIEW = 'reviews/ADD_REVIEW';
export const REMOVE_REVIEW = 'reviews/REMOVE_REVIEW';
export const EDIT_REVIEW = 'reviews/EDIT_REVIEW';

const getReviews = (reviews) => {
  return {
    type: LOAD_REVIEWS,
    reviews
  }
}

const getCurrentUserReviews = (reviews) => {
  return {
    type: LOAD_CURRENT_USER_REVIEWS,
    reviews
  }
}

const addNewReview = (review) => {
  return {
    type: ADD_REVIEW,
    review
  }
}

const deleteReview = (reviewId) => {
  return {
    type: REMOVE_REVIEW,
    reviewId
  }
}

const updateReview = (review) => {
  return {
    type: EDIT_REVIEW,
    review
  }
}

export const fetchReviews = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/spots/${spotId}/reviews`);
  const data = await res.json();
  if (res.ok) {
    dispatch(getReviews(data));
  }
  return res;
}

export const currentUserReviews = () => async (dispatch) => {
  const res = await csrfFetch(`/me/reviews`);
  const data = await res.json();

  // console.log("REVIEWDATA", data)
  // console.log("RES", res)
  if (res.ok) {
    dispatch(getCurrentUserReviews(data));
  } else {
    // if response status code is 400 or greater, throw the response as an error
    throw res;
  }
  return res;
};

export const editReview = (reviewId, reviewData) => async (dispatch) => {
  // console.log("RDATA", reviewData.stars)
  const res = await csrfFetch(`/reviews/${reviewId}`, {
    method: 'PUT',
    body: JSON.stringify({
      "review": reviewData.review,
      "stars": reviewData.stars
  })
  });

  if (res.ok) {
		const updatedReview = await res.json();
		dispatch(updateReview(updatedReview));
	}
  return res;
}

export const deleteSelectedReview = (reviewId) => async (dispatch) => {
  const res = await csrfFetch(`/reviews/${reviewId}`, {
    method: 'DELETE'
  })

  if (res.ok) {
    dispatch(deleteReview(reviewId));
  }
  return res;
}

export const createNewReview = (spotId, review) => async (dispatch) => {
  const res = await csrfFetch(`/spots/${spotId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(review)
  } )

  if (res.ok) {
		const newReview = await res.json();
		dispatch(addNewReview(newReview));
	}
  return res;
}


const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState = {...initialState}
	switch (action.type) {
		case LOAD_REVIEWS:
      newState = {...state};
			newState[action.reviews.Reviews[0].spotId] = action.reviews.Reviews;
			return newState;
    case LOAD_CURRENT_USER_REVIEWS:
      newState = {...state};
      action.reviews.Reviews.map((review) => newState[review.id] = review)
      // console.log("ACTIONREVIEWS", action.reviews)
      // console.log("NS2", newState)
      return newState;
    case EDIT_REVIEW:
      newState = {...state};
      newState[action.review.id] = action.review;
      return newState;
    case REMOVE_REVIEW:
      newState = {...state};
      delete newState[action.reviewId];
      return newState;
    case ADD_REVIEW:
      newState = {...state};
      newState[action.review.id] = action.review;
      return newState;
		default:
			return state;
	}
};

export default reviewsReducer;
