const userExists = {
  user: {
    id,
    email,
    createdAt,
    updatedAt
  }
}

const initialState = {
  user: null
}

const SET_USER = 'signin/SET_USER';
const REMOVE_USER = 'signin/REMOVE_USER';

const setUser = user => {
  return {
    type: SET_USER,
    user
  }
}

const removeUser = () => {
  return {
    type: REMOVE_USER,
  }
}

const logInUser = (user) => async (dispatch) => {
  const { credential, password } = user;
  const res = await fetch('/signin', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password
    })
  })

  if (res.ok) {
    const data = await res.json();
    dispatch(setUser(data.user))
    return res;
  }
}

const signinReducer = (state=initialState, action) => {
  const newState = {...state};
  switch (action.type) {
    case SET_USER:
      return
    case REMOVE_USER:
      return initialState;
    default:
      return newState
  }
}

user ? signin : {user: null}
