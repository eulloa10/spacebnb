import React, {useEffect} from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteSelectedSpot } from '../../store/spots';
import './SpotIndexItem.css'


const SpotIndexItem = ({ spot }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;
  const user = useSelector(state => state.session.user);

  const deleteSpot = (e) => {
    dispatch(deleteSelectedSpot(spot.id))
    e.preventDefault();
  };

  return (
    <>
    <li className="individual-spot">
      <Link className="spot-link" to={`/all/spots/${spot.id}`}>
        <div className="spot">
          <div>
            <img className="spot-image" src={`${spot.previewImage}`} alt="spot"/>
          </div>
          <div className="spot-details">
            <div className="landing-city-state">    {spot.city}, {spot.state}
            </div>
            <div className="index-spot-name">
              {spot.name}
            </div>
            <div className="night">
              <span className="spot-price">
              ${spot.price.toLocaleString("en-US")}
              </span>
              <span className="night-phrase">
                night
              </span>
            </div>
          </div>
        </div>
      </Link>

      {user && user.id === spot.ownerId && currentPath === '/user/spots' &&
      (
      <div className="modify-spots-container">

        <Link className="edit-spot" to={`/user/spots/${spot.id}/edit`}><button className="edit-spots-btn">Edit</button></Link>

        <div className="delete-spot">
        <button className="delete-spots-btn" onClick={deleteSpot}>Delete</button>
        </div>
      </div>
      )
      }
    </li>
    </>
  );
};

export default SpotIndexItem;
