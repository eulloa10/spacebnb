export const RECEIVE_SPOTS = 'spots/RECEIVE_SPOTS';
export const ADD_SPOT = 'spots/ADD_SPOT';
export const DELETE_SPOT = 'spots/DELETE_SPOT';
export const EDIT_SPOT = 'spots/EDIT_SPOT'

const receiveSpots = (spots) => {
  return {
    type: RECEIVE_SPOTS,
    spots
  };
};

const addSpot = (spot) => {
  return {
    type: ADD_SPOT,
    spot
  }
}

const deleteSpot = (spotId) => {
  return {
    type: DELETE_SPOT,
    spotId
  }
}

const editSpot = (spotId) => {
  return {
    type: EDIT_SPOT,
    spotId
  }
}

export const fetchSpots = () => async (dispatch) => {
  const res = await fetch(`/spots`);
  const data = await res.json();
  console.log("DATA", data.Spots)
  res.data = data;
  if (res.ok) {
    dispatch(receiveSpots(data.Spots));
  } else {
    // if response status code is 400 or greater, throw the response as an error
    throw res;
  }
};

const initialState = {}

const spotsReducer = (state = initialState, action) => {
  const newState = {...initialState}
	switch (action.type) {
		case RECEIVE_SPOTS:
			const allSpots = {};
			action.spots.forEach((spot) => {
				allSpots[spot.id] = spot;
			});
			return {...allSpots, ...newState};
		default:
			return state;
	}
};

export default spotsReducer;
