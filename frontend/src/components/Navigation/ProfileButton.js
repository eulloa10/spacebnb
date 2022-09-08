import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './ProfileButton.css';


function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/')
  };

  return (
    <>
    <div className="header">
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="current-user-email">{user.email}</li>
          <li>
              <Link to="/me/spots"><button className="my-spots">My Spots</button></Link>
          </li>
          <li>
              <Link to="/me/reviews"><button className="user-reviews">My Reviews</button></Link>
          </li>
          <li>
            <button className="logout" onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
      </div>
    </>
  );
}

export default ProfileButton;
