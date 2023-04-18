import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import SpotIndexItem from '../SpotIndexItem/SpotIndexItem'
import './SpotsIndex.css'


const SpotsIndex = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots)
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
    <section className="all-spots">
      <ul className="allSpots">
        {
          allSpotsList.map(spot => (
            <SpotIndexItem
              spot={spot}
              key={spot.id}
            />
          ))
        }
      </ul>
    </section>
  );
}

export default SpotsIndex;
