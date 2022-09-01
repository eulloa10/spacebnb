import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
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
