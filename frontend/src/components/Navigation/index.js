import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session'
import './Navigation.css';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;

  const logInDemoUser = () => {
    dispatch(sessionActions.login({
      "email": "demo@user.io",
      "password": "password"
    }))
  }

  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <div className='auth-actions'>
          <NavLink className='login-button' to="/signin">Log In</NavLink>
          <NavLink className='signup-button' to="/signup">Sign Up</NavLink>
          <NavLink onClick={logInDemoUser} className='demo-user-button' to="/">Demo User</NavLink>
        </div>
      </>
    );
  }

  return (
    <header className='main-header'>
      <ul className='main-header-options'>
        <li>
          <NavLink className='home' exact to="/">Spacebnb</NavLink>
        </li>
        <li className='session-links'>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </header>
  );
}

export default Navigation;
