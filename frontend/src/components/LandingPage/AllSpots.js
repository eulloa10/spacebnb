import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';
import allSpots from './AllSpots.css'


const AllSpots = () => {
  const spots = useSelector(state => state.spots)
  console.log("SPOTS", spots)
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const allSpotsList = [];

  for (let key in spots) {
    allSpotsList.push(spots[key]);
  }

  console.log(allSpotsList)
  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);




  if (!spots) {
    return null;
  }

  return (
    <div className='spot-list'>
      {allSpotsList.map((spot,index) => {
      return <div className='spot' key={index}>
          <img className='spot-image' src={`${spot.previewImage}`} alt='Spot'/>
          <div className='spot-description'>
            <p>{`${spot.city}, ${spot.state}`}</p>
            <p>{`$${spot.price} night`}</p>
          </div>
        </div>
      })}
    </div>
  )
};

export default AllSpots;
