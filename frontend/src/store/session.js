import { csrfFetch } from './csrf';

const initialState = {
  user: null
}

export const SET_USER = 'signin/setUser';
export const REMOVE_USER = 'signin/removeUser';
export const RESTORE_USER = 'signin/restoreUser'

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

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/session');
  const data = await response.json();
  console.log("DATA", data)
  dispatch(setUser(data));
  return response;
};

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

export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, email, password } = user;
  const response = await csrfFetch("/signup", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });
  const data = await response.json();
  console.log('DATA', data)
  dispatch(setUser(data));
  return response;
};

// window.store.dispatch(window.sessionActions.signup({
//   firstName: 'John',
//   lastName: 'Jackson',
//   email: 'new@user.io',
//   password: 'password'
// }));


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
