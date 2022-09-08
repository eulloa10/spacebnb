import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import { Link } from 'react-router-dom';
import SpotIndexItem from '../SpotIndexItem/SpotIndexItem'
import './MySpotsIndex.css';


const MySpotsIndex = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots)
  const user  = useSelector(state => state.session.user)
  const allSpotsList = [];

  for (let key in spots) {
    if (spots[key].ownerId === user.id) {
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
    <section className="my-spots">
      <Link className="add-spot-btn" to="/me/spots/new"><button>Add New Spot</button></Link>
      <ul className="all-current-spots">
        {
          allSpotsList.map(spot => (
            <SpotIndexItem
              spot={spot}
              key={spot.id}
            />
          ))
        }
      </ul>
      {/* <Link to="/books/new">Add New Book</Link>
      <button onClick={resetBookData}>Reset Book Data</button> */}
    </section>
  );
}

export default MySpotsIndex;
