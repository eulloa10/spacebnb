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
    <li>
      <Link className="spot-link" to={`/all/spots/${spot.id}`}>
        <div className="spot">
          <div>
            <img className="spot-image" src={`${spot.previewImage}`} alt="spot"/>
          </div>
          <div>
            <div className="spot-name">{spot.name}</div>
            <div>{spot.city}, {spot.state}</div>
            <div className="night"><span className="spot-price">${spot.price}</span> night</div>
          </div>
        </div>
      </Link>

      {user && user.id === spot.ownerId && currentPath === '/user/spots' &&
      (
      <>
        <Link to={`/user/spots/${spot.id}/edit`}><button>Edit</button></Link>
        <button onClick={deleteSpot}>Delete</button>
      </>
      )
      }
    </li>
    </>
  );
};

export default SpotIndexItem;
