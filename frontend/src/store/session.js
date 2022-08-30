import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';

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
  dispatch(setUser(data.user));
  return response;
};

export const login = (user) => async (dispatch) => {
  const { email, password } = user;

  const res = await csrfFetch('/signin', {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
  })

    const data = await res.json();
    console.log("DATA",data)
    dispatch(setUser(data));
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
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

// window.store.dispatch(window.sessionActions.signup({
//   firstName: 'Test',
//   lastName: 'User',
//   email: 'test@user.io',
//   password: 'password12'
// }));

const initialState = {
  user: null
}

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.user;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
}

export default sessionReducer;
