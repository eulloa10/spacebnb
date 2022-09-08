import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session'
import './Navigation.css';
import spaceIcon from '../../images/spaceicon.png'

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
          <NavLink to="/signin"><button className='login-button'>Log In</button></NavLink>
          <NavLink to="/signup"><button className='signup-button'>Sign Up</button></NavLink>
          <NavLink onClick={logInDemoUser} to="/"><button className='demo-user-button'>Demo User</button></NavLink>
        </div>
      </>
    );
  }

  return (
    <header className='main-header'>
      <ul className='main-header-options'>
        <li className='space-home'>
          <NavLink className='home' exact to="/">
            <img src={spaceIcon} alt="icon"/>pacebnb
          </NavLink>
        </li>
        <li className='session-links'>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </header>
  );
}

export default Navigation;
