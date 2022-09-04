import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSelectedSpot } from '../../store/spots'
import './SpotIndexItem.css'


const SpotIndexItem = ({ spot }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;
  const user = useSelector(state => state.session.user)

  const deleteSpot = (e) => {
    dispatch(deleteSelectedSpot(spot.id))
    e.preventDefault();
  };

  return (
    <>
    <li>
      <Link to={`/spots/${spot.id}`}>
        <div className="spot">
          <div>{spot.name}</div>
          <div>
            <img className="spot-image" src={`${spot.previewImage}`} alt="spot"/>
          </div>
          <div>{spot.description}</div>
          <div>{spot.price}</div>
        </div>
      </Link>

      {user && user.id === spot.ownerId && currentPath === '/me/spots' &&
      (
      <>
        <Link to={`/me/spots/${spot.id}/edit`}><button>Edit</button></Link>
        <button onClick={deleteSpot}>Delete</button>
      </>
      )
      }
    </li>
    </>
  );
};

export default SpotIndexItem;
