import { csrfFetch } from './csrf'

export const RECEIVE_SPOT = 'spots/RECEIVE_SPOT';

const receiveSpots = (spot) => {
  return {
    type: RECEIVE_SPOT,
    spot
  };
};

export const fetchSpots = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/spots/${spotId}`);
  const data = await res.json();


  if (res.ok) {
    dispatch(receiveSpots(data));
  } else {
    // if response status code is 400 or greater, throw the response as an error
    throw res;
  }
  return res
};

const initialState = {}

const singleSpotReducer = (state = initialState, action) => {
  let newState = {...initialState}
	switch (action.type) {
		case RECEIVE_SPOT:
			newState[action.spot.id] = action.spot
			return newState;
		default:
			return state;
	}
};

export default singleSpotReducer;
