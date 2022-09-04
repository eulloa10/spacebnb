import { csrfFetch } from './csrf'

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

const editSpot = (spot) => {
  return {
    type: EDIT_SPOT,
    spot
  }
}

export const fetchSpots = () => async (dispatch) => {
  const res = await csrfFetch(`/spots`);
  const data = await res.json();

  if (res.ok) {
    dispatch(receiveSpots(data.Spots));
  } else {
    // if response status code is 400 or greater, throw the response as an error
    throw res;
  }
};

export const currentUserSpots = () => async (dispatch) => {
  const res = await csrfFetch(`/me/spots`);
  const data = await res.json();

  if (res.ok) {
    dispatch(receiveSpots(data.Spots));
  } else {
    // if response status code is 400 or greater, throw the response as an error
    throw res;
  }
};

export const updateSpot = (spotId, spotData) => async (dispatch) => {
  const res = await csrfFetch(`/spots/${spotId}`, {
    method: 'PUT',
    body: JSON.stringify(spotData)
  })

  if (res.ok) {
		const updatedSpot = await res.json();
		dispatch(editSpot(updatedSpot));
	}
  return res;
}

export const deleteSelectedSpot = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/spots/${spotId}`, {
    method: 'DELETE',
  })

  if (res.ok) {
		dispatch(deleteSpot(spotId));
	}
  return res;
}

export const createNewSpot = (spot) => async(dispatch) => {
  const res = await csrfFetch('/spots', {
    method: 'POST',
    body: JSON.stringify(spot)
  } )

  if (res.ok) {
		const newSpot = await res.json();
		dispatch(addSpot(newSpot));

	}
  return res;
}

const initialState = {}

const spotsReducer = (state = initialState, action) => {
  let newState = {...initialState}
	switch (action.type) {
		case RECEIVE_SPOTS:
      newState = {...state};
			action.spots.forEach((spot) => {
				newState[spot.id] = spot;
			});
			return newState;
    case ADD_SPOT:
      newState = {...state};
      newState[action.spot.id] = action.spot
      return newState;
    case EDIT_SPOT:
      newState = {...state};
      newState[action.spot.id] = action.spot;
      return newState;
    case DELETE_SPOT:
      newState = {...state};
      delete newState[action.spotId];
      return newState;
		default:
			return state;
	}
};

export default spotsReducer;
