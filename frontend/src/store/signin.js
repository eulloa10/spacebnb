import { csrfFetch } from './csrf';

const initialState = {
  user: null
}

export const SET_USER = 'signin/setUser';
export const REMOVE_USER = 'signin/removeUser';

export const setUser = user => {
  return {
    type: SET_USER,
    user
  }
}

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  }
}

export const signinUser = (user) => async (dispatch) => {
  const { email, password } = user;

  const res = await csrfFetch('/signin', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
  })

    const userData = await res.json();
    dispatch(setUser(userData));
    return res;
}


const signinReducer = (state=initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case SET_USER:
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      return initialState;
    default:
      return newState
  }
}

export default signinReducer;
