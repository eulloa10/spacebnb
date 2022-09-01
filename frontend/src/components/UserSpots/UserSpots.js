import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { fetchSpots } from '../../store/spots'
import { Link } from 'react-router-dom'
import './UserSpots.css'

function UserSpots() {
  const spots = useSelector(state => state.spots)
  const currentUserId = useSelector(state => state.session.user.id);

  const dispatch = useDispatch();
  const allSpotsList = [];

  for (let key in spots) {
    if (spots[key].ownerId === currentUserId) {
      allSpotsList.push(spots[key]);
    }
  }

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  if (!spots) {
    return null;
  }

  return (
    <>
    <div>
      <button>Add a new spot</button>
    </div>
    <div className='spot-list'>
      {allSpotsList.map((spot,index) => {
      return (
        <>
          <div>
          <Link key={index} to={`/spots/${spot.id}`}>
            <div className='spot' key={index}>
              <img className='spot-image' src={`${spot.previewImage}`} alt='Spot'/>
              <div className='spot-description'>
                <p>{`${spot.city}, ${spot.state}`}</p>
                <p>{`$${spot.price} night`}</p>
              </div>
            </div>
          </Link>
          <button>Edit</button>
          <button>Delete</button>
          </div>
        </>
      )
      })}
    </div>
    </>
  )
}

export default UserSpots;
