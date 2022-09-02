import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import * as spotActions from '../../store/spots';
import { Link, Redirect, useHistory } from 'react-router-dom'
import './UserSpots.css'

function UserSpots() {
  const history = useHistory();
  const spots = useSelector(state => state.spots)
  const currentUserId = useSelector(state => state.session.user.id);


  console.log("USERSPOTS", spots)
  const dispatch = useDispatch();
  const allSpotsList = [];

  for (let key in spots) {
    if (spots[key].ownerId === currentUserId) {
      allSpotsList.push(spots[key]);
    }
  }

  useEffect(() => {
    dispatch(spotActions.fetchSpots());
  }, [dispatch]);

  const deleteSpot = (spotId) => {
    console.log(spotId)
    dispatch(spotActions.deleteSelectedSpot(spotId))
    history.push(`/me/spots`)


      // setErrors([]);
      // return dispatch(sessionActions.login({ email, password }))
      //   .catch(async (res) => {
      //     const data = await res.json();
      //     if (data && data.errors) setErrors(data.errors);
      //   });

  }

  if (!spots) {
    return null;
  }

  return (
    <>
    <div>My Spots</div>
    <div>
      <Link to="/me/spots/new"><button>Add a new spot</button></Link>
    </div>
    <div className='spot-list'>
      {allSpotsList.map((spot,index) => {
      return (
        <>
          <div>
          <Link key={index} to={`/me/spots/${spot.id}`}>
            <div className='spot' key={index}>
              <img className='spot-image' src={`${spot.previewImage}`} alt='Spot'/>
              <div className='spot-description'>
                <p>{`${spot.city}, ${spot.state}`}</p>
                <p>{`$${spot.price} night`}</p>
              </div>
            </div>
          </Link>
          <Link to={`/me/spots/${spot.id}/edit`}><button>Edit</button></Link>
          <button onClick={() => deleteSpot(spot.id)}>Delete</button>
          </div>
        </>
      )
      })}
    </div>
    </>
  )
}

export default UserSpots;
