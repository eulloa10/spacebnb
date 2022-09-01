import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { fetchSpots } from '../../store/spots'
import { Link } from 'react-router-dom';
import './SpotBrowser.css';

function SpotBrowser() {
  const spots = useSelector(state => state.spots)
  console.log("SPOTS", spots)
  const currentUser = useSelector(state => state.session);
  console.log("CURRENTSESH", currentUser)

  const dispatch = useDispatch();
  const allSpotsList = [];

  for (let key in spots) {
    allSpotsList.push(spots[key]);
  }

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  if (!spots) {
    return null;
  }

  return (
    <div className='spot-list'>
      {allSpotsList.map((spot,index) => {
      return (
        <Link key={index} to={`/spots/${spot.id}`}>
          <div className='spot' key={index}>
            <img className='spot-image' src={`${spot.previewImage}`} alt='Spot'/>
            <div className='spot-description'>
              <p>{`${spot.city}, ${spot.state}`}</p>
              <p>{`$${spot.price} night`}</p>
            </div>
          </div>
        </Link>
      )
      })}
    </div>
  )
}

export default SpotBrowser;
