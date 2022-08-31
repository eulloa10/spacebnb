export const RECEIVE_SPOTS = 'spots/RECEIVE_SPOTS'

const receiveSpots = (spots) => {
  return {
    type: RECEIVE_SPOTS,
    spots
  };
};

export const fetchSpots = () => async (dispatch) => {
  const res = await fetch(`/spots`);
  const data = await res.json();
  console.log("DATA", data)
  res.data = data;
  if (res.ok) { // if response status code is less than 400
    // dispatch the receive fruits POJO action
    dispatch(receiveSpots(data));
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
      console.log("ACTIONSPOTS", action.spots)
			action.spots.forEach((spot) => {
				allSpots[spot.id] = spot;
			});
			return {...allSpots, ...newState};
		default:
			return state;
	}
};

export default spotsReducer;
