import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import * as sessionActions from '../../store/session'
import './Navigation.css';
import spaceIcon from '../../images/spaceicon.png';
import ghIcon from '../../images/ghicon2.png';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;

  const currentPath = useLocation();


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
      <div className="session-links">
        <NavLink className="login-container" to="/account/signin"><button className='login-button'>Log In</button></NavLink>
        <NavLink className="signup-container" to="/account/signup"><button className='signup-button'>Sign Up</button></NavLink>
        <NavLink className="demo-container" onClick={logInDemoUser} to="/"><button className='demo-user-button'>Demo User</button></NavLink>
      </div>
    );
  }

  return (
    <>
    <header className='main-header'>
      <ul className='main-header-options'>
        <li className='space-home'>
          <NavLink className='home' exact to="/">
            <img src={spaceIcon} alt="icon"/>
            <span className="spacebnb-logo-text">
              spacebnb
            </span>
          </NavLink>
        </li>
        <li className='session-links'>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </header>
    {
      currentPath.pathname === "/" &&
      <footer className='main-footer'>
        <ul className="footer-details">
          <li className="spacebnb-copyright">&copy; 2022 Spacebnb</li>
          <li className="about-link-container">
            <a className="about-link" href="https://github.com/eulloa10/airbnb">
              <img className="gh-icon" src={ghIcon} alt="gh icon"/>
            </a>
          </li>
        </ul>
      </footer>
    }
    </>
  );
}

export default Navigation;
